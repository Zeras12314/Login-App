import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  userData: any;

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService, private router: Router){
    sessionStorage.clear();
  }

  loginForm = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })


  login(){
    if(this.loginForm.valid){
    //   this.service.proceedRegister(this.loginForm.value).subscribe(res => {
    //     this.toastr.success('Please contact admin to enable access','Registered Successfully');
    //     this.router.navigate(['login']);
    //   })

    // } else{
    //   this.toastr.warning("Please enter valid data");
    // }
    this.service.getByCode(this.loginForm.value.username).subscribe(res => {
      this.userData = res;
      console.log(this.userData);
      if(this.userData.password === this.loginForm.value.password){
        if(this.userData.isactive){
          sessionStorage.setItem('username', this.userData.id);
          sessionStorage.setItem('userrole', this.userData.role);
          this.router.navigate(['']);
        }else{
          this.toastr.error('Please contact admin', 'Inactive User')
        }
      } else {
        this.toastr.error('Invalid Credentials');
      }
    })
  }
  }
}
