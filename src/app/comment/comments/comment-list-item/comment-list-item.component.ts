import { CommentService } from './../../comment.service';
import { Component, Input, OnInit } from '@angular/core';
import { CurrentUser } from 'src/app/auth/_models/auth.model';
import { AuthService } from 'src/app/auth/_services/auth.service';
import { IComment } from '../../comment.model';

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
    private authService: AuthService,
    private commentService: CommentService,
  ) {}

  ngOnInit(): void {
    this.comment = this.commentData;
    this.authService.currentUser$.subscribe((u) => (this.user = u));
  }

  like(): void {
    this.commentService
      .likeComment(this.user!.id, this.comment!._id!)
      .subscribe((response) => {
        this.comment.likes = response.likes;
      });
  }
}
