import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [CommonModule,
        ForgotPasswordRoutingModule,
        TranslateModule],
    declarations: [ForgotPasswordComponent]
})
export class ForgotPasswordModule { }
