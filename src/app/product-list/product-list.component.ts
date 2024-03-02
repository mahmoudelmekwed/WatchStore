import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent implements OnInit {
  products!: Product[];
  quantityOptions!: number[];
  selectedQuantity: number = 1;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => (this.products = data));
    this.quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  }

  calculateTotalPrice(product: Product) {
    return this.productService.calculateTotalPrice(product)
  }

  updateQuantity(): void {
    // this.productService.setSelectedQuantity(this.selectedQuantity);
  }

  onQuatityChange(quantity: number, productId: any) {
    this.productService.onQuatityChange(quantity, productId);
  }
}
