import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HRAddUserComponent } from './hr-adduser.component';

const routes: Routes = [
    {
        path: '', component: HRAddUserComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HRAddUserRoutingModule {
}
