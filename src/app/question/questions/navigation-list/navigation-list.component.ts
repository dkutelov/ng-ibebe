import { ILinkItem } from './../../../shared/interfaces/link-item';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-navigation-list',
  templateUrl: './navigation-list.component.html',
  styleUrls: ['./navigation-list.component.css'],
})
export class NavigationListComponent implements OnChanges {
  @Input() title!: string;
  @Input() menuItems!: ILinkItem[] | null;
  @Output() menuItemClicked = new EventEmitter<string>();

  items: ILinkItem[] | null = null;
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.items = changes.menuItems.currentValue;
  }

  handleMenuItemClick(id: string): void {
    this.menuItemClicked.emit(id);
  }
}
