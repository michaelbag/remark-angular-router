import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// === Components
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

// === Modules
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { RedmineModule } from './redmine/redmine.module';
import { ConfigService } from './config/config.service';
import { ConfigComponent } from './config/config.component';
import { MessageService } from './message.service';
import { DashboardModule } from './dashboard/dashboard.module';


@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, MaterialModule, RedmineModule, DashboardModule ],
  declarations: [ AppComponent, MainMenuComponent, ConfigComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ ConfigService, MessageService ]
})
export class AppModule { }
