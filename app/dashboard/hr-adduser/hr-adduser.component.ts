import { Component, OnInit } from '@angular/core';
import { Application } from '../../shared/models/application';
import { Employee } from '../../shared/models/employee';
import { UserService } from '../../shared/services/user.service';
import { SharedService } from '../../shared/services/shared.service';
import { Constants } from '../../shared/constants';
import { EmployeeService } from '../../shared/services/employee.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/components/common/selectitem';
import { Department } from '../../shared/models/department';
import { Role } from '../../shared/models/role';
import { EmpLocation } from '../../shared/models/emp-location';
import { ApplicationService } from '../../shared/services/application.service';
import { Manager } from 'src/app/shared/models/manager';

@Component({
  selector: 'app-hr-adduser',
  templateUrl: './hr-adduser.component.html',
  styleUrls: ['./hr-adduser.component.scss']
})
export class HRAddUserComponent implements OnInit {
  Constants = Constants;

  employee: Employee = new Employee();

  /******** Form Start *********/
  userForm: FormGroup;

  /******** Primeng Dropdown Start *********/
  departments: Department[];

  department: Department = new Department();

  roles: Role[];

  role: Role = new Role();

  locations: EmpLocation[];

  location: EmpLocation = new EmpLocation();

  /******** Primeng Dropdown End / Form End *********/

  /******** Temp Variables Start *********/
  countries: String[] = [];

  regionCodes: SelectItem[];

  employeeEmails: String[] = [];

  employeeManagers: any[] = [];

  unsearchedNames: String[] = [];
  /******** Temp Variables End *********/

  display: Boolean = false;

  constructor(
    private userService: UserService,
    private sharedService: SharedService,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private applicationService: ApplicationService) { }

  ngOnInit() {
    // Profile Form Group
    this.userForm = this.formBuilder.group({
      firstName: new FormControl(this.employee.firstName, Validators.required),
      lastName: new FormControl(this.employee.lastName, Validators.required),
      email: new FormControl(this.employee.email, Validators.required),
      title: new FormControl(this.employee.title, Validators.required),
      departmentID: new FormControl(this.employee.department.departmentID, Validators.required),
      roleID: new FormControl(this.employee.role.roleID, Validators.required),
      phoneNumber: new FormControl(this.employee.phoneNumber, Validators.required),
      locationID: new FormControl(this.employee.location.locationID, Validators.required),
      country: new FormControl(this.employee.location.country, Validators.required),
      manager: new FormControl(),
      regionCodes: new FormControl(this.regionCodes, Validators.required)
    });

    // Sets up the primeng dropdown options
    this.createDropdownOptions();

    // checks value changes of the form control
    this.subscribeFirstName();
    this.subscribeLastName();
    this.subscribeEmail();
    this.subscribeTitle();
    this.subscribeDepartment();
    this.subscribePhoneNumber();
    this.subscribeRole();
    this.subscribeLocation();
    this.subscribeCountry();
    this.subscribeManager();
    this.subscribeRegionCode();

    // get constant tables from local storage
    this.departments = JSON.parse(localStorage.getItem(Constants.DEP_LOCAL_KEY));
    this.roles = JSON.parse(localStorage.getItem(Constants.ROLE_LOCAL_KEY));
    this.locations = JSON.parse(localStorage.getItem(Constants.LOC_LOCAL_KEY));

    // push the coutries to an array for the form
    this.locations.forEach((loc) => {
      this.countries.push(loc.country);
    });

    // get employee names for the manager search
    if (this.employeeEmails.length === 0) {
      let empTemp = [];
      this.employeeService.getEmployeeNames().subscribe((data: any[]) => {
        empTemp = data;
        empTemp.forEach((emp) => {
          this.employeeEmails.push(emp.email);
          this.employeeManagers.push({ id: emp.employee_id, email: emp.email });
        });
      });
      this.unsearchedNames = this.employeeEmails;
    }
  }

  search(event) {
    if (event.query) {
      this.employeeEmails = this.employeeEmails.filter((emp) => {
        if (this.sharedService.contains(emp.toLocaleLowerCase().indexOf(event.query.toLowerCase()))) {
          return emp;
        }
      });
    }
  }

  showDialog() {
    this.display = true;
  }

  onCancel() {
    this.display = false;
  }

  onConfirm() {
    console.log(JSON.stringify(this.employee));
    if (this.employee.manager.managerID) {
      const mgr = this.employeeManagers.find((emp) => emp.email === this.employee.manager.managerEmail);
      this.employee.manager.managerID = mgr.id;
    } else {
      this.employee.manager.managerID = null;
    }
    this.employeeService.insertEmployee(this.employee).subscribe((error) => {
      console.log(error);
    });
    this.display = false;
  }

  /*
  *First Name
  */
  subscribeFirstName() {
    this.userForm.controls['firstName'].valueChanges.subscribe(value => {
      if (value) {
        value = this.employee.firstName;
      }
    });
  }

  /*
  *Last Name
  */
  subscribeLastName() {
    this.userForm.controls['lastName'].valueChanges.subscribe(value => {
      if (value) {
        value = this.employee.lastName;
      }
    });
  }

  /*
  *Email
  */
  subscribeEmail() {
    this.userForm.controls['email'].valueChanges.subscribe(value => {
      if (value) {
        value = this.employee.email;
      }
    });
  }

  /*
  *Title
  */
  subscribeTitle() {
    this.userForm.controls['title'].valueChanges.subscribe(value => {
      if (value) {
        value = this.employee.title;
      }
    });
  }

  /*
   * Department
   */
  subscribeDepartment() {
    this.userForm.controls['departmentID'].valueChanges.subscribe(value => {
      if (value) {
        value = this.employee.department.departmentID;
      }
    });
  }

  /*
   * Role
   */
  subscribeRole() {
    this.userForm.controls['roleID'].valueChanges.subscribe(value => {
      if (value) {
        value = this.employee.role.roleID;
      }
    });
  }

  /*
  *Phone Number
  */
  subscribePhoneNumber() {
    this.userForm.controls['phoneNumber'].valueChanges.subscribe(value => {
      if (value) {
        value = this.employee.phoneNumber;
      }
    });
  }

  subscribeRegionCode() {
    this.userForm.controls['regionCodes'].valueChanges.subscribe(value => {
      if (value) {
        value = JSON.stringify(this.regionCodes);
      }
    });
  }
  /*
   * Location
   */
  subscribeLocation() {
    this.userForm.controls['locationID'].valueChanges.subscribe(value => {
      // set country value when location is selected
      if (value) {
        this.employee.location.country = this.countries[value - 1];
      } else {
        this.employee.location.country = null;
      }
    });
  }

  /*
  *Country
  */
  subscribeCountry() {
    this.userForm.controls['country'].valueChanges.subscribe(value => {
      if (value) {
        value = this.employee.location.country;
      }
    });
  }

  subscribeManager() {
    this.userForm.controls['manager'].valueChanges.subscribe(value => {
      if (value) {
        value = this.employee.manager;
      } else {
        // when the value is deleted set employee names backs
        this.employeeEmails = this.unsearchedNames;
      }
    });
  }

  /*
   * Sets up the primeng dropdown options
   */
  createDropdownOptions() {
    this.regionCodes = [
      { label: Constants.REGION_CODE, value: null },
      { label: Constants.REGION_CODE_USA, value: 1 },
      { label: Constants.REGION_CODE_ENG, value: 2 },
      { label: Constants.REGION_CODE_JAP, value: 3 },
      { label: Constants.REGION_CODE_FRA, value: 4 },
    ];
  }
}
