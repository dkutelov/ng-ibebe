import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCreateAndEditComponent } from './question-create-and-edit.component';

describe('QuestionCreateAndEditComponent', () => {
  let component: QuestionCreateAndEditComponent;
  let fixture: ComponentFixture<QuestionCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionCreateAndEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
