import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatStageComponent } from './resultat-stage.component';

describe('ResultatStageComponent', () => {
  let component: ResultatStageComponent;
  let fixture: ComponentFixture<ResultatStageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultatStageComponent]
    });
    fixture = TestBed.createComponent(ResultatStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
