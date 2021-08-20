import { UserService } from './core/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.autoAuthUser();
  }
}
