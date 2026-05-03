import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms'
import { ValidationService } from '../../shared/validation/validation.service';
import { AuthService } from '../../core/auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private fb  = inject(FormBuilder)
  private validationService = inject(ValidationService)
  private authService = inject(AuthService)
  private router = inject(Router)
  
  loading : boolean = false
  registerSubscribe : Subscription = new Subscription()




  togglePassword(element:HTMLInputElement) {
    if(element.type === "password")
      element.type = "text"
    else{
      element.type = "password"
    }
  }


  registerForm = this.fb.nonNullable.group({
    name : ['',[Validators.required,Validators.minLength(3)]],
    username : [''],
    email : ['',[Validators.required,Validators.email]],
    dateOfBirth : ['',[Validators.required]],
    gender : ['',[Validators.required]],
    password : ['',[Validators.required , Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    rePassword : ['',[Validators.required]]
  },{ validators: this.passwordMatchValidator , updateOn:'change'})


  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('rePassword')?.value;
  
    if (!password || !confirm) return null;
  
    // to do : set control error 
    return password === confirm ? null : { passwordMismatch: true };
  }

  submitForm():void{
    this.loading= true


    // check if the form is not valid
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.loading = false
      return;
    }

    // if the form is valid So make sure to stop the previous request to make new one now 
    this.registerSubscribe.unsubscribe();

    // then Subscribe for Sign Up Service 
    this.registerSubscribe = this.authService.signUp(this.registerForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        this.router.navigate(['/login'])
      },
      error:(err)=>{
        this.loading = false
        console.log(err)
      },
      complete:()=>{
        this.loading = false
      }
    })
    console.log(this.registerForm.value);
  }

  // Helper Methods 
  passwordMismatch(): boolean {
    return (
      this.registerForm.errors?.['passwordMismatch'] &&
      this.registerForm.get('rePassword')?.touched
    );
  }

  isInvalid(controlName: string): boolean {
    const control = this.registerForm.get(controlName);
    return !!control && control.invalid && control.touched;
  }
  
  getError(controlName: string): string | null {
    const control = this.registerForm.get(controlName);
    return this.validationService.getErrorMessage(controlName, control, this.registerForm);
  }
}
