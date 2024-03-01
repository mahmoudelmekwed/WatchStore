import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup , ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule , RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  applyForm = new FormGroup(
    {
      name: new FormControl(''),
      password: new FormControl('')
    }
  )

  saveContact(){
    console.log(this.applyForm.controls.name.value)
  }

}
