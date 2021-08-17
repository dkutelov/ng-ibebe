import { AnswersService } from '../../answers.service';
import { AuthService } from './../../../auth/_services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { IAnswer } from '../../answer.model';

@Component({
  selector: 'app-answer-list-item',
  templateUrl: './answer-list-item.component.html',
  styleUrls: ['./answer-list-item.component.css'],
})
export class AnswerListItemComponent implements OnInit {
  @Input() answer!: IAnswer;
  constructor(
    public authService: AuthService,
    private answersService: AnswersService,
  ) {}

  ngOnInit(): void {}

  vote(answerId: string, voteType: string) {}
}
