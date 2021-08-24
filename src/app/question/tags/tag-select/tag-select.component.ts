import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { TagsService } from '../../../core/services/tags.service';
import { ITag } from '../../../shared/interfaces/tag';

@Component({
  selector: 'app-tag-select',
  templateUrl: './tag-select.component.html',
  styleUrls: ['./tag-select.component.css'],
})
export class TagSelectComponent implements OnInit, OnChanges {
  @Input() existingTags!: ITag[];
  @Output() updatedSelectedTags = new EventEmitter<ITag[]>();

  tags: ITag[] = [];
  tagsSuggestions: ITag[] = [];
  selectedTags: ITag[] = [];
  searchTerm: string = '';
  tagsPlaceholder = 'e.g. pregnancy';

  constructor(private tagsService: TagsService) {}

  ngOnInit(): void {
    this.tagsService.getTags().subscribe((tags) => {
      this.tags = tags;
    });
    if (this.existingTags.length > 0) {
      this.selectedTags = this.existingTags;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.existingTags.currentValue.length > 0) {
      this.selectedTags = changes.existingTags.currentValue;
    }
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
    if (!this.searchTerm) return;

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
