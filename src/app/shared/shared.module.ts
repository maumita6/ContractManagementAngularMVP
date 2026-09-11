import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { ButtonComponent } from './components/button/button.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
//import { ConfirmationService } from 'primeng/api'

//modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { PanelModule } from 'primeng/panel';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast'
//import { MessageService } from 'primeng/api';
@NgModule({
    declarations: [
        // ButtonComponent,
        //CardComponent
    ],
    providers: [],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule, CardModule, AccordionModule, PanelModule, InputTextModule, PasswordModule, DropdownModule, CheckboxModule,
        TableModule, ToastModule, ConfirmDialogModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule, ButtonModule, CardModule,
        AccordionModule, PanelModule, InputTextModule,
        PasswordModule, DropdownModule, CheckboxModule, RadioButtonModule, TableModule, ToastModule, ConfirmDialogModule
        //ButtonComponent,
        //CardComponent
    ]
})
export class SharedModule { }
