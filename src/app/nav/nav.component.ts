import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit, OnDestroy {
  shrinkHeader = false;
  isMobileMenuOpen = false;
  isAuthenticated = false;
  private authListenerSubscription!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.handleHeaderSize();
    this.isAuthenticated = this.authService.getIsAuth();
    this.authListenerSubscription = this.authService
      .getAuthStatusListener()
      .subscribe(({ isAuth }) => {
        this.isAuthenticated = isAuth;
      });
  }

  ngOnDestroy(): void {}

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
    console.log('logout');

    this.authService.logoutUser();
  }
}
