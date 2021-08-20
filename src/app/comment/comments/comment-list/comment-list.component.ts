import { Component, OnInit, Input } from '@angular/core';
import { IComment } from '../../../shared/interfaces/comment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css'],
})
export class CommentListComponent implements OnInit {
  @Input() comments!: IComment[];

  constructor() {}

  ngOnInit(): void {}
}
