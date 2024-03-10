import { CommonModule } from '@angular/common';
import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { Product } from '../models/product';
import { CartService } from '../services/cart.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartItems: Product[] = [];

  constructor(private cartService: CartService){}

  ngOnInit(): void {
      this.cartItems = this.cartService.getCartItems()
      // console.log(this.cartItems)
  }


  removeItem(index: number) {
    this.cartService.removeItem(index);
  }

  calculateTotalPrice(item: Product):number{
    return this.cartService.calculateTotalPrice(item)
  }

  calculateCartTotal():number{
    return this.cartService.calculateCartTotal()
  }

  // calculateCartAmount():number{
  //   return this.cartItems.reduce((totalAmount, cartItem) => {
  //     return totalAmount + Number(cartItem.quantity);
  //   }, 0);
  // }
  
  

  // removeFromCart(id : number){
  //   console.log('Before remove:', this.cartService.getCartItems());
  //   this.cartService.removeFromCart(id)
  //   console.log('After remove:', this.cartService.getCartItems());

  // }
}
