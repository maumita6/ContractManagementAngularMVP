import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
//import { RoleGuard } from '../core/guards/auth.guard';

const routes: Routes = [
    //{ path: 'contracts ', component: ContractListComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContractRoutingModule { }
