import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';

export const routes: Routes = [
    { path: '' , component : ProductListComponent},
    { path: 'login' , component : LoginComponent},
    { path: 'cart' , component : CartComponent},
    { path: 'search' , component :SearchComponent }
];
