import { Component, OnInit } from '@angular/core';
import { EmployeeAttendance } from 'src/app/models/EmployeeAttendance';
import { Employee } from 'src/app/models/Employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeeTabularData } from 'src/app/models/EmployeeTabularData';

@Component({
  selector: 'app-employeeregistry',
  templateUrl: './employeeregistry.component.html',
  styleUrls: ['./employeeregistry.component.css']
})
export class EmployeeregistryComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  inputtedDate!: string;
  checkManagerId: number = 0;
  currYear!: string;

  employeeAttendance: EmployeeAttendance = {empId: 0, date: new Date(), attendanceCode: '', leaveType: 'N/A'}
  newEmployee: Employee = {empId: 0, name: '', department: '', designation: '', managerName: '', managerId: 0, startingDate: new Date()}

  listOfEmployeesAttendance: EmployeeTabularData[] = [];

  ngOnInit(): void {
    // Grab the current year for the employee attendance form to limit date selection
    this.currYear = new Date().getFullYear().toString();
  }

  // Attempt to add a new employee record to the database
  attemptToAddNewEmployee() {
    console.log(this.newEmployee);

    document.getElementById('newEmployeeErrors')?.setAttribute('hidden', '');

    // Removes red border styling on new employee form inputs
    this.clearNewEmployeeErrorStyling();

    if(this.checkNewEmployeeFieldsAreValid()) {
      this.employeeService.addNewEmployee(this.newEmployee).subscribe(res => {
        if(!res) {
          // Notify user that the new employee was not added
          const newEmployeeErrorElement = document.getElementById('newEmployeeErrors') as HTMLElement;
          newEmployeeErrorElement.removeAttribute('hidden');
          newEmployeeErrorElement.innerHTML = 'Employee name or id already taken';
        }
      })
    }
  }

  // Adds Employee attendance record to table element and to listOfEmployeesAttendance array
  generateReport() {
    document.getElementById('managerIdError')?.setAttribute('hidden', '');

    // Removes red border styling on employee attendance form inputs
    this.clearEmployeeAttendanceErrorStyling();

    // Checking if employee attendance input fields hold valid data
    if(this.checkAttendanceFieldsAreValid()) {
      this.employeeService.checkEmployeeId(this.employeeAttendance.empId).subscribe(employeeData => {
        if(employeeData != '') {
          this.employeeService.verifyManagerId(this.checkManagerId).subscribe(res => {
            if(res) {
              // Formate date data to look more presentable in the table
              let formattedDate = this.employeeAttendance.date.getMonth().toString() + '/' + this.employeeAttendance.date.getDate().toString() + '/' + this.employeeAttendance.date.getFullYear().toString();
              // Add employeeAttendance object to listOfEmployeesAttendance array
              let newTableRecord = new EmployeeTabularData(employeeData, this.employeeAttendance.empId, formattedDate, this.employeeAttendance.attendanceCode, this.employeeAttendance.leaveType);

              this.listOfEmployeesAttendance.push(newTableRecord);
            } else {
              const managerIdError = document.getElementById('managerIdError') as HTMLElement;
              const managerIdInputElement = document.getElementById('managerId') as HTMLElement;
              managerIdError.removeAttribute('hidden');
              managerIdError.innerHTML = 'Invalid Manager ID';
              managerIdInputElement.style.border = '2px red solid';
            }
          })
        }
      })
    }


    if(this.listOfEmployeesAttendance.length > 0) {
      document.getElementById('employeeRecordsTable')?.removeAttribute('hidden');
      document.getElementById('sendEmail')?.removeAttribute('hidden');
    }

    console.log(this.employeeAttendance);
  }

  // Attempt to send employee attendance list to the backend for emailing to a manager or multiple managers
  attemptToEmailManagers() {
    this.employeeService.emailEmployeeReport(this.listOfEmployeesAttendance).subscribe(res => {
      const emailErrorElement = document.getElementById('emailError') as HTMLElement;
      emailErrorElement.innerHTML = '';
      if(!res) {
        // Notify user that the email(s) were not succesfully sent
        emailErrorElement.innerHTML = 'Error in sending email(s)';
      }
    })
  }

  // Checks employee attendance form input fields are valid and not empty
  checkAttendanceFieldsAreValid(): boolean {
    const errorElement = document.getElementById('employeeAttendanceErrors') as HTMLElement;
    errorElement.innerHTML = '';

    errorElement.setAttribute('hidden', '');

    if(this.employeeAttendance.empId <= 0) {
      document.getElementById('employeeAttendanceErrors')?.removeAttribute('hidden');
      const empNameElement = document.getElementById('employeeAttendanceId') as HTMLElement;
      errorElement.innerHTML += 'Must enter a valid employee Id</br>';
      empNameElement.style.border = '2px red solid';
    }

    this.employeeAttendance.date = new Date(this.inputtedDate);

    if(this.employeeAttendance.date.toString() == 'Invalid Date') {
      document.getElementById('employeeAttendanceErrors')?.removeAttribute('hidden');
      const empDateElement = document.getElementById('employeeAttendanceDate') as HTMLElement;
      errorElement.innerHTML += 'Must enter a valid date</br>';
      empDateElement.style.border = '2px red solid';
    }

    if(this.employeeAttendance.attendanceCode == '') {
      document.getElementById('employeeAttendanceErrors')?.removeAttribute('hidden');
      errorElement.innerHTML += 'Must select Present or Absent</br>';
    }

    if(this.employeeAttendance.attendanceCode == 'absent' && this.employeeAttendance.leaveType == 'N/A') {
      document.getElementById('employeeAttendanceErrors')?.removeAttribute('hidden');
      errorElement.innerHTML += 'Must select a Leave Type if they were \'Absent\'</br>';
    }

    // No issues with inputted data found
    if(errorElement.innerHTML == '') {
      return true;
    }

    return false;
  }

  // Checks the new employee form input fields are valid
  checkNewEmployeeFieldsAreValid(): boolean {
    const errorElement = document.getElementById('newEmployeeErrors') as HTMLElement;
    errorElement.innerHTML = '';

    if(this.newEmployee.name == '') {
      document.getElementById('newEmployeeErrors')?.removeAttribute('hidden');
      const empNameElement = document.getElementById('newEmployeeName') as HTMLElement;
      errorElement.innerHTML += 'Must give a valid name</br>';
      empNameElement.style.border = '2px red solid';
    } else if(!this.newEmployee.name.trim().includes(' ')) {
      document.getElementById('newEmployeeErrors')?.removeAttribute('hidden');
      errorElement.innerHTML += 'Must separate employee first and last name with a space</br>';
    }

    if(this.newEmployee.department == '') {
      document.getElementById('newEmployeeErrors')?.removeAttribute('hidden');
      const empDepartmentElement = document.getElementById('newEmployeeDepartment') as HTMLElement;
      errorElement.innerHTML += 'Must give a valid department</br>';
      empDepartmentElement.style.border = '2px red solid';
    }

    if(this.newEmployee.designation == '') {
      document.getElementById('newEmployeeErrors')?.removeAttribute('hidden');
      const empDesignationElement = document.getElementById('newEmployeeDesignation') as HTMLElement;
      errorElement.innerHTML += 'Must give a valid designation</br>';
      empDesignationElement.style.border = '2px red solid';
    }

    if(this.newEmployee.managerName == '') {
      document.getElementById('newEmployeeErrors')?.removeAttribute('hidden');
      const empManagerNameElement = document.getElementById('newEmployeeManagerName') as HTMLElement;
      errorElement.innerHTML += 'Must give a valid manager name</br>';
      empManagerNameElement.style.border = '2px red solid';
    } else if(!this.newEmployee.managerName.trim().includes(' ')) {
      document.getElementById('newEmployeeErrors')?.removeAttribute('hidden');
      errorElement.innerHTML += 'Must separate manager first and last name with a space</br>';
    }

    if(this.newEmployee.managerId <= 0) {
      document.getElementById('newEmployeeErrors')?.removeAttribute('hidden');
      const empManagerIdElement = document.getElementById('newEmployeeManagerId') as HTMLElement;
      errorElement.innerHTML += 'Must give a valid manager id</br>';
      empManagerIdElement.style.border = '2px red solid';
    }

    if(this.newEmployee.managerName != '' && this.newEmployee.managerId > 0) {
      this.employeeService.verifyManagerData(this.newEmployee.managerId, this.newEmployee.managerName).subscribe(res => {
        if(res == false) {
          document.getElementById('newEmployeeErrors')?.removeAttribute('hidden');
          errorElement.innerHTML += 'Invalid manager name and/or id pairing</br>';
        }
      })
    }

    if(this.newEmployee.empId <= 0) {
      document.getElementById('newEmployeeErrors')?.removeAttribute('hidden');
      const empIdElement = document.getElementById('newEmployeeId') as HTMLElement;
      errorElement.innerHTML += 'Must give a valid employee id</br>';
      empIdElement.style.border = '2px red solid';
    }

    if(new Date(this.newEmployee.startingDate + 'T00:00:00-07:00').getFullYear() > new Date().getFullYear() || new Date(this.newEmployee.startingDate + 'T00:00:00-07:00').getMonth() > new Date().getMonth()) {
      document.getElementById('newEmployeeErrors')?.removeAttribute('hidden');
      const empDateElement = document.getElementById('newEmployeeJoiningDate') as HTMLElement;
      errorElement.innerHTML += 'Invalid Date given</br>';
      empDateElement.style.border = '2px red solid';
    }

    if(errorElement.innerHTML == '') {
      return true;
    }

    return false;
  }

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

  // Clears any error styling for new employee form inputs
  clearNewEmployeeErrorStyling() {
    const empNameElement = document.getElementById('newEmployeeName') as HTMLElement;
    empNameElement.style.removeProperty('border');

    const empDepartmentElement = document.getElementById('newEmployeeDepartment') as HTMLElement;
    empDepartmentElement.style.removeProperty('border');

    const empDesignationElement = document.getElementById('newEmployeeDesignation') as HTMLElement;
    empDesignationElement.style.removeProperty('border');

    const empManagerNameElement = document.getElementById('newEmployeeManagerName') as HTMLElement;
    empManagerNameElement.style.removeProperty('border');

    const empManagerIdElement = document.getElementById('newEmployeeManagerId') as HTMLElement;
    empManagerIdElement.style.removeProperty('border');

    const empIdElement = document.getElementById('newEmployeeId') as HTMLElement;
    empIdElement.style.removeProperty('border');

    const empDateElement = document.getElementById('newEmployeeJoiningDate') as HTMLElement;
    empDateElement.style.removeProperty('border');
  }

  // Clears any error styling for employee attendance form inputs
  clearEmployeeAttendanceErrorStyling() {
    const empNameElement = document.getElementById('employeeAttendanceId') as HTMLElement;
    empNameElement.style.removeProperty('border');

    const empDateElement = document.getElementById('employeeAttendanceDate') as HTMLElement;
    empDateElement.style.removeProperty('border');
  }
}
