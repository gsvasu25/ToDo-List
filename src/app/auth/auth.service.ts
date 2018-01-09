import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  token: string;
errMsg: string;
  constructor(private router: Router) {}

  signinUser(email: string, password: string) {

   if (email === 'admin@admin.com' && password === 'password' ) {
     this.token = 'auth';
     this.errMsg = null;
     this.router.navigate(['/todolist']);
   }else {
   this.errMsg = 'Authenticated Failed';
   }
  }

  logout() {
    this.token = null;
    this.router.navigate(['/signin']);
  }
  isFailed() {
    return this.errMsg != null;
  }
  isAuthenticated() {
    return this.token != null;
  }
}
