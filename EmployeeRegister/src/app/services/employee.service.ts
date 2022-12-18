import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';
import { environment } from 'src/environments/environment';
import { EmployeeTabularData } from '../models/EmployeeTabularData';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  // Sends HTTP POST request to backend for adding a new employee record to the database
  addNewEmployee(employee: Employee): Observable<boolean> {
    return this.http.post<boolean>(environment.apiBaseUrl + 'new/employee', employee);
  }

  // Sends HTTP request with data meant to be emailed to a specified manager
  emailEmployeeReport(employeeReport: EmployeeTabularData[]): Observable<boolean> {
    return this.http.post<boolean>(environment.apiBaseUrl + 'email/manager', employeeReport);
  }

  // Sends HTTP GET request to be able to verify if inputted manager ID matches an ID in the database
  verifyManagerId(managerId: number): Observable<boolean> {
    return this.http.get<boolean>(environment.apiBaseUrl + `verify/${managerId}`);
  }

  // Sends HTTP GET request to be able to verify the manager name and ID belong to the same record
  verifyManagerData(managerId: number, managerName: string): Observable<boolean> {
    return this.http.get<boolean>(environment.apiBaseUrl + `new/employee/verify/manager/${managerId}/${managerName}`);
  }

  // Sends HTTP GET request to check if the employee id exists and acquire that employee's name
  checkEmployeeId(employeeId: number): Observable<string> {
    return this.http.get<string>(environment.apiBaseUrl + `check/${employeeId}`);
  }
}
