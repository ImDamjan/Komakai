import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { HelpcentreComponent } from './pages/helpcentre/helpcentre.component';
import { AuthGuard } from './services/guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {path: 'auth' ,component: AuthComponent},
  {path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
  {path: 'projects', component: ProjectsComponent,canActivate: [AuthGuard]},
  {path: 'activity', component: ActivityComponent,canActivate: [AuthGuard]},
  {path: 'tasks', component: TasksComponent,canActivate: [AuthGuard]},
  {path: 'teams', component: TeamsComponent,canActivate: [AuthGuard]},
  {path: 'help', component: HelpcentreComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
