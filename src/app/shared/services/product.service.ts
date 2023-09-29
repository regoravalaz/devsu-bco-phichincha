import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import * as moment from 'moment';
import { IProduct } from '../interfaces/product.interface';

const mapSuccess = map((result: HttpResponse<any>) => {
  return result.status === 200;
});

const authorId = '33';

const headers = new HttpHeaders()
  .set('Accept', 'application/json')
  .set('authorId', authorId);

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private data: IProduct[] = [];
  private filteredData: IProduct[] = [];
  private search: string = '';

  constructor(private http: HttpClient) {}

  get list() {
    return this.search === '' ? this.data : this.filteredData;
  }

  filter(search: string) {
    this.search = search.trim().toLowerCase();
    this.filteredData = this.data.filter(
      (p) =>
        p.name.toLowerCase().indexOf(this.search) > -1 ||
        p.description.toLowerCase().indexOf(this.search) > -1
    );
  }

  fetch(): Observable<IProduct[] | undefined> {
    return this.http
      .get<any[]>(this.url, {
        params: {},
        headers,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          const result = response.body?.map((element) => {
            const { id, name, description, logo, date_release, date_revision } =
              element;
            return {
              id,
              name,
              description,
              logo,
              releaseCheck: this.parseFromDate(date_release),
              reviewCheck: this.parseFromDate(date_revision),
            } as IProduct;
          });
          this.data = result as IProduct[];
          return result;
        })
      );
  }

  findById(id: string): IProduct | undefined {
    return this.data.find((product) => product.id === id);
  }

  save(product: IProduct): Observable<any> {
    const { id, name, description, logo, releaseCheck, reviewCheck, isNew } =
      product;

    const data = {
      id,
      name,
      description,
      logo,
      date_release: this.parseToDate(releaseCheck),
      date_revision: this.parseToDate(reviewCheck),
    };

    if (isNew) {
      return this.http
        .post(this.url, data, { headers, observe: 'response' })
        .pipe(mapSuccess);
    }
    return this.http
      .put(this.url, data, { headers, observe: 'response' })
      .pipe(mapSuccess);
  }

  delete(product: IProduct): Observable<any> {
    const headers = new HttpHeaders()
      .set('Accept', 'text/html')
      .set('authorId', authorId);
    const { id } = product;
    let params = new HttpParams().append('id', id);
    return this.http
      .delete(this.url, {
        headers,
        observe: 'response',
        params,
        responseType: 'text',
      })
      .pipe(mapSuccess);
  }

  checkIdAvailable(id: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('authorId', authorId);
    let params = new HttpParams().append('id', id);
    return this.http
      .get(`${this.url}/verification`, {
        headers,
        observe: 'response',
        params,
        responseType: 'text',
      })
      .pipe(
        map((result: HttpResponse<any>) => {
          return result.status === 200 && !Boolean(result.body);
        })
      );
  }

  parseFromDate(value: Date): string {
    return moment(value).format('DD/MM/YYYY');
  }

  parseToDate(value: string): string {
    return moment(value, 'DD/MM/YYYY', true).format('YYYY-MM-DD');
  }

  private get url() {
    return 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products';

    //return 'http://localhost:3000/products';
  }
}
