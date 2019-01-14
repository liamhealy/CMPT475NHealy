import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HRAddUserRoutingModule } from './hr-adduser-routing.module';
import { HRAddUserComponent } from './hr-adduser.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    imports: [
        CommonModule,
        HRAddUserRoutingModule,
        TranslateModule,
        FileUploadModule,
        FormsModule,
        ReactiveFormsModule,
        DropdownModule,
        AutoCompleteModule,
        DialogModule
    ],
    declarations: [HRAddUserComponent]
})
export class HRAddUserModule {}
