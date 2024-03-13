import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiUrl = 'https://json-test-04dc36bd7ea2.herokuapp.com/user';

  getAll(){
    return this.http.get(this.apiUrl);
  }

  getAllRole(){
    return this.http.get('https://json-test-04dc36bd7ea2.herokuapp.com/role')
  }

  getByCode(code: any){
    return this.http.get(this.apiUrl + '/' + code);
  }

  proceedRegister(inputData: any){
    return this.http.post(this.apiUrl, inputData)
  }

  updateUser(id: any, userData: any){
    return this.http.put(this.apiUrl + '/' + id, userData)
  }

  isLoggedIn(){
    return sessionStorage.getItem('username') != null;
  }

  getUserRole(){
    return sessionStorage.getItem('userrole') != null?sessionStorage.getItem('userrole')?.toString() : '';
  }
}
