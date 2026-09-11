import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { ContractListComponent } from '../contracts/contract-list/contract-list.component';
import { RecentContractsComponent } from './components/recent-contracts/recent-contracts.component';
import { ContractDetailsComponent } from '../contracts/contract-details/contract-details.component';
import { RoleGuard } from '../../core/guards/role.guard';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            // { path: '', component: RecentContractsComponent },
            { path: '', component: ContractListComponent },
            { path: 'contracts/:id', component: ContractDetailsComponent, canActivate: [RoleGuard] } // details view
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
