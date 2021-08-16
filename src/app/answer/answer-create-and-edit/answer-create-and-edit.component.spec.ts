import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerCreateAndEditComponent } from './answer-create-and-edit.component';

describe('AnswerCreateAndEditComponent', () => {
  let component: AnswerCreateAndEditComponent;
  let fixture: ComponentFixture<AnswerCreateAndEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerCreateAndEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerCreateAndEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
