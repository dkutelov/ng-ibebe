import { TestBed } from '@angular/core/testing';

import { ProtectUnsavedChangesQuestionGuard } from './protect-unsaved-changes-question.guard';

describe('ProtectUnsavedChangesQuestionGuard', () => {
  let guard: ProtectUnsavedChangesQuestionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProtectUnsavedChangesQuestionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
