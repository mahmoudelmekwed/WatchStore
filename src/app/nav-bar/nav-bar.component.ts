import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  Router, RouterLink} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  total_quantity: number = 0;
  isDropdownOpen: boolean = false;
  currentUser = this.authService.currentUser;
  // dumyUser: boolean = true // Temp solution for login/logout
  constructor(
    private authService: AuthService,
    private router: Router,
    private cartService: CartService){}

  onSearch(term: string , event: Event) {
    event.preventDefault();
    this.router.navigate(['/search'], { queryParams: { term: term } });
    console.log(term)
  }

  calculateCartAmount(): number{
    // console.log('i was called here ');
    return this.cartService.calculateCartAmount()
  }

  isLoggedIn() {
    return this.authService.currentUser?.isLoggedIn;
  }

  userName() {
    return this.authService.currentUser?.username;
  }

  logOut() {
    this.authService.currentUser = new User()
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  ngOnInit(){
    // setTimeout(()=>{
    //   let user = new User('ahmed' , 'pass', 'eefef@gmail.com',true )
    //   this.currentUser = user;
    //   this.authService.currentUser = user;
    // },2000)
  }


}
