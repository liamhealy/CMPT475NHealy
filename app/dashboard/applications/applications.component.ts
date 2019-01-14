import { Component, OnInit, OnDestroy } from '@angular/core';
import { Application } from '../../shared/models/application';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Department } from '../../shared/models/department';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Constants } from '../../shared/constants';
import { UserService } from '../../shared/services/user.service';
import { Employee } from '../../shared/models/employee';
import { EmployeeService } from '../../shared/services/employee.service';
import { DepartmentInterface } from '../../shared/models/department.interface';
import { ApplicationService } from '../../shared/services/application.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { CacheService } from 'src/app/shared/services/cache.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit, OnDestroy {
  Constants = Constants;

  user: Employee = new Employee();

  employee: Employee = new Employee();

  /******** Form Start *********/
  filterDep = false;

  filterName = false;

  filterApplications: Application[] = [];
  /******** Form Start *********/

  /******** Form Start *********/
  appForm: FormGroup;

  applications: Application[] = [];

  application: Application = new Application();

  applicationName: String;
  /******** Form End *********/

  departments: Department[];

  department: Department = new Department();

  depID: number = null;

  isCancel: Boolean = false; // Employee or User Boolean

  isPending: Boolean[] = [];

  display: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private employeeService: EmployeeService,
    private applicationService: ApplicationService,
    private sharedService: SharedService,
    private cacheService: CacheService) { }

  ngOnDestroy() {
    // check whether an employee or user is canceling
    if (!this.isCancel) {
      this.employeeService.clearEmpoyee();
    }
  }

  ngOnInit() {
    // get the user from session
    if (this.userService.getUser()) {
      this.user = this.userService.getUser();
      // check whether employee or user being edited
      if (this.employeeService.getEmployee()) {
        this.employee = new Employee();
        this.employee = this.employeeService.getEmployee();
      } else {
        this.employee = null;
        this.employee = new Employee();
        this.employee = this.user;
      }
    }

    // Applictions Form Group
    this.appForm = this.formBuilder.group({
      departmentID: new FormControl(),
      applicationName: new FormControl()
    });

    // checks value changes of the form control
    this.subscribeApplication();
    this.subscribeDepartment();


    // get applications by employee id and hide
    this.employeeService.getEmployeeApplications(this.employee.employeeID).subscribe(
      (data: any[]) => {
        if (data.length !== 0) {
          // get applications from local storage
          this.applications = JSON.parse(localStorage.getItem(Constants.APP_LOCAL_KEY));
          data.forEach((app) => {
            this.applications = this.applications.filter((displayApp) => displayApp.applicationID !== app.application_id);
          });
        }

        // init filter applications
        this.filterApplications = this.applications;

        // get applications requested by employee id and disable the request button
        this.employeeService.getEmployeePendingApplications(this.employee.employeeID).subscribe(
          (data1: any[]) => {
            if (data.length !== 0) {
              this.applications.forEach((displayApp) => {
                data1.forEach((app) => {
                  if (displayApp.applicationID === app.application_id) {
                    this.isPending.push(true);
                  } else {
                    this.isPending.push(false);
                  }
                });
              });
            }
          },
          (error) => {
            console.log(error);
          });
      },
      (error) => {
        console.log(error);
      });

    // get constant tables from local storage
    this.departments = JSON.parse(localStorage.getItem(Constants.DEP_LOCAL_KEY));
  }

  showDialog(app) {
    this.display = true;
    this.application.applicationID = app.applicationID;
  }

  onCancel() {
    this.display = false;
  }

  onConfirm() {
    console.log(JSON.stringify(this.employee));
    console.log(JSON.stringify(this.application));
    this.employeeService.insertPermission(this.employee.employeeID, this.application.applicationID).subscribe((error) => {
      console.log(error);
      window.location.reload();
    });
    this.display = false;
  }

  /*
   * Application
   */
  subscribeApplication() {
    this.appForm.controls['applicationName'].valueChanges.subscribe(value => {
      // search through applications
      if (value) {
        this.filterByName(value);
      } else {
        // set the filter back to all applicaitons
        this.filterApplications = this.applications;
        this.filterName = false;
      }
    });
  }

  /*
   * Department
   */
  subscribeDepartment() {
    this.appForm.controls['departmentID'].valueChanges.subscribe(value => {
      if (value) {
        // filter based of department id
        switch (value) {
          case Constants.HR_DEP_ID.toString():
            this.filterByDepartment(Constants.HR_DEP_ID);
            break;
          case Constants.IT_DEP_ID.toString():
            this.filterByDepartment(Constants.IT_DEP_ID);
            break;
          case Constants.SALES_DEP_ID.toString():
            this.filterByDepartment(Constants.SALES_DEP_ID);
            break;
          case Constants.FIN_DEP_ID.toString():
            this.filterByDepartment(Constants.FIN_DEP_ID);
            break;
          case Constants.ACC_DEP_ID.toString():
            this.filterByDepartment(Constants.ACC_DEP_ID);
            break;
          case Constants.MARK_DEP_ID.toString():
            this.filterByDepartment(Constants.MARK_DEP_ID);
            break;
          case Constants.LEG_DEP_ID.toString():
            this.filterByDepartment(Constants.LEG_DEP_ID);
            break;
          case Constants.GEN_DEP_ID.toString():
            this.filterByDepartment(Constants.GEN_DEP_ID);
            break;
          default:
            // set the filter back to all applicaitons
            this.filterApplications = this.applications;
            this.filterDep = false;
            break;
        }
      }
    });
  }

  filterByDepartment(depID: number) {
    // filter by departments
    if (this.filterName) {
      this.filterApplications = this.filterApplications.filter((app) => app.department.departmentID === depID);
      this.filterDep = true;
    } else {
      this.filterApplications = this.applications.filter((app) => app.department.departmentID === depID);
      this.filterDep = true;
    }
  }

  filterByName(depName: string) {
    // filter by name
    if (this.filterDep) {
      this.filterApplications = this.filterApplications.filter((app) =>
        this.sharedService.contains(app.applicationName.toLocaleLowerCase().indexOf(depName.toLocaleLowerCase()))
      );
      this.filterName = true;
    } else {
      this.filterApplications = this.applications.filter((app) =>
        this.sharedService.contains(app.applicationName.toLocaleLowerCase().indexOf(depName.toLocaleLowerCase()))
      );
      this.filterName = true;
    }
  }

}
