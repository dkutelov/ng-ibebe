import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AnswerEditComponent } from 'src/app/answer/answer-edit/answer-edit.component';

@Injectable({
  providedIn: 'root',
})
export class ProtectUnsavedChangesQuestionGuard
  implements CanDeactivate<unknown>
{
  canDeactivate(component: AnswerEditComponent): boolean {
    if (component.answerForm.dirty) {
      return confirm(
        'Are you sure you want to leave this page? Any unsaved changes will be lost!',
      );
    }
    return true;
  }
}
