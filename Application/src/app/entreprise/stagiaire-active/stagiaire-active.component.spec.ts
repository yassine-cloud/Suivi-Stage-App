import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StagiaireActiveComponent } from './stagiaire-active.component';

describe('StagiaireActiveComponent', () => {
  let component: StagiaireActiveComponent;
  let fixture: ComponentFixture<StagiaireActiveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StagiaireActiveComponent]
    });
    fixture = TestBed.createComponent(StagiaireActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
