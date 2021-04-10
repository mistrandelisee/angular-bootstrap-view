import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AccordionComponent } from './accordion/accordion.component';
import { ToatComponent } from './toat/toat.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskComponent } from './task/task.component';
import { AdministrationComponent } from './administration/administration.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { NewUserComponent } from './new-user/new-user.component';
import {FormsModule } from '@angular/forms'
@NgModule({
  declarations: [
    AppComponent,
    AccordionComponent,
    ToatComponent,
    HomeComponent,
    DashboardComponent,
    TaskComponent,
    AdministrationComponent,
    ProfileComponent,
    UsersComponent,
    NewUserComponent
  ],
  imports: [
    BrowserModule, NgbModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }