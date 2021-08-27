import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../../core/services/comment.service';
import { UserService } from 'src/app/core/services/user.service';

import { CurrentUser } from 'src/app/shared/interfaces/user';
import { IComment } from '../../../shared/interfaces/comment';

@Component({
  selector: 'app-comment-list-item',
  templateUrl: './comment-list-item.component.html',
  styleUrls: ['./comment-list-item.component.css'],
})
export class CommentListItemComponent implements OnInit {
  user: CurrentUser | null = null;
  @Input() commentData!: IComment;
  comment!: IComment;

  constructor(
    private userService: UserService,
    private commentService: CommentService,
  ) {}

  ngOnInit(): void {
    this.comment = this.commentData;
    this.userService.currentUser$.subscribe((u) => (this.user = u));
  }

  like(): void {
    if (!this.user) return;

    this.commentService
      .likeComment(this.user.id, this.comment!._id!)
      .subscribe((response) => {
        this.comment.likes = response.likes;
      });
  }
}
