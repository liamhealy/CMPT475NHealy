import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { Employee } from '../models/employee';
import { SharedService } from '../services/shared.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthGuard implements CanActivate {

    user: Employee = new Employee();

    employees: Employee[] = [];

    constructor(
        private router: Router,
        private sharedService: SharedService,
        private http: HttpClient) { }

    /*
     *  Authorization check for login
     */
    canActivate() {
        // check local storage after determining if the user exists
        if (this.sharedService.stringToBool(localStorage.getItem('isLoggedin'))) {
            // check to see if the user was set
            if (sessionStorage.getItem('user') === null) {
                sessionStorage.setItem('user', JSON.stringify(this.user));
            }
            return true;
        }
        // user doesn't exist
        sessionStorage.removeItem('user');
        this.router.navigate(['/login']);
        return false;
    }

    authenticateEmployee(email: String, password: String) {
        return this.http.get(`http://localhost:4000/api/login/authenticate/${email}/${password}`);
    }

    setUser(emp) {
        this.user = new Employee();
        this.user.employeeID = emp.employee_id;
        this.user.department.departmentID = emp.department_id;
        this.user.department.departmentName = emp.department_name;
        this.user.location.locationID = emp.location_id;
        this.user.location.officeLocation = emp.office_location;
        this.user.location.country = emp.country;
        this.user.role.roleID = emp.role_id;
        this.user.firstName = emp.first_name;
        this.user.lastName = emp.last_name;
        this.user.title = emp.title;
        this.user.email = emp.email;
        this.user.phoneNumber = emp.phone_number;
    }

    /*
     *  Temp method for checking if the user is in the db
     *  HR: billy@email.com
     *  MGR: mary@email.com
     *  EMP: bob@email.com
     *  Password: password
     */
    // isEmployee(emp: Employee): Boolean {
    //     // Employee
    //     this.user.password = 'password';
    //     this.user.employeeID = 5;
    //     this.user.department.departmentID = 2;
    //     this.user.department.departmentName = 'IT';
    //     this.user.location.locationID = 1;
    //     this.user.location.officeLocation = 'New York';
    //     this.user.location.country = 'USA';
    //     this.user.role.roleID = 3;
    //     this.user.role.roleName = 'EMP';
    //     this.user.manager.managerID = 4;
    //     this.user.manager.managerName = 'John Smith1';
    //     this.user.managerName = 'John Smith1';
    //     this.user.firstName = 'Kevin';
    //     this.user.lastName = 'Johnson1';
    //     this.user.title = 'Developer';
    //     this.user.email = 'emp@acme.com';
    //     this.user.phoneNumber = '1234567890';
    //     this.employees.push(this.user);
    //     this.user = new Employee();

    //     // Manager
    //     this.user.password = 'password';
    //     this.user.employeeID = 7;
    //     this.user.department.departmentID = 2;
    //     this.user.department.departmentName = 'IT';
    //     this.user.location.locationID = 1;
    //     this.user.location.officeLocation = 'New York';
    //     this.user.location.country = 'USA';
    //     this.user.role.roleID = 2;
    //     this.user.role.roleName = 'MGR';
    //     this.user.firstName = 'John';
    //     this.user.lastName = 'Smith2';
    //     this.user.title = 'Manager Title';
    //     this.user.email = 'mgr@acme.com';
    //     this.user.phoneNumber = '1234567890';
    //     this.employees.push(this.user);
    //     this.user = new Employee();

    //     // HR
    //     this.user.password = 'password';
    //     this.user.employeeID = 1;
    //     this.user.department.departmentID = 1;
    //     this.user.department.departmentName = 'Human Resources';
    //     this.user.location.locationID = 3;
    //     this.user.location.officeLocation = 'London';
    //     this.user.location.country = 'England';
    //     this.user.role.roleID = 1;
    //     this.user.role.roleName = 'HR';
    //     this.user.firstName = 'John';
    //     this.user.lastName = 'Smith';
    //     this.user.title = 'Manager Title';
    //     this.user.email = 'hr@acme.com';
    //     this.user.phoneNumber = '1234567890';
    //     this.employees.push(this.user);

    //     for (let i = 0; i < this.employees.length; i++) {
    //         if (emp.email === this.employees[i].email && emp.password === this.employees[i].password) {
    //             this.user = new Employee();
    //             this.user = this.employees[i];
    //             return true;
    //         }
    //     }
    //     return false;
    // }
}
