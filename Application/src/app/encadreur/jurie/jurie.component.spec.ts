import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JurieComponent } from './jurie.component';

describe('JurieComponent', () => {
  let component: JurieComponent;
  let fixture: ComponentFixture<JurieComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JurieComponent]
    });
    fixture = TestBed.createComponent(JurieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
