import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivretStageComponent } from './livret-stage.component';

describe('LivretStageComponent', () => {
  let component: LivretStageComponent;
  let fixture: ComponentFixture<LivretStageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LivretStageComponent]
    });
    fixture = TestBed.createComponent(LivretStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
