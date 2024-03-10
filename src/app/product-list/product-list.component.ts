import { ChangeDetectionStrategy, Component} from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent{
  quantityOptions!: number[];
  product!:Product;
  // selectedQuantity: number = 1;

  constructor(
    private productService: ProductService,
    private cartService : CartService
    ) {}

  readonly products$ = this.productService.getProductsWithSelectedQuantity();
  
  ngOnInit(): void {
    this.productService.selectedQuantity$.subscribe(

    )
    // this.productService.getProducts().subscribe((data) => (this.products = data));
    this.quantityOptions = Array.from({ length: 10 }, (_, i) => i + 1);
  }

  calculateTotalPrice(product: Product) {
    return this.productService.calculateTotalPrice(product)
  }

  // updateQuantity(product:Product): void {
  //   this.productService.setQuantity(this.selectedQuantity);
  // }

  onQuatityChange() {
    this.productService.selectedQuantitySubject.next(this.product.quantity)
  }

  addToCart(product:Product){
    this.cartService.addToCart(product , product.quantity)
  }
}
