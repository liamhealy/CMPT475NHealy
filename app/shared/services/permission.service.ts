import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '../models/application';
import { Employee } from '../models/employee';
import { PermissionInterface } from '../models/permission.interface';

@Injectable({
    providedIn: 'root',
})
export class PermissionService {

    constructor(private http: HttpClient) { }

    getAllPermissions() {
        return this.http.get(`http://localhost:4000/api/hr/permissions`);
    }

    updatePermission(permission) {
        return this.http.post(`http://localhost:4000/api/hr/updatePermission/${JSON.stringify(permission)}`, permission);
    }

}
