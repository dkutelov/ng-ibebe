import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCardDetailsComponent } from './question-card-details.component';

describe('QuestionCardDetailsComponent', () => {
  let component: QuestionCardDetailsComponent;
  let fixture: ComponentFixture<QuestionCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionCardDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
