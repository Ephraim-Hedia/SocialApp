import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ValidationService } from '../../shared/validation/validation.service';
import { AuthService } from '../../core/auth/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb  = inject(FormBuilder)
  private validationService = inject(ValidationService)
  private authService = inject(AuthService)
  private router = inject(Router)
  loading : boolean = false
  errMessage:string =''

  togglePassword(element:HTMLInputElement) {
    if(element.type === "password")
      element.type = "text"
    else{
      element.type = "password"
    }
  }

  loginSubscribe : Subscription = new Subscription()

  loginForm = this.fb.nonNullable.group({
    login : ['',[Validators.required,Validators.minLength(3)]],
    password : ['',[Validators.required]],
  },{updateOn:'change'})

  submitForm():void{
    this.loading = true
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.loading = false;
      return;
    }

    // if the form is valid, make sure to stop the previous request and make a new one 
    this.loginSubscribe.unsubscribe();
    
    this.loginSubscribe = this.authService.signIn(this.loginForm.value).subscribe(
      {
        next : (res)=>{
          localStorage.setItem("token",res.data.token)
          localStorage.setItem("user",JSON.stringify(res.data.user) )

          this.router.navigate(['/feed'])
          console.log(res)
        },
        error : (err:HttpErrorResponse )=>{
          this.loading = false;
          this.errMessage = err.error.message
          console.log(err)
        },
        complete : ()=>{
          this.loading = false;
        }
      }
    )
    console.log(this.loginForm.value);
  }


  // helper methods 
  isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!control && control.invalid && control.touched;
  }
  
  getError(controlName: string): string | null {
    const control = this.loginForm.get(controlName);
    return this.validationService.getErrorMessage(controlName, control, this.loginForm);
  }
}
