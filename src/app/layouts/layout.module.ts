import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

@NgModule({
    declarations: [
        AuthLayoutComponent,
        MainLayoutComponent
    ],
    imports: [
        CommonModule,
        RouterModule // needed for <router-outlet>
    ],
    exports: [
        AuthLayoutComponent,
        MainLayoutComponent
    ]
})
export class LayoutModule { }
