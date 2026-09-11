import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layouts/layout.module';
// Core & Shared
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ConfirmationService, MessageService } from 'primeng/api';

// Interceptors
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthRoutingModule } from './features/auth/auth-routing.module';
import { MainLayoutRoutingModule } from './layouts/main-layout/main-layout-routing.module';

@NgModule({
  declarations: [
    AppComponent],

  imports: [
    BrowserModule, BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CoreModule, LayoutModule, SharedModule, AuthRoutingModule, MainLayoutRoutingModule    // Feature modules are lazy-loaded
  ],
  providers: [
    ConfirmationService, // Enforces a true root singleton instance
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
