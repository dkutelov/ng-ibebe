import { ILinkItem } from './../../../shared/interfaces/link-item';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-link-item',
  templateUrl: './link-item.component.html',
  styleUrls: ['./link-item.component.css'],
})
export class LinkItemComponent implements OnInit {
  @Input() linkItem!: ILinkItem;
  constructor() {}

  ngOnInit(): void {}
}
