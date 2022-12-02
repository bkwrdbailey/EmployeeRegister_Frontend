export class EmployeeTabularData {
  name!: string;
  empId!: number;
  date!: string;
  attendanceCode!: string;
  leaveType!: string;

  constructor(_name: string, _empId: number, _date: string, _attendanceCode: string, _leaveType: string) {
    this.name = _name;
    this.empId = _empId;
    this.date = _date;
    this.attendanceCode = _attendanceCode;
    this.leaveType = _leaveType;
  }
}
