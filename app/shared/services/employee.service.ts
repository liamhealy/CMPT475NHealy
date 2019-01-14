import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { HttpClient } from '@angular/common/http';
import { Department } from '../models/department';
import { EmpLocation } from '../models/emp-location';
import { Role } from '../models/role';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {

    employee: Employee = null;

    employees: Employee[] = [];

    constructor(private http: HttpClient) { }

    /*
     *  Sets the employee
     */
    setEmployee(emp: Employee) {
        this.employee = new Employee();
        this.employee = emp;
    }

    /*
     *  Gets the current employee
     */
    getEmployee(): Employee {
        return this.employee;
    }

    /*
     *  Sets current employee to null
     */
    clearEmpoyee() {
        this.employee = null;
    }

    /*
     *  Pushes the given employees into the employees array
     */
    setEmployees(emps: Employee[]) {
        this.employees = [];
        emps.forEach((emp) => {
            this.employees.push(emp);
        });
    }

    /*
     *  Gets the employees array
     */
    getEmployees(): Employee[] {
        return this.employees;
    }

    getAllEmployees(event) {
        return this.http.get(`http://localhost:4000/api/employees/allEmployees/${JSON.stringify(event)}`);
    }

    getEmployeeApplications(id: number) {
        return this.http.get(`http://localhost:4000/api/employees/employeeApplications/${id}`);
    }

    getEmployeePendingApplications(id: number) {
        return this.http.get(`http://localhost:4000/api/employees/pendingApplications/${id}`);
    }

    getEmployeeNames() {
        return this.http.get(`http://localhost:4000/api/employees/allManagersInfo`);
    }

    insertEmployee(employee) {
        return this.http.post(`http://localhost:4000/api/hr/insertEmployee/${JSON.stringify(employee)}`, employee);
    }

    updateEmployee(employee) {
        return this.http.post(`http://localhost:4000/api/employees/updateEmployee/${JSON.stringify(employee)}`, employee);
    }

    deleteEmployeeUser(employee) {
        return this.http.post(`http://localhost:4000/api/hr/deleteEmployee/${JSON.stringify(employee)}`, employee);
    }

    insertPermission(employeeID, applicationID) {
        const perm = { ID: employeeID, appID: applicationID };
        console.log(perm);
        return this.http.post(`http://localhost:4000/api/employees/insertPermission/${JSON.stringify(perm)}`, perm);
    }

    setEmployeesDirectory(empArr): Employee[] {
        const deps: Department[] = JSON.parse(localStorage.getItem('Departments'));
        const locs: EmpLocation[] = JSON.parse(localStorage.getItem('Locations'));
        const roles: Role[] = JSON.parse(localStorage.getItem('Roles'));
        const employees: Employee[] = [];
        empArr.forEach((emp) => {
            const newEmp: Employee = new Employee();
            newEmp.employeeID = emp.employee_id;
            newEmp.firstName = emp.first_name;
            newEmp.lastName = emp.last_name;
            newEmp.email = emp.email;
            newEmp.phoneNumber = emp.phone_number;
            newEmp.title = emp.title;
            newEmp.department.departmentID = emp.department_id;
            newEmp.department.departmentName = emp.department_name;
            newEmp.departmentName = emp.department_name;
            newEmp.location.locationID = emp.location_id;
            newEmp.location.officeLocation = emp.office_location;
            newEmp.officeLocation = emp.office_location;
            newEmp.location.country = emp.country;
            newEmp.country = emp.country;
            newEmp.role.roleID = emp.role_id;
            newEmp.role.roleName = emp.role_name;
            if (emp.manager_name) {
                newEmp.manager.managerID = emp.manager_id;
                newEmp.manager.managerName = emp.manager_name;
                newEmp.managerName = emp.manager_name;
            }
            employees.push(newEmp);
        });
        return employees;
    }

}
