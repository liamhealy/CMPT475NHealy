import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '../models/application';
import { Department } from '../models/department';
import { Role } from '../models/role';
import { EmpLocation } from '../models/emp-location';
import { Constants } from '../constants';


@Injectable({
    providedIn: 'root',
})

export class CacheService {

    constructor(private http: HttpClient) { }

    private applications: Application[] = [];
    private departments: Department[] = [];
    private roles: Role[] = [];
    private locations: EmpLocation[] = [];

    getAllApplications() {
        return this.http.get(`http://localhost:4000/api/cache/applications`);
    }

    getAllRoles() {
        return this.http.get(`http://localhost:4000/api/cache/roles`);
    }

    getAllDepartments() {
        return this.http.get(`http://localhost:4000/api/cache/departments`);
    }

    getAllLocations() {
        return this.http.get(`http://localhost:4000/api/cache/locations`);
    }

    addDepartmentsToCache(deparmentRes: any[]) {
        deparmentRes.forEach((dep) => {
            const newDep: Department = new Department();
            newDep.departmentID = dep.department_id;
            newDep.departmentName = dep.department_name;
            this.departments.push(newDep);
        });
        localStorage.removeItem('Departments');
        localStorage.setItem('Departments', JSON.stringify(this.departments));
    }

    addApplicationsToCache(applicationRes: any[]) {
        applicationRes.forEach((app) => {
            const newApp: Application = new Application();
            newApp.applicationID = app.application_id;
            newApp.applicationName = app.application_name;
            newApp.department.departmentID = app.department_id;
            const department = this.departments.find((dep) => dep.departmentID === app.department_id);
            newApp.department.departmentName = department.departmentName;
            newApp.description = Constants.DESCR_STR;
            this.applications.push(newApp);
        });
        localStorage.removeItem('Applications');
        localStorage.setItem('Applications', JSON.stringify(this.applications));
    }

    addRolesToCache(roleRes: any[]) {
        roleRes.forEach((role) => {
            const newRole: Role = new Role();
            newRole.roleID = role.role_id;
            newRole.roleName = role.role_name;
            this.roles.push(newRole);
        });
        localStorage.removeItem('Roles');
        localStorage.setItem('Roles', JSON.stringify(this.roles));
    }

    addLocationsToCache(locationRes: any[]) {
        locationRes.forEach((loc) => {
            const newLoc: EmpLocation = new EmpLocation();
            newLoc.locationID = loc.location_id;
            newLoc.officeLocation = loc.office_location;
            newLoc.country = loc.country;
            this.locations.push(newLoc);
        });
        localStorage.removeItem('Locations');
        localStorage.setItem('Locations', JSON.stringify(this.locations));
    }
}
