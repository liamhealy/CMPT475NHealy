import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HRAppRequestComponent } from './hr-apprequest.component';

const routes: Routes = [
    {
        path: '', component: HRAppRequestComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HRAppRequestRoutingModule {
}
