import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ValidationService } from '../../shared/validation/validation.service';
import { AuthService } from '../../core/auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  private fb = inject(FormBuilder)
  private validationService = inject(ValidationService)
  private authService = inject(AuthService)
  private router = inject(Router)

  loading:boolean = false
  passwordChanged:boolean = false
  errMessage: string = ''
  changePasswordSubscribe : Subscription = new Subscription()
  
  // form Builder
  changePasswordForm = this.fb.nonNullable.group({
    password : ["", [Validators.required]],
    newPassword : ["",[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    confirmPassword: ["",[Validators.required]]
  },{validators:this.passwordMatchValidator,updateOn:'change'})

  // action Taken 
  submitForm()
  {
    console.log(this.changePasswordForm)
    this.loading = true
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      this.loading = false;
      return;
    }

    // if the form is valid, make sure to stop the previous request and make a new one 
    this.changePasswordSubscribe.unsubscribe();

    console.log(this.changePasswordForm.value)
    const formValue = this.changePasswordForm.value;
    const request = {
      password: formValue.password,
      newPassword: formValue.newPassword
    };

    this.changePasswordSubscribe = this.authService.changePassword(request).subscribe({
      next: (res)=> {
        console.log(res)

      },
      error : (err : HttpErrorResponse )=>{
        this.loading = false
        this.errMessage = err.error.message
        console.log(err.error.message)
      },
      complete:()=>{
        this.loading = false
        this.passwordChanged = true;
        this.errMessage = ''
      }
    })


  }


  togglePassword(element:HTMLInputElement) {
    if(element.type === "password")
      element.type = "text"
    else{
      element.type = "password"
    }
  }
  
  isInvalid(controlName: string): boolean {
    const control = this.changePasswordForm.get(controlName);
    return !!control && control.invalid && control.touched;
  }
  
  getError(controlName: string): string | null {
    const control = this.changePasswordForm.get(controlName);
    return this.validationService.getErrorMessage(controlName, control, this.changePasswordForm);
  }


  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('newPassword')?.value;
    const confirm = group.get('confirmPassword')?.value;
  
    if (!confirm) return null;
  
    // to do : set control error 
    if(password === confirm)
    {
      group.get('confirmPassword')?.setErrors(null)
      return null ; 
    }
    else {
      group.get('confirmPassword')?.setErrors({ 'passwordMismatch': 'confirm Password should match the original password.' });
      return {passwordMismatch: true}
    }
  }
}
