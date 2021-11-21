import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelOneComponent } from './level-one.component';

describe('LevelOneComponent', () => {
  let component: LevelOneComponent;
  let fixture: ComponentFixture<LevelOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
