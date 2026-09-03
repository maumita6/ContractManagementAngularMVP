import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ContractRoutingModule } from './contract-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

@NgModule({

    declarations: [],
    imports: [
        CommonModule, ReactiveFormsModule, ContractRoutingModule, SharedModule, CardModule,
        InputTextModule,
        PasswordModule,
        ButtonModule
    ]
})

export class ContractModule { }
