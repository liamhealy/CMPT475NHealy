import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HRAppRequestRoutingModule } from './hr-apprequest-routing.module';
import { HRAppRequestComponent } from './hr-apprequest.component';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

@NgModule({
    imports: [
        CommonModule,
        HRAppRequestRoutingModule,
        TranslateModule,
        TableModule,
        DialogModule
    ],
    declarations: [HRAppRequestComponent]
})
export class HRAppRequestModule {}
