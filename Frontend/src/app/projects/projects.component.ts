import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PopupProjectComponent } from '../dialogs/projects/popup-project/popup-project.component';
import {GET_PROJECTS, DELETE_PROJECT, ADD_PROJECT, UPDATE_PROJECT} from './queries'
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  //the columns displayed in the table
  displayedColumns: string[] = ['project_name', 'id', 'start_date', 'planned_end_date', 'project_code', 'edit', 'delete'];
  projects: any; // the array of project objects
  loading: boolean; 

  //an empty project object used for creating a new entry
  empty_project = {
    project_name: "",
    start_date: "",
    planned_end_date: "",
    description: "",
    project_code: ""
  };

  private querySubscription!: Subscription;

  constructor(private apollo: Apollo, public dialog: MatDialog, private router: Router) {
    this.loading = true;
  };

  //On initialisation we get all the entries from the back-end
  ngOnInit(): void {

    const token = localStorage.getItem("token");
    if (token === null || token === "") {
      console.log("Log In first please");
      this.router.navigate(['/login']);
    }

    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_PROJECTS
    }).valueChanges
      .subscribe(({data, loading}) => {
        this.loading = loading;
        this.projects = data && data.getProjects;
      });
  };

  //function that displays the date in a more readable fashion
  customDateTime(dateString: string): String {
    const newDate = new Date(dateString);
    let dayString = "" + newDate.getDate();
    let monthString = "" + (newDate.getMonth() + 1);
    let hoursString = "" + newDate.getHours();
    let minutesString = "" + newDate.getMinutes();
    let secondsString = "" + newDate.getSeconds();

    return `${monthString}/${dayString}/${newDate.getFullYear()}, ${hoursString}:${minutesString}:${secondsString}`;
  }

  //Popup for adding a new project
  openAddDialog(): void {
    const dialogRef = this.dialog.open(PopupProjectComponent, {
      width: '750px',
      data: this.empty_project
    });
    dialogRef.afterClosed().subscribe(res => {

      if (res !== undefined)
      {
        this.apollo.mutate({
          mutation: ADD_PROJECT,
          variables: {
            project_name: res.project_name,
            start_date: res.start_date,
            planned_end_date: res.planned_end_date,
            description: res.description,
            project_code: res.project_code
          },
          update: (cache, {data}: any) => {
            //get existing entries
            const existingProjects: any = cache.readQuery({query: GET_PROJECTS});

            //update cache with the old entries and the new one
            cache.writeQuery({
              query: GET_PROJECTS,
              data: {getProjects: [
                  ...existingProjects?.getProjects,
                  data?.addProject
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

  //Popup for updating a project
  openUpdateDialog(project: any): void {
    const projectReplica = JSON.parse(JSON.stringify(project));
    const dialogRef = this.dialog.open(PopupProjectComponent, {
      width: '750px',
      data: projectReplica
    });
    dialogRef.afterClosed().subscribe(res => {

      if (res !== undefined)
      {
        this.apollo.mutate({
          mutation: UPDATE_PROJECT,
          variables: {
            id: res.id,
            project_name: res.project_name,
            start_date: res.start_date,
            planned_end_date: res.planned_end_date,
            description: res.description,
            project_code: res.project_code
          },
          update: (cache) => {
            const existingProjects: any = cache.readQuery({query: GET_PROJECTS});
            
            //update the project from cache
            const newProjects = existingProjects.getProjects.map((e: any) => {
              if (e.id === project.id)
                return res;
              else
                return e;
            });

            cache.writeQuery({
              query: GET_PROJECTS,
              data: {getProjects: newProjects}
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

  //Popup for deleting a project
  openDeleteDialog(project: any): void {
    const dialogRef = this.dialog.open(PopupProjectComponent, {
      width: '600px',
      data: {message: 'Are you sure you want to delete this project?'}
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res)
      {
        this.apollo.mutate({
          mutation: DELETE_PROJECT,
          variables: {
            id: project.id
          },
          update: (cache, el: any) => {
            const allProjects = cache.readQuery<any>({query: GET_PROJECTS});

            //delete the project from cache
            const filteredProjects = allProjects?.getProjects.filter((e: any) => e.id !== project.id);

            cache.writeQuery({
              query: GET_PROJECTS,
              data: {getProjects: filteredProjects}
            });

            cache.evict({id: project.id});
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
  };

}
