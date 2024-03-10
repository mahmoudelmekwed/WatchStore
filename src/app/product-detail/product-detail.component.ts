import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [FormsModule , CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  product!: Product ;
  productId?: number;
  quantityOptions!: number[];
  selectedQuantity: number = 1;

  constructor(
    private route: ActivatedRoute, 
    private productService: ProductService,
    private cartService: CartService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      this.productService.getProductById(this.productId).subscribe(product => {
        this.product = product as Product
      });
    });
    this.quantityOptions = Array.from({length: 10}, (_, i) => i + 1);
  }

  calculateTotalPrice(): any {
    if(this.product){
      return this.productService.calculateTotalPrice(this.product).toFixed(2);
    }  
  }

  updateQuantity(): void {
    this.productService.selectedQuantitySubject.next(this.product.quantity)
  }

  addToCart(product:Product){
    this.cartService.addToCart(product , product.quantity)
  }

}
