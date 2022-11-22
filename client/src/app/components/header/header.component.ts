import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title: string | undefined = 'Home';

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() { }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  register() {
    this.router.navigate(['register']);
  }
}
