import { ILinkItem } from './../../../shared/interfaces/link-item';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation-list',
  templateUrl: './navigation-list.component.html',
  styleUrls: ['./navigation-list.component.css'],
})
export class NavigationListComponent {
  @Input() title!: string;
  @Input() menuItems!: ILinkItem[] | null;
  @Output() menuItemClicked = new EventEmitter<string>();

  constructor() {}

  handleMenuItemClick(id: string) {
    this.menuItemClicked.emit(id);
  }
}
