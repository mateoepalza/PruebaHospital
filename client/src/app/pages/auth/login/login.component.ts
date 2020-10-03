import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  private isValidEmail = /\S+@\S+\.\S+/
  loginForm = this.fb.group({
    correo:['', [Validators.required, Validators.pattern(this.isValidEmail)]],
    clave: ['', [Validators.required, Validators.minLength(4)]],
  });

  constructor(private authService: AuthService, private fb:FormBuilder, private router: Router) { }

  ngOnInit(): void {}

  onLogin(){

    if(this.loginForm.invalid){
      return;
    }

    const formValue = this.loginForm.value;
    this.authService.login(formValue).subscribe(res => {
      if(res){
        this.router.navigate(['']);
      }
    });
  }

  getErrorMessage(field:string):string{

    let message:string;

    if(this.loginForm.get(field).errors.required){
      message = "You must enter a value" ;
    }else if(this.loginForm.get(field).hasError('pattern')){
      message = "Not a valid email";
    }else if(this.loginForm.get(field).hasError('minlength')){
      const minLenght = this.loginForm.get(field).errors?.minlength.requiredLength;
      message = `This field must be longer than ${minLenght} characters`;
    }
    return message
  }

  isValidField(field:string):boolean{
    return (this.loginForm.get(field).touched || this.loginForm.get(field).dirty) && !this.loginForm.get(field).valid;
  }

}
