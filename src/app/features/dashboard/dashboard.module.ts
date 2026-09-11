import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard.component';

//import { ContractRoutingModule } from '../contracts/contract-routing.module';
import { ContractListComponent } from '../contracts/contract-list/contract-list.component';
import { ContractDetailsComponent } from '../contracts/contract-details/contract-details.component';

import { RecentContractsComponent } from './components/recent-contracts/recent-contracts.component';

@NgModule({
    declarations: [
        DashboardComponent,
        ContractListComponent, ContractDetailsComponent,
        RecentContractsComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DashboardRoutingModule,
        //ContractRoutingModule,
        SharedModule
    ]
})
export class DashboardModule { }
