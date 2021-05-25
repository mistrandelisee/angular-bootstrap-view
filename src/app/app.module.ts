import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
import {FormsModule } from '@angular/forms';
import { NewActivityComponent } from './new-activity/new-activity.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ViewActivityComponent } from './view-activity/view-activity.component'
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
    NewUserComponent,
    NewActivityComponent,
    UserDetailsComponent,
    SpinnerComponent,
    ViewUserComponent,
    ViewActivityComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
