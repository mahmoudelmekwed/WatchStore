import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    // Get the productId from the route parameters
    this.route.params.subscribe(params => {
      this.productId = +params['id']; // Convert the id to a number
      // Use the productId to fetch the corresponding product
      this.productService.getProductById(this.productId).subscribe(product => {
        this.product = product as Product;
        //  this.selectedQuantity = this.productService.getSelectedQuantity();
      });
    });
    this.quantityOptions = Array.from({length: 10}, (_, i) => i + 1);
  }

  calculateTotalPrice(): any {
    if(this.product){
      // return this.productService.calculateTotalPrice(this.product).toFixed(2);
    }  
  }

  updateQuantity(): void {
    // this.productService.setSelectedQuantity(this.selectedQuantity);
  }

}
