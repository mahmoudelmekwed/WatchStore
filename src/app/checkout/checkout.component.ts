import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  checkoutForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    address: ['' , Validators.required],
    telephone: ['' , Validators.required],
    paymentMethod: this.fb.nonNullable.group({
      nameOnCard: ['' , Validators.required],
      cardNumber: ['' , Validators.required],
      expiryDate: ['' , Validators.required],
      cvc: ['' , Validators.required],
    })
  })

  constructor(
    private cartService: CartService,
    private router: Router,
    private fb: FormBuilder){}
  


  calculateTotal():number{
    return this.cartService.calculateCartTotal()
  }

  onSubmit(){
    this.router.navigate(['/confirmation'])
  }
}
