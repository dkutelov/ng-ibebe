import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core/guards/auth.guard';
import { ProtectUnsavedChangesQuestionGuard } from '../core/guards/protect-unsaved-changes-answer.guard';
import { AnswerEditComponent } from './answer-edit/answer-edit.component';

const routes: Routes = [
  {
    path: 'answers',
    children: [
      {
        path: ':answerId/edit',
        component: AnswerEditComponent,
        canActivate: [AuthGuard],
        data: {
          authenticationRequired: true,
          authenticationFailureRedirectUrl: '/login',
        },
        canDeactivate: [ProtectUnsavedChangesQuestionGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnswerRoutingModule {}
