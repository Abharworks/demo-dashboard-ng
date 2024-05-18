import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription, debounceTime } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    dataCapacity: any;
    optionsCapacity: any;

    dataOvertime: any;
    optionsOvertime: any;

    dataDueDates: any;
    optionsDueDates: any;

    dataBillables: any;
    optionsBillables: any;

    nonBillableSummaryList: {
        client: string;
        project: string;
        internalCost: number;
        billableAmount: number;
        margin: number;
        workedTime: string;
        decimalHours: number;
        timeInSeconds: number;
    }[] = [
        {
            client: 'Client A',
            project: 'Project X',
            internalCost: 124.28,
            billableAmount: 0,
            margin: 124.28,
            workedTime: '2 hr 30 min',
            decimalHours: 2.5,
            timeInSeconds: 9000
        },
        {
            client: 'Client B',
            project: 'Project Y',
            internalCost: 135.55,
            billableAmount: 100,
            margin: 35.55,
            workedTime: '3 hr 15 min',
            decimalHours: 3.25,
            timeInSeconds: 11700
        },
        {
            client: 'Client C',
            project: 'Project Z',
            internalCost: 200.0,
            billableAmount: 150,
            margin: 50.0,
            workedTime: '4 hr 45 min',
            decimalHours: 4.75,
            timeInSeconds: 17100
        },
        {
            client: 'Client D',
            project: 'Project W',
            internalCost: 180.75,
            billableAmount: 120,
            margin: 60.75,
            workedTime: '4 hr 15 min',
            decimalHours: 4.25,
            timeInSeconds: 15300
        },
        {
            client: 'Client E',
            project: 'Project V',
            internalCost: 150.2,
            billableAmount: 110,
            margin: 40.2,
            workedTime: '3 hr 30 min',
            decimalHours: 3.5,
            timeInSeconds: 12600
        },
        {
            client: 'Client F',
            project: 'Project U',
            internalCost: 220.5,
            billableAmount: 180,
            margin: 40.5,
            workedTime: '5 hr 15 min',
            decimalHours: 5.25,
            timeInSeconds: 18900
        },
        {
            client: 'Client G',
            project: 'Project T',
            internalCost: 170.35,
            billableAmount: 130,
            margin: 40.35,
            workedTime: '4 hr 0 min',
            decimalHours: 4.0,
            timeInSeconds: 14400
        },
        {
            client: 'Client H',
            project: 'Project S',
            internalCost: 250.9,
            billableAmount: 200,
            margin: 50.9,
            workedTime: '6 hr 30 min',
            decimalHours: 6.5,
            timeInSeconds: 23400
        },
        {
            client: 'Client I',
            project: 'Project R',
            internalCost: 300.0,
            billableAmount: 250,
            margin: 50.0,
            workedTime: '7 hr 0 min',
            decimalHours: 7.0,
            timeInSeconds: 25200
        },
        {
            client: 'Client J',
            project: 'Project Q',
            internalCost: 180.45,
            billableAmount: 140,
            margin: 40.45,
            workedTime: '4 hr 30 min',
            decimalHours: 4.5,
            timeInSeconds: 16200
        }
    ];

    clients: string[] = [];
    selectedClient: string;

    agencyOverviewData: {
        annualSalary: string;
        workableHrs: string;
        buildingAllocation: string;
        expenseCost: string;
        monthlyWage: string;
        hourlyRate: string;
        fullyLoadedCost: string;
        hoursInMonth: string;
        PTOHours: string;
        workableHours: string;
        trackedHours: string;
        untrackedHours: string;
        trackedPercent: string;
        nonBillableHours: string;
        nonBillablePercent: string;
        nonBillableCost: string;
        billableHours: string;
        billablePercent: string;
        billableCost: string;
        billablesCost: string;
    }[] = [
        {
            annualSalary: '50000',
            workableHrs: '160',
            buildingAllocation: '10000',
            expenseCost: '5000',
            monthlyWage: '4166.67',
            hourlyRate: '26.04',
            fullyLoadedCost: '57237.5',
            hoursInMonth: '160',
            PTOHours: '16',
            workableHours: '144',
            trackedHours: '120',
            untrackedHours: '24',
            trackedPercent: '83.33',
            nonBillableHours: '40',
            nonBillablePercent: '33.33',
            nonBillableCost: '1041.6',
            billableHours: '80',
            billablePercent: '66.67',
            billableCost: '2083.2',
            billablesCost: '3124.8'
        },
        {
            annualSalary: '60000',
            workableHrs: '160',
            buildingAllocation: '12000',
            expenseCost: '6000',
            monthlyWage: '5000',
            hourlyRate: '31.25',
            fullyLoadedCost: '68775',
            hoursInMonth: '160',
            PTOHours: '16',
            workableHours: '144',
            trackedHours: '120',
            untrackedHours: '24',
            trackedPercent: '83.33',
            nonBillableHours: '40',
            nonBillablePercent: '33.33',
            nonBillableCost: '1250',
            billableHours: '80',
            billablePercent: '66.67',
            billableCost: '2500',
            billablesCost: '3750'
        },
        {
            annualSalary: '70000',
            workableHrs: '160',
            buildingAllocation: '14000',
            expenseCost: '7000',
            monthlyWage: '5833.33',
            hourlyRate: '36.46',
            fullyLoadedCost: '80000',
            hoursInMonth: '160',
            PTOHours: '16',
            workableHours: '144',
            trackedHours: '120',
            untrackedHours: '24',
            trackedPercent: '83.33',
            nonBillableHours: '40',
            nonBillablePercent: '33.33',
            nonBillableCost: '1458.3',
            billableHours: '80',
            billablePercent: '66.67',
            billableCost: '2916.6',
            billablesCost: '4374.9'
        },
        {
            annualSalary: '80000',
            workableHrs: '160',
            buildingAllocation: '16000',
            expenseCost: '8000',
            monthlyWage: '6666.67',
            hourlyRate: '41.67',
            fullyLoadedCost: '91250',
            hoursInMonth: '160',
            PTOHours: '16',
            workableHours: '144',
            trackedHours: '120',
            untrackedHours: '24',
            trackedPercent: '83.33',
            nonBillableHours: '40',
            nonBillablePercent: '33.33',
            nonBillableCost: '1666.6',
            billableHours: '80',
            billablePercent: '66.67',
            billableCost: '3333.2',
            billablesCost: '4999.8'
        },
        {
            annualSalary: '90000',
            workableHrs: '160',
            buildingAllocation: '18000',
            expenseCost: '9000',
            monthlyWage: '7500',
            hourlyRate: '46.88',
            fullyLoadedCost: '102500',
            hoursInMonth: '160',
            PTOHours: '16',
            workableHours: '144',
            trackedHours: '120',
            untrackedHours: '24',
            trackedPercent: '83.33',
            nonBillableHours: '40',
            nonBillablePercent: '33.33',
            nonBillableCost: '1875',
            billableHours: '80',
            billablePercent: '66.67',
            billableCost: '3750',
            billablesCost: '5625'
        }
    ];

    projectMarginList: {
        budgetHours: string;
        hours: string;
        cost: string;
        billable: string;
        margin: string;
        projectName: string;
    }[] = [
        {
            budgetHours: '80',
            hours: '70',
            cost: '$7000',
            billable: 'Yes',
            margin: '10%',
            projectName: 'Project A'
        },
        {
            budgetHours: '100',
            hours: '90',
            cost: '$9000',
            billable: 'Yes',
            margin: '5%',
            projectName: 'Project B'
        },
        {
            budgetHours: '120',
            hours: '110',
            cost: '$11000',
            billable: 'Yes',
            margin: '8%',
            projectName: 'Project C'
        }
    ];
    selectedProjectMarginData: {
        budgetHours: string;
        hours: string;
        cost: string;
        billable: string;
        margin: string;
        projectName: string;
    } = this.projectMarginList[0];
    filteredProjectMarginData: {
        budgetHours: string;
        hours: string;
        cost: string;
        billable: string;
        margin: string;
        projectName: string;
    }[];
    constructor() {}

    ngOnInit() {
        this.initCapacityChart();
        this.initOvertimeChart();
        this.initDueDatesChart();
        this.initBillablesChart();

        this.clients = this.nonBillableSummaryList.map(el => el.client);
        this.selectedClient = this.clients[0];

        this.filterTheProject();
    }

    initCapacityChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.dataCapacity = {
            labels: ['Booked', 'Available', 'Unscheduled'],
            datasets: [
                {
                    data: [540, 325, 702],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        };

        this.optionsCapacity = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }

    initOvertimeChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.dataOvertime = {
            labels: ['non-billable', 'billable'],
            datasets: [
                {
                    data: [540, 325],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--yellow-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--yellow-400')
                    ]
                }
            ]
        };

        this.optionsOvertime = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }

    initDueDatesChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder = documentStyle.getPropertyValue(
            '--surface-border'
        );

        this.dataDueDates = {
            labels: [''],
            datasets: [
                {
                    label: 'Past Due',
                    backgroundColor: documentStyle.getPropertyValue(
                        '--blue-500'
                    ),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [20]
                },
                {
                    label: 'On Time',
                    backgroundColor: documentStyle.getPropertyValue(
                        '--pink-500'
                    ),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: [88]
                },
                {
                    label: 'Unassigned',
                    backgroundColor: documentStyle.getPropertyValue(
                        '--green-500'
                    ),
                    borderColor: documentStyle.getPropertyValue('--green-500'),
                    data: [68]
                }
            ]
        };

        this.optionsDueDates = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 1.1,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    initBillablesChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue(
            '--text-color-secondary'
        );
        const surfaceBorder = documentStyle.getPropertyValue(
            '--surface-border'
        );

        this.dataBillables = {
            labels: [''],
            datasets: [
                {
                    label: 'Billable Hrs Worked in $',
                    backgroundColor: documentStyle.getPropertyValue(
                        '--blue-500'
                    ),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [80]
                },
                {
                    label: 'Actual Billables',
                    backgroundColor: documentStyle.getPropertyValue(
                        '--pink-500'
                    ),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: [346]
                }
            ]
        };

        this.optionsBillables = {
            indexAxis: 'y',
            maintainAspectRatio: false,
            aspectRatio: 1.1,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }

    calculateTheTotal(fieldName: string) {
        return this.nonBillableSummaryList
            .map(el => el[fieldName])
            .reduce((partialSum, a) => partialSum + a, 0);
    }

    filterTheProject() {
        this.filteredProjectMarginData = this.projectMarginList.filter(
            el => el == this.selectedProjectMarginData
        );
    }
}
