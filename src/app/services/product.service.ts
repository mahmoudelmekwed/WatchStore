import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
// import  * as list  from '../../assets/products.json';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // productsTest = list

  constructor(private http : HttpClient) {}

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>('assets/products.json')
  }

  calculateTotalPrice(product: Product): number {
    return product.price * product.quantity;
  }
}
