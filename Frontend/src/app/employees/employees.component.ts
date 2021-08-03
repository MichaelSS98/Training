import { Component, OnInit, OnDestroy} from '@angular/core';
import { Apollo } from 'apollo-angular';
import {Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PopupEmployeeComponent } from '../dialogs/employees/popup-employee/popup-employee.component';
import {GET_EMPLOYEES, DELETE_EMPLOYEE, ADD_EMPLOYEE, UPDATE_EMPLOYEE, GET_PROJECTS} from './queries'
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {

  //the columns displayed in the table
  displayedColumns: string[] = ['name', 'id', 'adress', 'email', 'salary', 'hire_date',
                                'job_title', 'project_id', 'edit', 'delete'];
  employees: any = null; // the array of employee objects
  projects: any = [];
  loading: boolean;

  //an empty employee object used for creating a new entry
  empty_employee = {
    name: "",
    adress: "",
    email: "",
    hire_date: "",
    project_id: "",
    salary: "",
    job_title: ""
  };

  private querySubscription!: Subscription;

  constructor(private apollo: Apollo, public dialog: MatDialog, private router: Router) {
    this.loading = true;
   }

  //On initialisation we get all the entries from the back-end
  ngOnInit(): void {

    //check if the user is authenticated. If not redirect to log in
    const token = localStorage.getItem("token");
    if (token === null || token === "") {
      console.log("Log In first please");
      this.router.navigate(['/login']);
    }

    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_EMPLOYEES
    }).valueChanges
      .subscribe(({data, loading}) => {
        this.loading = loading;
        this.employees = data && data.getEmployees;
      });

    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_PROJECTS
    }).valueChanges
      .subscribe(({data, loading}) => {
        this.loading = loading;
        this.projects = data && data.getProjects;
      });
  }

  //function that displays the date in a more readable fashion
  customDate(employee: any): String {
    const newDate = new Date(employee.hire_date);
    let dayString = "" + newDate.getDate();
    let monthString = "" + (newDate.getMonth() + 1);

    return `${monthString}/${dayString}/${newDate.getFullYear()}`;
  }

  //Popup for adding a new employee
  openAddDialog(): void {
    const dialogRef = this.dialog.open(PopupEmployeeComponent, {
      width: '750px',
      data: {...this.empty_employee,
            projectIds: this.projects
          }
    });
    dialogRef.afterClosed().subscribe(res => {

      if (res !== undefined)
      {
        this.apollo.mutate({
          mutation: ADD_EMPLOYEE,
          variables: {
            name: res.name,
            project_id: res.project_id,
            adress: res.adress,
            email: res.email,
            hire_date: res.hire_date,
            salary: parseInt(res.salary, 10),
            job_title: res.job_title
          },
          update: (cache, {data}: any) => {
            //get existing entries
            const existingEmployees: any = cache.readQuery({query: GET_EMPLOYEES});

            //update cache with the old entries and the new one
            cache.writeQuery({
              query: GET_EMPLOYEES,
              data: {getEmployees: [
                  ...existingEmployees?.getEmployees,
                  data?.addEmployee
                ]}
            })
          }
        }).subscribe(({data}) => {
          console.log("Data added: ", data);
        }, (error) => {
          console.log(error);
        })
      }
    });
  };

  //Popup for updating an employee
  openUpdateDialog(employee: any): void {
    const employeeReplica = JSON.parse(JSON.stringify(employee));
    const dialogRef = this.dialog.open(PopupEmployeeComponent, {
      width: '750px',
      data: {...employeeReplica, 
            projectIds: this.projects
          }
    });
    dialogRef.afterClosed().subscribe(res => {

      if (res !== undefined)
      {
        this.apollo.mutate({
          mutation: UPDATE_EMPLOYEE,
          variables: {
            id: res.id,
            name: res.name,
            project_id: res.project_id,
            adress: res.adress,
            email: res.email,
            hire_date: res.hire_date,
            salary: parseInt(res.salary, 10),
            job_title: res.job_title
          },
          update: (cache) => {
            const existingEmployees: any = cache.readQuery({query: GET_EMPLOYEES});

            //update the employee from cache
            const newEmployees = existingEmployees.getEmployees.map((e: any) => {
              if (e.id === employee.id)
                return res;
              else
                return e;
            });

            cache.writeQuery({
              query: GET_EMPLOYEES,
              data: {getEmployees: newEmployees}
            });
          }
        }).subscribe(({data}) => {
          console.log("Data added: ", data);
        }, (error) => {
          console.log(error);
        })
      }
    });
  };

  //Popup for deleting an employee
  openDeleteDialog(employee: any): void {
    const dialogRef = this.dialog.open(PopupEmployeeComponent, {
      width: '600px',
      data: {message: 'Are you sure you want to delete this employee?'}
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res)
      {
        this.apollo.mutate({
          mutation: DELETE_EMPLOYEE,
          variables: {
            id: employee.id
          },
          update: (cache, el: any) => {
            const allEmployees = cache.readQuery<any>({query: GET_EMPLOYEES});

            //delete the employee from cache
            const filteredEmployees = allEmployees?.getEmployees.filter((e: any) => e.id !== employee.id);

            cache.writeQuery({
              query: GET_EMPLOYEES,
              data: {getEmployees: filteredEmployees}
            });

            cache.evict({id: employee.id});
          }
        }).subscribe(({data}) => {
          console.log('Delete data: ', data);
        }, (error) => {
          console.log(error);
        });
      }
    });
  };

  //Unsubscribe from the back-end
  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }

}
