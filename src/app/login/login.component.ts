import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule , RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  applyForm = this.fb.group(
    {
      name: ['' , Validators.required],
      password: ['' , Validators.required]
    }
  )

  constructor(private fb: FormBuilder){}


  saveContact(){
    console.log(this.applyForm.controls.name.value)
  }

}
