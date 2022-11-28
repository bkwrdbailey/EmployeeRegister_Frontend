import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/Employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  // Sends HTTP POST request to backend for adding a new employee record to the database
  addNewEmployee(employee: Employee) {
    this.http.post('' , employee);
  }

  
}
