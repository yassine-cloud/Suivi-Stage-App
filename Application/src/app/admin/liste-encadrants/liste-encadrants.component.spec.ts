import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeEncadrantsComponent } from './liste-encadrants.component';

describe('ListeEncadrantsComponent', () => {
  let component: ListeEncadrantsComponent;
  let fixture: ComponentFixture<ListeEncadrantsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeEncadrantsComponent]
    });
    fixture = TestBed.createComponent(ListeEncadrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
