import { Component, OnInit } from '@angular/core';
import { ITag } from '../../_models/tag';

const TAGS: ITag[] = [
  {
    _id: '601175e6d67fd469c75e8df3',
    name: 'Pregnancy',
  },
  {
    _id: '60117602d67fd469c75e8df4',
    name: 'Feeding',
  },
  {
    _id: '6011760bd67fd469c75e8df5',
    name: 'First teeth',
  },
  {
    _id: '6012b62c5e04207183ea09ea',
    name: 'Collics',
  },
];

@Component({
  selector: 'app-tag-select',
  templateUrl: './tag-select.component.html',
  styleUrls: ['./tag-select.component.css'],
})
export class TagSelectComponent implements OnInit {
  tagsSuggestions: ITag[] = [];
  selectedTags: ITag[] = [];

  constructor() {}

  ngOnInit(): void {}

  onInputChange(event: Event): void {
    let value = (event.target as HTMLInputElement).value;
    // exclude already selected
    this.tagsSuggestions = TAGS.filter((x) =>
      x.name.toLowerCase().includes(value.toLowerCase()),
    );
  }

  addToSelectedTags(tag: ITag): void {
    this.selectedTags = [...this.selectedTags, tag];
  }
}
