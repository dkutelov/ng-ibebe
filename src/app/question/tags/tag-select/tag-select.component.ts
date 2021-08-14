import { TagsService } from './../../../shared/_services/tags.service';
import { BehaviorSubject } from 'rxjs';
import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { ITag } from '../../../shared/_models/tag';

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
  tags: ITag[] = [];
  tagsSuggestions: ITag[] = [];
  selectedTags: ITag[] = [];
  searchTerm: string = '';
  tagsPlaceholder = 'e.g. pregnancy';

  @Output() updatedSelectedTags = new EventEmitter<ITag[]>();

  constructor(private tagsService: TagsService) {}

  ngOnInit(): void {
    this.tagsService.getTags().subscribe((tags) => {
      this.tags = tags;
    });
  }

  onInputChange(event: Event): void {
    let value = (event.target as HTMLInputElement).value;
    // exclude already selected
    if (value) {
      this.tagsSuggestions = this.tags.filter((x) =>
        x.name.toLowerCase().includes(value.toLowerCase()),
      );
    }
  }

  onTagEnter() {
    this.selectedTags = this.selectedTags.concat({
      _id: undefined,
      name: this.searchTerm,
    });
    this.updatedSelectedTags.emit(this.selectedTags);
    this.reset();
  }

  addToSelectedTags(tag: ITag): void {
    if (this.selectedTags.includes(tag)) return;
    this.selectedTags = [...this.selectedTags, tag];
    this.updatedSelectedTags.emit(this.selectedTags);
    this.reset();
  }

  removeTag(tag: ITag) {
    this.selectedTags = this.selectedTags.filter((t) => t.name !== tag.name);

    if (!this.selectedTags.length) {
      this.tagsPlaceholder = 'e.g. pregnancy';
    }
    this.updatedSelectedTags.emit(this.selectedTags);
  }

  reset() {
    this.searchTerm = '';
    this.tagsSuggestions = [];
    this.tagsPlaceholder = '';
  }
}
