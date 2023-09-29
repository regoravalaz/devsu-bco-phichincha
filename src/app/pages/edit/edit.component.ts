import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NgForm,
  NgModel,
  ValidatorFn,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from 'src/app/shared/services/product.service';

const successMessageTime = 2000;
const failMessageTime = 5000;

const defaultProduct: IProduct = {
  id: '',
  name: '',
  description: '',
  logo: '',
  reviewCheck: '',
  releaseCheck: '',
  isNew: true,
};

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  product: IProduct | null = null;
  success: boolean = false;
  failed: boolean = false;
  submited: boolean = false;
  loading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) {
    this.route.params.subscribe((params) => {
      const { id } = params;
      if (id === 'new') {
        this.product = defaultProduct;
      } else {
        const found = this.productService.findById(id);
        if (found) {
          this.product = found;
        } else {
          this.return();
        }
      }
    });
  }

  onSubmit(form: NgForm) {
    if (!this.product!.isNew) {
      this.save(form);
    } else {
      this.productService.checkIdAvailable(this.product!.id).subscribe({
        next: (isAvailable) => {
          if (isAvailable) {
            this.save(form);
          } else {
            form.form.controls['id'].setErrors({ exist: true });
            this.launchFailEvent();
          }
        },
        error: (e) => {
          this.launchFailEvent();
        },
      });
    }
  }

  save(form: NgForm) {
    for (var name in form.controls) {
      form.controls[name].markAsTouched({ onlySelf: true });
    }
    if (form.valid && this.product) {
      form.control.disable();
      this.productService.save(this.product).subscribe({
        next: (success) => {
          if (success) {
            this.launchSuccessEvent();
          }
        },
        error: (e) => {
          this.launchFailEvent();
        },
      });
    }
  }

  launchSuccessEvent() {
    this.loading = false;
    this.success = true;
    this.return(successMessageTime);
  }

  launchFailEvent() {
    this.loading = false;
    this.failed = true;
    setTimeout(() => {
      this.failed = false;
    }, failMessageTime);
  }

  return(time: number = 0) {
    setTimeout(() => {
      this.router.navigate(['/products']);
    }, time);
  }

  reset(f: NgForm) {
    this.failed = false;
    this.success = false;
    f.reset();
    f.resetForm();
  }

  hasErrors(field: NgModel) {
    if (field.invalid && (field.dirty || field.touched)) {
      return true;
    }
    return false;
  }

  getErrorField(field: NgModel) {
    if (field.invalid && (field.dirty || field.touched)) {
      return `${this.getErrorLabel(
        field.hasError('exist') ? 'idUnabled' : field.name
      )}`;
    }
    return '';
  }

  getErrorLabel(fieldName: string) {
    switch (fieldName) {
      case 'idUnabled':
        return 'El ID ya existe!';
      case 'id':
        return 'ID no válido!';
      case 'name':
        return 'Nombre no válido!';
      case 'description':
        return 'Descripción no válido!';
      case 'logo':
        return 'Logo no válido';
      case 'release-check':
        return 'Fecha de Liberación no válida!';
      case 'review-check':
        return 'Fecha de Revisión no válida!';
      default:
        return 'Campo no válido!';
    }
  }

  get minDateRelease(): Date {
    return new Date();
  }
  get minDateReview(): Date {
    return new Date(this.minDateRelease.getTime() + 1000 * 60 * 60 * 24 * 365);
  }

  isWellFilled(field: NgModel): boolean {
    return field.value == null || this.hasErrors(field);
  }

  get isEditing() {
    if (this.product && !this.product.isNew) {
      return true;
    }
    return false;
  }
}
