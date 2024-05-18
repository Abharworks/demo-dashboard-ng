import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: DashboardComponent },
            { path: 'reports/agency', component: DashboardComponent },
            { path: 'reports/department', component: DashboardComponent },
            { path: 'reports/individual', component: DashboardComponent }
        ])
    ],
    exports: [RouterModule]
})
export class DashboardsRoutingModule {}
