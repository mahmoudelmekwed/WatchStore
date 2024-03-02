import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule , RouterModule ,FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  filterdProducts : Product[] = [];
  products!: Product[];
  searchTerm!:string;
  quantityOptions!: number[];
  selectedQuantity: number = 1;

  constructor(private route: ActivatedRoute , private productService: ProductService){}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.route.queryParams.subscribe(params => {
        console.log(params);
        this.searchTerm = params['term'] 
        this.filterResults(this.searchTerm);
        });
    }); 
    this.quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);
    
  }

  filterResults(term: string) {
    console.log('Filtering products with term:', term);
    if (!term) {
      this.filterdProducts = this.products;
      return;
    }
    this.filterdProducts = this.products.filter(
      product => product.name.toLowerCase().includes(term.toLowerCase())
    );
    console.log('Filtered products:', this.filterdProducts);
  }

  calculateTotalPrice(product: Product) {
    return this.productService.calculateTotalPrice(product)
  }

  onQuatityChange(quantity: number, productId: any) {
    this.productService.onQuatityChange(quantity, productId);
  }
}
