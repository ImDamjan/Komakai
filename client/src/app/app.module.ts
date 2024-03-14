import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ReglogComponent } from './components/reglog/reglog.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { HelpcentreComponent } from './pages/helpcentre/helpcentre.component';
import { AplicationComponent } from './pages/aplication/aplication.component';
import { BodyComponent } from './components/body/body.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectPreviewComponent } from './components/project-preview/project-preview.component';
import { ProjectTaskComponent } from './components/project-task/project-task.component';
import { AuthComponent } from './pages/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ReglogComponent,
    SidenavComponent,
    DashboardComponent,
    ProjectsComponent,
    TasksComponent,
    ActivityComponent,
    TeamsComponent,
    HelpcentreComponent,
    AplicationComponent,
    BodyComponent,
    ProjectPreviewComponent,
    ProjectTaskComponent
  ],
  imports: [
    
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
