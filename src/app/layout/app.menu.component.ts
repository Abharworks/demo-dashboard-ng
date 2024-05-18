import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(public layoutService: LayoutService) {}

    ngOnInit() {
        this.model = [
            {
                label: '',
                items: [
                    {
                        label: 'Dashboard',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/']
                    },
                    {
                        label: 'Clients',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'List',
                                icon: 'pi pi-fw pi-list',
                                routerLink: ['/clients']
                            },
                            {
                                label: 'Add new',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/clients/new']
                            }
                        ]
                    },
                    {
                        label: 'Reports',
                        icon: 'pi pi-fw pi-chart-bar',
                        items: [
                            {
                                label: 'Agency',
                                icon: 'pi pi-fw pi-chart-bar',
                                routerLink: ['/reports/agency']
                            },
                            {
                                label: 'Department',
                                icon: 'pi pi-fw pi-chart-bar',
                                routerLink: ['/reports/department']
                            },
                            {
                                label: 'Agency',
                                icon: 'pi pi-fw pi-chart-bar',
                                routerLink: ['/reports/individual']
                            }
                        ]
                    }
                ]
            }
        ];
    }
}
