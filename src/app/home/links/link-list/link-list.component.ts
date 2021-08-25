import { ILinkItem } from './../../../shared/interfaces/link-item';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css'],
})
export class LinkListComponent {
  @Input() title: string = '';
  @Input() links!: ILinkItem[] | null;
  @Input() linkType: string = '';

  constructor() {}
}
