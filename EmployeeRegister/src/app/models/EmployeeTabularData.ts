export class EmployeeTabularData {
  name!: string;
  empId!: number;
  date!: string;
  attendanceCode!: string;
  leaveType!: string;
  managerId!: number;

  constructor(_name: string, _empId: number, _date: string, _attendanceCode: string, _leaveType: string, _managerId: number) {
    this.name = _name;
    this.empId = _empId;
    this.date = _date;
    this.attendanceCode = _attendanceCode;
    this.leaveType = _leaveType;
    this.managerId = _managerId;
  }
}
