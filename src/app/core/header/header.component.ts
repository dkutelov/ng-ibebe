import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  shrinkHeader = false;
  isMobileMenuOpen = false;

  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.handleHeaderSize();
  }

  handleHeaderSize() {
    window.onscroll = () => {
      if (window.pageYOffset > 120) {
        this.shrinkHeader = true;
      } else {
        this.shrinkHeader = false;
      }
    };
  }

  handleMenuOpen() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  handleMenuClose() {
    this.isMobileMenuOpen = false;
  }

  logout() {
    this.userService.logoutUser();
    this.router.navigate(['/']);
  }
}
