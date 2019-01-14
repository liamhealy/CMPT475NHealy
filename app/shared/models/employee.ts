import { Role } from './role';
import { Manager } from './manager';
import { Department } from './department';
import { EmpLocation } from './emp-location';
import { Application } from './application';

export class Employee {
    employeeID: number;
    password: String; // for testing
    manager: Manager = new Manager();
    department: Department = new Department();
    location: EmpLocation = new EmpLocation();
    role: Role = new Role();
    applications: Application[] = [];
    lastName: String;
    firstName: String;
    title: String;
    email: String;
    phoneNumber: String;

    // for data table
    managerName: String;
    departmentName: String;
    officeLocation: String;
    country: String;
}
