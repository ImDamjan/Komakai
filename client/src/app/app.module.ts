import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ReglogComponent } from './components/reglog/reglog.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BodyComponent } from './pages/body/body.component';
import { DashboardComponent } from './components/navigationbar/dashboard/dashboard.component';
import { ProjectsComponent } from './components/navigationbar/projects/projects.component';
import { TasksComponent } from './components/navigationbar/tasks/tasks.component';
import { ActivityComponent } from './components/navigationbar/activity/activity.component';
import { TeamsComponent } from './components/navigationbar/teams/teams.component';
import { HelpcentreComponent } from './components/navigationbar/helpcentre/helpcentre.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    ReglogComponent,
    SidenavComponent,
    BodyComponent,
    DashboardComponent,
    ProjectsComponent,
    TasksComponent,
    ActivityComponent,
    TeamsComponent,
    HelpcentreComponent
  ],
  imports: [
    
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
