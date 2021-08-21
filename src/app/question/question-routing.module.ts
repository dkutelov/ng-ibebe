import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

import { QuestionCreateAndEditComponent } from './question-create-and-edit/question-create-and-edit.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionsListComponent } from './questions/questions-list/questions-list.component';
import { ProtectUnsavedChangesQuestionGuard } from './questions/protect-unsaved-changes-question.guard';

const routes: Routes = [
  {
    path: 'questions',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: QuestionsListComponent,
      },
      {
        path: ':questionId',
        component: QuestionDetailComponent,
      },
    ],
  },
  {
    path: 'question-create',
    component: QuestionCreateAndEditComponent,
    canActivate: [AuthGuard],
    data: {
      authenticationRequired: true,
      authenticationFailureRedirectUrl: '/login',
    },
    canDeactivate: [ProtectUnsavedChangesQuestionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionRoutingModule {}
