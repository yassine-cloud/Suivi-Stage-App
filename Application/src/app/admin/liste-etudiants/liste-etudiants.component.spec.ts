import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEtudiantsComponent } from './liste-etudiants.component';

describe('ListeEtudiantsComponent', () => {
  let component: ListeEtudiantsComponent;
  let fixture: ComponentFixture<ListeEtudiantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeEtudiantsComponent]
    });
    fixture = TestBed.createComponent(ListeEtudiantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
