import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { AutoCompleteModule } from 'primeng/autocomplete';

@NgModule({
    imports: [
        CommonModule,
        TableModule,
        DashboardRoutingModule,
        DataViewModule,
        ButtonModule,
        PanelModule,
        DialogModule,
        DropdownModule,
        FormsModule,
        TabViewModule,
        ReactiveFormsModule,
        MultiSelectModule,
        TranslateModule,
        AutoCompleteModule,
        FileUploadModule,
        NgbDropdownModule.forRoot()
    ],
    declarations: [DashboardComponent, SidebarComponent, HeaderComponent]
})
export class DashboardModule { }
