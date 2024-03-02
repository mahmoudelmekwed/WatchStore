import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { Product } from '../models/product';
// import  * as list  from '../../assets/products.json';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // productsTest = list
  // private selectedQuantitySubject = new BehaviorSubject<number>(1);
  // selectedQuantity$ = this.selectedQuantitySubject.asObservable();
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    if (this.products.length > 0) {
      return of(this.products);
    } else {
      return this.http.get<Product[]>('assets/products.json').pipe(
        tap((data) => {
          this.products = data;
        })
      );
    }
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map((products) => products.find((product) => product.id === id)),
      tap(x => console.log(x))
    );
  }

  calculateTotalPrice(product: Product): number {
    return product.price * product.quantity;
  }

  // setSelectedQuantity(quantity: number) {
  //   this.selectedQuantitySubject.next(quantity);
  // }

  // getSelectedQuantity(): number {
  //   return this.selectedQuantitySubject.getValue();
  // }
  onQuatityChange(quantity: number, productId: any) {
    this.products = this.products.map((data: Product) => {
      if (data.id === productId) {
        data.quantity = quantity;
      }
      return data;
    });
  }
}
