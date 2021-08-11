import { QuestionCreateAndEditComponent } from './main/questions/question-create-and-edit/question-create-and-edit.component';
import { HomeComponent } from './main/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionsListComponent } from './main/questions/questions-list/questions-list.component';
import { ProtectUnsavedChangesQuestionGuard } from './main/_guards/protect-unsaved-changes-question.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'questions',
    component: QuestionsListComponent,
  },
  {
    path: 'question-create',
    component: QuestionCreateAndEditComponent,
    canDeactivate: [ProtectUnsavedChangesQuestionGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
