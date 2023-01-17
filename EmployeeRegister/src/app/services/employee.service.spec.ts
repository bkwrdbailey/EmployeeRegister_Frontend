import { HttpClient } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/Employee';
import { of } from 'rxjs';
import { EmployeeTabularData } from '../models/EmployeeTabularData';

describe('EmployeeService', () => {
  let postService: EmployeeService;
  let putService: EmployeeService;
  let getService: EmployeeService;

  let postHttpClientSpy: jasmine.SpyObj<HttpClient>;
  let putHttpClientSpy: jasmine.SpyObj<HttpClient>;
  let getHttpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    postHttpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    postService = new EmployeeService(postHttpClientSpy);
    putHttpClientSpy = jasmine.createSpyObj('HttpClient', ['put']);
    putService = new EmployeeService(putHttpClientSpy);
    getHttpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    getService = new EmployeeService(getHttpClientSpy);
  });

  it('should be created', () => {
    expect(postService).toBeTruthy();
    expect(putService).toBeTruthy();
    expect(getService).toBeTruthy();
  });

  it('should send new employee data to be added to database', (done: DoneFn) => {
    const newEmployee: Employee =
    {
      empId: 10, name: 'test man', department: 'testland', designation: 'tester', managerId: 30, managerName: 'boss man', startingDate: new Date()
    }

    postHttpClientSpy.post.and.returnValue(of(true));

    postService.addNewEmployee(newEmployee).subscribe({
      next: result => {
        expect(result)
        .withContext('expected result')
        .toEqual(true);
      },
      error: done.fail
    });

    expect(postHttpClientSpy.post.calls.count())
      .withContext('one post call')
      .toBe(1)

  });

  it('should send employee report successfully for emailing it to a manager', (done: DoneFn) => {
    const employeeReport: EmployeeTabularData[] = [{
      name: "test man", empId: 5555, date: "12/11/2022", attendanceCode: "present", leaveType: "N/A", managerId: 4123
    },
    {
      name: "dummy friend", empId: 3333, date: "12/11/2022", attendanceCode: "present", leaveType: "N/A", managerId: 4123
    }]

    putHttpClientSpy.put.and.returnValue(of(true));

    putService.emailEmployeeReport(employeeReport).subscribe({
      next: result => {
        expect(result)
          .withContext('expected result')
          .toEqual(true)
      },
      error: done.fail
    });

    expect(putHttpClientSpy.put.calls.count())
      .withContext('one call')
      .toBe(1)
  });

  it('should send manager id to be verified', (done: DoneFn) => {
    getHttpClientSpy.get.and.returnValue(of(true));

    getService.verifyManagerId(4312).subscribe({
      next: result => {
        expect(result)
          .withContext('expected result')
          .toBe(true)
      },
      error: done.fail
    });

    expect(getHttpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1)
  });

  it('should send manager id and name to verify they belong to the same manager record', (done: DoneFn) => {
    getHttpClientSpy.get.and.returnValue(of(true));

    getService.verifyManagerData(4312, "boss man").subscribe({
      next: result => {
        expect(result)
          .withContext('expected result')
          .toBe(true)
      },
      error: done.fail
    });

    expect(getHttpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1)
  });

  it('should send employee id to see if it matches an employee record in the database and return that user record', (done: DoneFn) => {
    const employee: Employee = {
      name: "test guy", empId: 1001, department: "karma", designation: "jasmine", managerId: 1234, managerName: "boss man", startingDate: new Date()
    }

    getHttpClientSpy.get.and.returnValue(of(employee));

    getService.checkEmployeeId(1001).subscribe({
      next: result => {
        expect(result)
          .withContext('expected result')
          .toBe(employee)
      },
      error: done.fail
    });

    expect(getHttpClientSpy.get.calls.count())
      .withContext('one call')
      .toBe(1)
  });

});
