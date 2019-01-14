import { Component, OnInit } from '@angular/core';
import { Permission } from '../../shared/models/permission';
import { PermissionInterface } from '../../shared/models/permission.interface';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { Application } from 'src/app/shared/models/application';
import { Constants } from 'src/app/shared/constants';
import { UserService } from 'src/app/shared/services/user.service';
import { Employee } from 'src/app/shared/models/employee';
import { animate } from '@angular/animations';

@Component({
  selector: 'app-hr-apprequest',
  templateUrl: './hr-apprequest.component.html',
  styleUrls: ['./hr-apprequest.component.scss']
})
export class HRAppRequestComponent implements OnInit {

  user: Employee = new Employee();

  /******** Primeng DataTable Start *********/
  pendingPermissions: PermissionInterface[] = [];

  acceptedPermisions: PermissionInterface[] = [];

  declinedPermissions: PermissionInterface[] = [];

  permissionInterface: PermissionInterface;

  permissions: Permission[] = [];

  permission: Permission = new Permission();

  selectedPermission: any;

  pendingCols: any[];

  acceptedCols: any[];

  declinedCols: any[];
  /******** Primeng DataTable End *********/

  displayAccept: Boolean = false;

  displayDecline: Boolean = false;

  /******** Role Booleans Start *********/
  isHR: Boolean = false;
  isMgr: Boolean = false;
  /******** Role Booleans End *********/

  constructor(private permissionService: PermissionService,
    private userService: UserService) { }

  ngOnInit() {
    // get the user from session
    if (this.userService.getUser()) {
      this.user = this.userService.getUser();
      this.checkRole();
    }

    // sets the columns for the table
    this.setTableColumns();

    const applications = JSON.parse(localStorage.getItem('Applications'));
    let permissionsTemp = [];
    this.permissionService.getAllPermissions().subscribe((data: any[]) => {
      permissionsTemp = data;
      permissionsTemp.forEach((perm) => {
        if (this.isMgr && this.user.employeeID === perm.manager_id) {
          let application: Application = new Application();
          application = applications.find((app) => app.applicationID === perm.application_id);
          this.permissionInterface = {
            id: perm.employee_id, appID: perm.application_id, empFullName: perm.first_name + ' ' + perm.last_name,
            appName: application.applicationName, reqDate: perm.request_date, lastUpdate: perm.last_update,
            inputUserID: perm.admin_id, status: perm.status
          };
          this.determinePermissionStatus(this.permissionInterface);
          this.permissionInterface = null;
        }
        if (this.isHR) {
          let application: Application = new Application();
          application = applications.find((app) => app.applicationID === perm.application_id);
          this.permissionInterface = {
            id: perm.employee_id, appID: perm.application_id, empFullName: perm.first_name + ' ' + perm.last_name,
            appName: application.applicationName, reqDate: perm.request_date, lastUpdate: perm.last_update,
            inputUserID: perm.admin_id, status: perm.status
          };
          this.determinePermissionStatus(this.permissionInterface);
          this.permissionInterface = null;
        }
      });
    });
  }

  showAcceptDialog(permision) {
    this.displayAccept = true;
    this.selectedPermission = permision;

  }

  showDeclineDialog(permision) {
    this.displayDecline = true;
    this.selectedPermission = permision;
  }

  onCancel() {
    this.displayAccept = false;
    this.displayDecline = false;
    this.displayDecline = null;
  }

  onConfirm() {
    if (this.displayAccept === true) {
      this.selectedPermission.status = 2;
      this.selectedPermission.inputUserID = this.user.employeeID;
      this.permissionService.updatePermission(this.selectedPermission).subscribe((error) => {
        console.log(error);
        window.location.reload();
      });
    } else if (this.displayDecline === true) {
      this.selectedPermission.status = 3;
      this.selectedPermission.inputUserID = this.user.employeeID;
      this.permissionService.updatePermission(this.selectedPermission).subscribe((error) => {
        console.log(error);
        window.location.reload();
      });
    }
    this.displayAccept = false;
    this.displayDecline = false;
  }

  /*
   * Sets the Data Table columns
   */
  setTableColumns() {
    this.pendingCols = [
      { field: 'empFullName', header: 'Employee' },
      { field: 'appName', header: 'Application' }
    ];

    this.acceptedCols = [
      { field: 'empFullName', header: 'Employee' },
      { field: 'appName', header: 'Application' },
      { field: 'inputUserID', header: 'Accepted By ID' },
      { field: 'reqDate', header: 'Request Date' },
      { field: 'lastUpdate', header: 'Last Update' }
    ];

    this.declinedCols = [
      { field: 'empFullName', header: 'Employee' },
      { field: 'appName', header: 'Application' },
      { field: 'inputUserID', header: 'Declined By ID' },
      { field: 'reqDate', header: 'Request Date' },
      { field: 'lastUpdate', header: 'Last Update' }
    ];
  }

  /*
   * Check status and push to the appropriate table
   */
  determinePermissionStatus(perm: PermissionInterface) {
    if (perm.status === Constants.PERM_PENDING) {
      this.pendingPermissions.push(perm);
    } else if (perm.status === Constants.PERM_ACCEPTED) {
      this.acceptedPermisions.push(perm);
    } else if (perm.status === Constants.PERM_DECLINED) {
      this.declinedPermissions.push(perm);
    }
  }

  /*
   * Sets a role boolean to determine what is shown on screen
   */
  checkRole() {
    this.isHR = this.userService.isRole(this.user.role.roleID, [Constants.HR_ROLE_ID]);
    this.isMgr = this.userService.isRole(this.user.role.roleID, [Constants.MGR_ROLE_ID]);
  }
}
