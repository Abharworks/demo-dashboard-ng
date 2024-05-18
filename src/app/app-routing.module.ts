import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from './layout/app.layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: '',
                    component: AppLayoutComponent,
                    children: [
                        {
                            path: '',
                            loadChildren: () =>
                                import(
                                    './screens/dashboard/dashboard.module'
                                ).then(m => m.DashboardModule)
                        }
                    ]
                },
                { path: '**', redirectTo: '/' }
            ],
            {
                useHash: true
            }
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
