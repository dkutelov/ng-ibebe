import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPreviewListComponent } from './question-preview-list.component';

describe('QuestionPreviewListComponent', () => {
  let component: QuestionPreviewListComponent;
  let fixture: ComponentFixture<QuestionPreviewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionPreviewListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionPreviewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
