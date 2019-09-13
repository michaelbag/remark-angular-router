import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// === Components
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { ConfigComponent } from './config/config.component';
import { MessageComponent } from './message/message.component';

// === Modules
// Material {{
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
// }}
import { AppRoutingModule } from './app-routing.module';
import { RedmineModule } from './redmine/redmine.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HttpClientModule } from '@angular/common/http';

// === service
import { ConfigService } from './config/config.service';
import { MessageService } from './message.service';
// import { HttpErrorHandler } from './http-error-handler.service';
// import { httpInterceptorProviders } from './http-interceptors/index';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    RedmineModule,
    DashboardModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    MainMenuComponent,
    ConfigComponent,
    MessageComponent
  ],
  bootstrap: [AppComponent],

  providers: [ConfigService, MessageService]
})
export class AppModule { }
