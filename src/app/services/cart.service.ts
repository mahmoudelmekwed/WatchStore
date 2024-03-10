import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems : Product[] = [];
  constructor() {}

  addToCart(product:Product , quantity:number ){
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    if (existingProduct) {
       // Update quantity
       existingProduct.quantity = quantity;
    } else {
       // Add product to cart with specified quantity
       this.cartItems.push({ ...product, quantity: quantity });
    }
    // alert('Added to your cart');
   
  }
  
  getCartItems(){
    return this.cartItems
  }

  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }

  calculateTotalPrice(product: Product): number {
    return product.price * product.quantity;
  }


  calculateCartTotal():number{
    return this.cartItems.reduce((totalPrice, cartItem) => {
      return totalPrice + this.calculateTotalPrice(cartItem);
    }, 0);
  }


  calculateCartAmount():number{
    return this.cartItems.reduce((totalAmount, cartItem) => {
      return totalAmount + Number(cartItem.quantity);
    }, 0);
  }


  clearCart(){
    this.cartItems = [];
  }

  // calculateCartAmount():number{
  //   return this.cartItems.reduce((totalAmount, cartItem) => {
  //     return totalAmount + Number(cartItem.quantity);
  //   }, 0);
  // }


}
