import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../shared';
import { Employee } from '../shared/models/employee';
import { TranslateService } from '@ngx-translate/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CacheService } from '../shared/services/cache.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  user: Employee = new Employee();

  isError = false;
  errorMsg = 'Incorrect email or password';

  constructor(private authGuard: AuthGuard,
    private translate: TranslateService,
    private formBuilder: FormBuilder,
    private cacheService: CacheService) { }

  ngOnInit() {
    this.translate.addLangs(['en', 'fr', 'ur', 'es', 'it', 'fa', 'de']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|fr|ur|es|it|fa|de/) ? browserLang : 'en');

    this.loginForm = this.formBuilder.group({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });

    this.subscribeEmail();
    this.subscribePassword();
  }

  /*
  *Email
  */
  subscribeEmail() {
    this.loginForm.controls['email'].valueChanges.subscribe(value => {
      if (value) {
        this.isError = false;
      }
    });
  }

  /*
    *Password
    */
  subscribePassword() {
    this.loginForm.controls['password'].valueChanges.subscribe(value => {
      if (value) {
        this.isError = false;
      }
    });
  }

  onLoggedin() {
    // check if the user is an employee and decide access
    this.authGuard.authenticateEmployee(this.user.email, this.user.password).subscribe((data: any) => {
      if (data.result || data.employee_id) {
        localStorage.setItem('isLoggedin', 'true');
        this.authGuard.setUser(data);
      } else {
        localStorage.setItem('isLoggedin', 'false');
        this.user.password = null;
        this.isError = true;
      }
    });
  }

}
