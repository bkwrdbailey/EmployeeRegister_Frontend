import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/Employee';

import { EmployeeregistryComponent } from './employeeregistry.component';

describe('EmployeeregistryComponent', () => {
  let component: EmployeeregistryComponent;
  let fixture: ComponentFixture<EmployeeregistryComponent>;
  let employee: Employee = {
    empId: 1423, name: 'test bot', department: 'test lab', designation: 'problem tester', managerId: 4444, managerName: 'boss man', startingDate: new Date()
  }

  beforeEach(async () => {
    const employeeServiceSpy = jasmine.createSpyObj<EmployeeService>(['addNewEmployee', 'emailEmployeeReport', 'verifyManagerId', 'verifyManagerData', 'checkEmployeeId']);
    employeeServiceSpy.addNewEmployee.and.returnValue(of(true));
    employeeServiceSpy.emailEmployeeReport.and.returnValue(of(true));
    employeeServiceSpy.verifyManagerId.and.returnValue(of(true));
    employeeServiceSpy.verifyManagerData.and.returnValue(of(true));
    employeeServiceSpy.checkEmployeeId.and.returnValue(of(employee));

    component = new EmployeeregistryComponent(employeeServiceSpy);
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
