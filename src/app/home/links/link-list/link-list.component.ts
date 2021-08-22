import { ILinkItem } from './../../../shared/interfaces/link-item';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-link-list',
  templateUrl: './link-list.component.html',
  styleUrls: ['./link-list.component.css'],
})
export class LinkListComponent implements OnInit {
  @Input() title: string = '';
  @Input() links!: ILinkItem[] | null;

  constructor() {}

  ngOnInit(): void {}
}
