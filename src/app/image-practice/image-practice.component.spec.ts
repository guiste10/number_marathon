import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePracticeComponent } from './image-practice.component';

describe('ImagePracticeComponent', () => {
  let component: ImagePracticeComponent;
  let fixture: ComponentFixture<ImagePracticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagePracticeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagePracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
