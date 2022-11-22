import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('');
  password = new FormControl('');

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  login() {
    const email = this.email.value;
    const password = this.password.value;
    if (!email) {
      return;
    } else if (!password) {
      return;
    }
    this.authService.login(email, password).subscribe((t) => {
      localStorage.setItem('token', t.token);
      this.router.navigate(['home']);
    });
  }
}
