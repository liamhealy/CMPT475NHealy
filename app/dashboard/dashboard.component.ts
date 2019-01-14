import { Component, OnInit } from '@angular/core';
import { Employee } from '../shared/models/employee';
import { UserService } from '../shared/services/user.service';
import { CacheService } from '../shared/services/cache.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  applications = [];
  departments = [];
  locations = [];
  roles = [];

  user: Employee;

  constructor(private userService: UserService,
    private cacheService: CacheService) { }

  ngOnInit() {
    // get the user from session and pass to child components
    if (sessionStorage.getItem('user') !== null) {
      this.user = new Employee();
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.userService.setUser(this.user);
    }

    if (localStorage.getItem('Departments') === null && localStorage.getItem('Applications') === null) {
      this.cacheService.getAllDepartments().subscribe((data: any[]) => {
        this.departments = data;
        localStorage.removeItem('Departments');
        this.cacheService.addDepartmentsToCache(this.departments);
        this.cacheService.getAllApplications().subscribe((data1: any[]) => {
          this.applications = data1;
          localStorage.removeItem('Applications');
          this.cacheService.addApplicationsToCache(this.applications);
        });
      });
    }

    if (localStorage.getItem('Locations') === null) {
      this.cacheService.getAllLocations().subscribe((data: any[]) => {
        this.locations = data;
        localStorage.removeItem('Locations');
        this.cacheService.addLocationsToCache(this.locations);
      });
    }

    if (localStorage.getItem('Roles') === null) {
      this.cacheService.getAllRoles().subscribe((data: any[]) => {
        this.roles = data;
        localStorage.removeItem('Roles');
        this.cacheService.addRolesToCache(this.roles);
      });
    }
  }
}
