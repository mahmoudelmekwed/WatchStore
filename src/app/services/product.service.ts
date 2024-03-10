import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, tap } from 'rxjs';
import { Product } from '../models/product';
// import  * as list  from '../../assets/products.json';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Product[] = [];
  selectedQuantitySubject = new BehaviorSubject<number>(1);
  selectedQuantity$ = this.selectedQuantitySubject.asObservable();
  
  
  constructor(private http: HttpClient) {}

  products$ = this.http.get<Product[]>('assets/products.json').pipe(
    tap((data) => {
      this.products = data;
      console.log("in the pipe")
    })
  );
    
  getProductById(id: number): Observable<Product | undefined> {
    return this.products$.pipe(
      map((products) => products.find((product) => product.id === id)),
      tap(x => console.log(x))
    );
  }

  getProductsWithSelectedQuantity() {
    return combineLatest([this.products$, this.selectedQuantity$]).pipe(
      map(([products, selectedQuantity]) => {
        return products.map(product => ({ ...product, quantity: selectedQuantity }));
      })
    );
  }

  // setQuantity(quantity: number , productId: number) {
  //   this.selectedQuantitySubject.next(quantity);
  // }

  // onQuatityChange() {
  //   this.products$ = this.products$.pipe(map(products => products.map(product =>{
  //     ...product,
  //     this.selectedQuantity$: quantity,
  //     searchKey: [product.id]
  //   } as Product)));
  // }

  onQuatityChange(quantity: number, productId: any) {
    this.products = this.products.map((data: Product) => {
      if (data.id === productId) {
        data.quantity = quantity;
      }
      return data;
    });
  }


  calculateTotalPrice(product: Product): number {
    return product.price * product.quantity;
  }


  // getProducts(): Observable<Product[]> {
  //   if (this.products.length > 0) {
  //     return of(this.products);
  //   } else {
  //     return this.http.get<Product[]>('assets/products.json').pipe(
  //       tap((data) => {
  //         this.products = data;
  //       })
  //     );
  //   }
  // }


  updateQuantity(quantity: number) {
    this.selectedQuantitySubject.next(quantity);
  }
  
}
