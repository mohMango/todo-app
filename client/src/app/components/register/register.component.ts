import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email = new FormControl('');
  password = new FormControl('');

  constructor(private authService: AuthService, private router: Router) { }

  register() {
    const email = this.email.value;
    const password = this.password.value;
    if (!email) {
      return;
    } else if (!password) {
      return;
    }
    this.authService.register(email, password).subscribe((t) => {
      localStorage.setItem('token', t.token);
      this.router.navigate(['home']);
    });
  }
}
