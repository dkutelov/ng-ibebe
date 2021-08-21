import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPreviewListItemComponent } from './question-preview-list-item.component';

describe('QuestionPreviewListItemComponent', () => {
  let component: QuestionPreviewListItemComponent;
  let fixture: ComponentFixture<QuestionPreviewListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionPreviewListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionPreviewListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
