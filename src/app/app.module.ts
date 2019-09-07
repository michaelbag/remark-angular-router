import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// === Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

// === Modules
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { RedmineModule } from './redmine/redmine.module';
import { ConfigService } from './config.service';
import { ConfigComponent } from './config/config.component';
import { MessageService } from './message.service';


@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule, MaterialModule, RedmineModule ],
  declarations: [ AppComponent, DashboardComponent, MainMenuComponent, ConfigComponent ],
  bootstrap:    [ AppComponent ],
  providers: [ConfigService, MessageService]
})
export class AppModule { }
