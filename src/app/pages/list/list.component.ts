import { Component, OnInit } from '@angular/core';
import { ConfirmDialogService } from 'src/app/shared/components/confirm-dialog/confirm-dialog.service';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';

const pageSize = 6;

const resultDeleteMessageTime = 1500;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  testImageUrl =
    'https://www.visa.com.co/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-classic-credito-centrada-400x225.jpg';

  private source: IProduct[] = [];
  _products: IProduct[] = [];
  loading: boolean = true;
  currentPage: number = 0;
  search: string = '';
  deletionSuccessful: boolean | null = null;

  constructor(
    private productService: ProductService,
    private confirmDialog: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    this.productService.filter('');
    this.productService.fetch().subscribe((data) => {
      if (data) {
        this.loading = false;
        this.source = data;
      }
    });
  }

  get products() {
    return this.productService.list;
  }

  get pageData() {
    const position = this.currentPage * pageSize;
    return this.products.slice(position, position + pageSize);
  }

  get pageCount() {
    const count = Math.ceil(this.products.length / pageSize) - 1;
    if (count === 0) {
      return 1;
    } else if (count > 0) {
      return count;
    }
    return 0;
  }

  get showPager() {
    return this.pageCount > 1;
  }

  get count(): number {
    return this.products.length;
  }

  confirmDelete(id: string) {
    const productToDelete = this.products.find((product) => product.id === id);
    if (productToDelete) {
      const messageConfirmation = `¿Estas seguro que quieres eliminar el producto: <b>${productToDelete.name}<b>?`;
      this.confirmDialog.open(messageConfirmation, () => {
        this.loading = true;
        this.productService.delete(productToDelete).subscribe({
          next: (success) => {
            if (success) {
              this.deletionSuccessful = true;
              this.refresh();
            }
          },
          error: (e) => {
            this.loading = false;
            this.deletionSuccessful = false;
            this.finishDeleteAction();
          },
          complete: () => {
            this.finishDeleteAction();
          },
        });
      });
    }
  }

  finishDeleteAction() {
    setTimeout(() => {
      this.deletionSuccessful = null;
    }, resultDeleteMessageTime);
  }

  onChangePage(event: Event) {
    this.currentPage = Number((event.target as HTMLSelectElement).value);
  }

  onSearch(event: Event) {
    this.productService.filter((event.target as HTMLInputElement).value);
  }

  get showDeleteResponse() {
    return this.deletionSuccessful !== null;
  }
}
