import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';
import { RegisterComponent } from './register/register.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

export const routes: Routes = [
    { path: 'products' , component : ProductListComponent},
    { path: '' , redirectTo: 'products' , pathMatch:'full'},
    { path: 'products/:id' , component : ProductDetailComponent},
    { path: 'login' , component : LoginComponent},
    { path: 'search' , component :SearchComponent },
    { path: 'cart' , component : CartComponent},
    { path: 'checkout' , component : CheckoutComponent},
    { path: 'confirmation' , component : ConfirmationComponent},
    { path: 'register' , component :RegisterComponent }
];
