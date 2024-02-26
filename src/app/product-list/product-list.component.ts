import { Component , OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products! : Product[];
  quantityOptions!: number[];

  constructor(private productservice : ProductService){}

  ngOnInit(): void {
      this.productservice.getProducts().subscribe(data => this.products = data);
      this.quantityOptions = Array.from({length: 10}, (_, i) => i + 1);
  }


  calculateTotalPrice(product: Product): number {
    return this.productservice.calculateTotalPrice(product);
  }
  
}
