import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    user: Employee = new Employee();

    constructor() { }

    /*
     *  Sets the user (should only be used in dashboard)
     */
    setUser(user: Employee) {
        this.user = new Employee();
        this.user = user;
    }

    /*
     *  Gets the current user
     */
    getUser(): Employee {
        return this.user;
    }

    /*
     *  Clear local and session storage to log out
     */
    onLoggedout() {
        sessionStorage.removeItem('user');
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('Roles');
        localStorage.removeItem('Departments');
        localStorage.removeItem('Locations');
        localStorage.removeItem('Applications');
    }

    /*
     *  Checks if the user's role matches any of the roles entered
     */
    isRole(userRoleID: Number, roleNums: Number[]): Boolean {
        const role = roleNums.filter((roleNum) => userRoleID === roleNum);
        if (role.length > 0) {
            return true;
        }
        return false;
    }

}
