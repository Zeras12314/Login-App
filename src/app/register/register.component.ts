import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService, private router: Router){
  }

  registerForm = this.builder.group({
    id: this.builder.control('',Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.builder.control('male'),
    role: this.builder.control(''),
    isactive: this.builder.control(false),
  })

  proceedRegistration(){
    if(this.registerForm.valid){
      this.service.proceedRegister(this.registerForm.value).subscribe(res => {
        this.toastr.success('Please contact admin to enable access','Registered Successfully');
        this.router.navigate(['login']);
      })

    } else{
      this.toastr.warning("Please enter valid data");
    }
  }

}
