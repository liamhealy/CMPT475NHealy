import { Employee } from './employee';
import { Manager } from './manager';
import { Application } from './application';
import { Department } from './department';

export class Permission {
    employee: Employee;
    manager: Manager;
    application: Application;
    department: Department;
    inputUserID: Number;
    requestDate: Date;
    lastUpdate: Date;
    status: String;
}
