import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { TasksComponent } from './pages/tasks/tasks.component';
// import { TeamsComponent } from './pages/teams/teams.component';
import { HelpcentreComponent } from './pages/helpcentre/helpcentre.component';
import { AuthGuard } from './services/guard.service';
import { ProjectDetailsComponent } from './pages/project-details/project-details.component';
import path from 'path';
import { AdminComponent } from './pages/admin/admin.component';
import { TaskDetailsComponent } from './pages/task-details/task-details.component';
import { ProjectPreviewComponent } from './components/project-preview/project-preview.component';
import { adminAuthorizationGuard } from './guards/admin-authorization.guard';
import { pmAuthorizationGuard } from './guards/pm-authorization.guard';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full'},
  {path: 'auth' ,component: AuthComponent,canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard,pmAuthorizationGuard]},
  {path: 'projects',component: ProjectPreviewComponent,canActivate: [AuthGuard]},
  {path: 'activity', component: ActivityComponent,canActivate: [AuthGuard]},
  {path: 'tasks', component: TasksComponent,canActivate: [AuthGuard]},
  // {path: 'teams', component: TeamsComponent,canActivate: [AuthGuard]},
  {path: 'help', component: HelpcentreComponent,canActivate: [AuthGuard]},
  
  {path: 'projects/project-details/:projectId', component: ProjectDetailsComponent,canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent,canActivate: [AuthGuard,adminAuthorizationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
