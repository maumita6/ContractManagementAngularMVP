import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './services/auth.service';
import { LoggerService } from './services/logger.service';

import { AuthGuard } from './guards/auth.guard';


@NgModule({
    imports: [
        CommonModule
    ],
    providers: [
        AuthService, LoggerService,
        AuthGuard
        // Add other singleton services here
    ]
})
export class CoreModule {
    // Prevent re-import
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule has already been loaded. Import CoreModule in AppModule only.'
            );
        }
    }
}
