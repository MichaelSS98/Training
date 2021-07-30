import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatDialogModule} from '@angular/material/dialog';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { EmployeesComponent } from './employees/employees.component';
import { ProjectsComponent } from './projects/projects.component';
import { GraphQLModule } from './graphql.module';
import { PopupEmployeeComponent } from './dialogs/employees/popup-employee/popup-employee.component';
import { DeleteEmployeeDialogComponent } from './dialogs/employees/delete-employee-dialog/delete-employee-dialog.component';
import { DeleteProjectDialogComponent } from './dialogs/projects/delete-project-dialog/delete-project-dialog.component';
import { PopupProjectComponent } from './dialogs/projects/popup-project/popup-project.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    ProjectsComponent,
    PopupEmployeeComponent,
    DeleteEmployeeDialogComponent,
    DeleteProjectDialogComponent,
    PopupProjectComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    FormsModule,
    GraphQLModule,
    MatDialogModule,
    MatInputModule
  ],
  entryComponents: [PopupEmployeeComponent, DeleteProjectDialogComponent, PopupProjectComponent, DeleteEmployeeDialogComponent],
  providers: [],   
  bootstrap: [AppComponent]
})
export class AppModule { }
