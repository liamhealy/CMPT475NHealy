import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'directory' },
            { path: 'directory', loadChildren: './directory/directory.module#DirectoryModule' },
            { path: 'applications', loadChildren: './applications/applications.module#ApplicationsModule' },
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
            { path: 'hr-apprequest', loadChildren: './hr-apprequest/hr-apprequest.module#HRAppRequestModule' },
            { path: 'hr-adduser', loadChildren: './hr-adduser/hr-adduser.module#HRAddUserModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}
