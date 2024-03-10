import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../services/product.service';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import {
  BehaviorSubject,
  Observable,
  Subject,
  Subscription,
  combineLatest,
  from,
  map,
  of,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  // searchTerm!: string;
  // filterdProducts$ : Observable<Product[]> = this.productService.products$.pipe(
  //   tap(products => {
  //     console.log('Original products:', products);
  //   }),
  //   map(products => {
  //   if (!this.searchTerm.trim()) {
  //     return products
  //   }
  //   console.log('filtered products:',products.filter(product => product.name.toLowerCase().includes(this.searchTerm.trim().toLowerCase())))
  //   return products.filter(product => product.name.toLowerCase().includes(this.searchTerm.trim().toLowerCase()))
  // }));
  searchTermSubject = new BehaviorSubject<String>('');
  searchTerm$ = this.searchTermSubject.asObservable();

  filterdProducts$: Observable<Product[]> = combineLatest([
    this.productService.products$,
    this.searchTerm$,
  ]).pipe(
    map(([products, searchTerm = '']) => {
      if (!searchTerm.trim()) {
        return products;
      }
      return products.filter((product) =>
        product.name
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase())
      );
    })
  );
  // subscribe((data) => {
  //   this.products = data;
  //   this.route.queryParams.subscribe(params => {
  //     console.log(params);
  //     this.searchTerm = params['term']
  //     this.filterResults(this.searchTerm);
  //     });
  // });
  products!: Product[];
  quantityOptions!: number[];
  selectedQuantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.searchTermSubject.next(params['term'])
    });
    // this.productService.products$.subscribe((data) => {
    //    this.products = data;
    //   this.route.queryParams.subscribe(params => {
    //     console.log(params);
    //     this.searchTerm = params['term']
    //     this.filterResults(this.searchTerm);
    //     });
    // });
    this.quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  }

  // filterResults(term: string) {
  //   console.log('Filtering products with term:', term);
  //   if (!term) {
  //     this.filterdProducts = this.products;
  //     return;
  //   }
  //   this.filterdProducts = this.products.filter(
  //     product => product.name.toLowerCase().includes(term.toLowerCase())
  //     );
  //     console.log('Filtered products:', this.filterdProducts);
  //   }

  // readonly filterdProducts$ =  this.productService.products$.subscribe((data) => {
  //   this.route.queryParams.subscribe(params => {
  //     this.searchTerm = params['term']
  //     this.filterResults(this.searchTerm);
  //     });
  // });
  calculateTotalPrice(product: Product) {
    return this.productService.calculateTotalPrice(product);
  }

  onQuatityChange(quantity: number, productId: any) {
    this.productService.onQuatityChange(quantity, productId);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product, product.quantity);
  }
}
