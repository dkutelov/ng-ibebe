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
  searchTerm: string = '';
  tagsPlaceholder = 'e.g. pregnancy';

  constructor() {}

  ngOnInit(): void {}

  onInputChange(event: Event): void {
    let value = (event.target as HTMLInputElement).value;
    // exclude already selected
    if (value) {
      this.tagsSuggestions = TAGS.filter((x) =>
        x.name.toLowerCase().includes(value.toLowerCase()),
      );
    }
  }

  onTagEnter() {
    console.log(this.searchTerm);
    this.selectedTags = this.selectedTags.concat({
      _id: undefined,
      name: this.searchTerm,
    });
    this.reset();
  }

  addToSelectedTags(tag: ITag): void {
    if (this.selectedTags.includes(tag)) return;
    this.selectedTags = [...this.selectedTags, tag];
    this.reset();
  }

  removeTag(tag: ITag) {
    this.selectedTags = this.selectedTags.filter((t) => t.name !== tag.name);

    if (!this.selectedTags.length) {
      this.tagsPlaceholder = 'e.g. pregnancy';
    }
  }

  reset() {
    this.searchTerm = '';
    this.tagsSuggestions = [];
    this.tagsPlaceholder = '';
  }
}
