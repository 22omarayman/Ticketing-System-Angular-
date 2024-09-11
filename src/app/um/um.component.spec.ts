import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UMComponent } from './um.component';

describe('UMComponent', () => {
  let component: UMComponent;
  let fixture: ComponentFixture<UMComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UMComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
