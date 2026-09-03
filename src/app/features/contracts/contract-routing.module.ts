import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';

const routes: Routes = [
    { path: 'contracts ', component: ContractListComponent },
    { path: 'contracts/:id', component: ContractDetailsComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContractRoutingModule { }
