import { Component, OnInit } from '@angular/core';
import { EmployeeAttendance } from 'src/app/models/EmployeeAttendance';
import { EmployeeTabularData } from 'src/app/models/EmployeeTabularData';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employeeregistry',
  templateUrl: './employeeregistry.component.html',
  styleUrls: ['./employeeregistry.component.css']
})
export class EmployeeregistryComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
  }

  employeeAttendance: EmployeeAttendance = {empId: 0, date: new Date(0), attendanceCode: '', leaveType: 'N/A'}

  listOfEmployeesAttendance: EmployeeTabularData[] = [];

  // Disables or Enables the Leave Types select element based on whether Present or Absent is selected respectively
  toggleLeaveTypeOptions(showOptions: boolean) {
    if(showOptions) {
      document.getElementById('leaveTypes')?.removeAttribute('disabled');
    }
    else {
      document.getElementById('leaveTypes')?.setAttribute('disabled', '');
      this.employeeAttendance.leaveType = 'N/A';
    }
  }

  // Adds Employee attendance to table element and to listOfEmployeesAttendance array
  generateReport() {
    document.getElementById('employeeAttendanceErrors')?.setAttribute('hidden', '');
    if(this.checkAttendanceFieldsAreValid()) {
      // Add employeeAttendance object to listOfEmployeesAttendance array

    }

    if(this.listOfEmployeesAttendance.length > 0) {
      document.getElementById('sendEmail')?.removeAttribute('disabled');
    }

    console.log(this.employeeAttendance);
  }

  // Checks employee attendance input fields are valid and not empty
  checkAttendanceFieldsAreValid(): boolean {
    const errorElement = document.getElementById('employeeAttendanceErrors') as HTMLInputElement;
    errorElement.value = '';

    if(this.employeeAttendance.empId <= 0) {
      document.getElementById('employeeAttendanceErrors')?.removeAttribute('hidden');
      errorElement.value += 'Must enter a valid employee Id<br>';
    }

    if(this.employeeAttendance.date == new Date(0)) {
      document.getElementById('employeeAttendanceErrors')?.removeAttribute('hidden');
      errorElement.value += 'Must enter a valid date<br>';
    }

    if(this.employeeAttendance.attendanceCode == '') {
      document.getElementById('employeeAttendanceErrors')?.removeAttribute('hidden');
      errorElement.value += 'Must select Present or Absent<br>';
    }

    if(this.employeeAttendance.attendanceCode == 'absent' && this.employeeAttendance.leaveType == 'N/A') {
      document.getElementById('employeeAttendanceErrors')?.removeAttribute('hidden');
      errorElement.value += 'Must select a Leave Type if \'Absent\'<br>';
    }

    // No issues with inputted data found
    if(errorElement.value == '') {
      return true;
    }

    return false;
  }

}
