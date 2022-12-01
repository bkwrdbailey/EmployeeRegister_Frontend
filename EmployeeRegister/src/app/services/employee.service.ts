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
  addNewEmployee(employee: Employee) {
    this.http.post(environment.apiBaseUrl + '/new/employee', employee);
  }

  // Sends HTTP request with data meant to be emailed to a specified manager
  emailEmployeeReport(employeeReport: EmployeeTabularData) {
    this.http.post(environment.apiBaseUrl, employeeReport);
  }

  // Sends HTTP GET request to be able to verify if inputted manager ID matches an ID in the database
  verifyManagerId(managerId: number) {
    this.http.get(environment.apiBaseUrl);
  }
}
