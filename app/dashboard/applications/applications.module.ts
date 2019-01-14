import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';
import { ApplicationsComponent } from './applications.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    imports: [
        CommonModule,
        ApplicationsRoutingModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule,
        DropdownModule,
        DialogModule
    ],
    declarations: [ApplicationsComponent]
})
export class ApplicationsModule {}
