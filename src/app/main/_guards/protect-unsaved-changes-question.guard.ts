import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { QuestionCreateAndEditComponent } from './../questions/question-create-and-edit/question-create-and-edit.component';

@Injectable({
  providedIn: 'root',
})
export class ProtectUnsavedChangesQuestionGuard
  implements CanDeactivate<unknown>
{
  canDeactivate(component: QuestionCreateAndEditComponent): boolean {
    if (component.questionForm.dirty) {
      return confirm(
        'Are you sure you want to leave this page? Any unsaved changes will be lost!',
      );
    }
    return true;
  }
}
