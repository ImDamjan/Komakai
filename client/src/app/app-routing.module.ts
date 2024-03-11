import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReglogComponent } from './components/reglog/reglog.component';
import { DashboardComponent } from './components/navigationbar/dashboard/dashboard.component';
import { AplicationComponent } from './pages/aplication/aplication.component';
import { ProjectsComponent } from './components/navigationbar/projects/projects.component';
import { ActivityComponent } from './components/navigationbar/activity/activity.component';
import { TasksComponent } from './components/navigationbar/tasks/tasks.component';
import { TeamsComponent } from './components/navigationbar/teams/teams.component';
import { HelpcentreComponent } from './components/navigationbar/helpcentre/helpcentre.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth' ,component: AuthComponent},
  {path: 'app', component:AplicationComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'activity', component: ActivityComponent},
  {path: 'tasks', component: TasksComponent},
  {path: 'teams', component: TeamsComponent},
  {path: 'help', component: HelpcentreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
