import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  shrinkHeader = false;
  isMobileMenuOpen = false;

  constructor(public authService: AuthService) {}

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
    this.authService.logoutUser();
  }
}
