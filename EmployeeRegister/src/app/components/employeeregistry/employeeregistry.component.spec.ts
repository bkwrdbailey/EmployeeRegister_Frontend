import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeregistryComponent } from './employeeregistry.component';

describe('EmployeeregistryComponent', () => {
  let component: EmployeeregistryComponent;
  let fixture: ComponentFixture<EmployeeregistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeregistryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeregistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
