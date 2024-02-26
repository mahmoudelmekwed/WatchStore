import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  total_quantity : number = 0;
  isDropdownOpen: boolean = false;
  dumyUser: boolean = true // Temp solution for login/logout

  isLoggedIn(){}

  userName(){}

  logOut(){ }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
