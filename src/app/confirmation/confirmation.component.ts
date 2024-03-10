import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {


  constructor(
    private cartService: CartService,
    private router: Router ){}

  calculateTotal(){
    return this.cartService.calculateCartTotal()
  }


  onSubmit(){
    this.cartService.clearCart()
  
    this.router.navigate(['/'])
  }
}
