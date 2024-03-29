import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ReglogComponent } from './components/reglog/reglog.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { HelpcentreComponent } from './pages/helpcentre/helpcentre.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProjectPreviewComponent } from './components/project-preview/project-preview.component';
import { ProjectTaskComponent } from './components/project-task/project-task.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ProjectStatusComponent } from './components/project-status/project-status.component';
import { MyTooltipDirective } from './directives/my-tooltip.directive';
import { CreateProjectOverlayComponent } from './components/create-project-overlay/create-project-overlay.component';
import { ProjectWeeklyAnalizeComponent } from './components/project-weekly-analize/project-weekly-analize.component';
import { TaskTrackComponent } from './components/task-track/task-track.component';
import { TaskTagsComponent } from './components/task-tags/task-tags.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HeaderComponent } from './components/header/header.component';
import { KanbanComponent } from './components/kanban/kanban.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

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
    ProjectPreviewComponent,
    ProjectTaskComponent,
    ProjectStatusComponent,
    MyTooltipDirective,
    CreateProjectOverlayComponent,
    ProjectWeeklyAnalizeComponent,
    TaskTrackComponent,
    TaskTagsComponent,
    HeaderComponent,
    KanbanComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    DragDropModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
