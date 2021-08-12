import { Component, OnInit } from '@angular/core';
import { gql } from 'apollo-angular';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';

const LOGIN = gql`
  mutation LoginMutation($password: String!, $username: String!) {
    login(password: $password, username: $username) 
    {
      accessToken
      refreshToken
    }
  }  
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  incompleteFieldError: boolean = false;

  //the entry in which we keep the form information
  newUser: any = {
    username: "",
    password: ""
  };

  constructor(private apollo: Apollo, private router: Router,
              private sharedService: SharedService) { }

  ngOnInit(): void {
  }

  logIn(): void {
    
    //check if all the credentials are completed
    if (this.newUser.username === "" || this.newUser.password === "")
    {
      console.log("Missing credentials for login!");
      this.incompleteFieldError = true;
    }
    else
    {
      this.incompleteFieldError = false;

      this.apollo.mutate({
        mutation: LOGIN,
        variables: {
          username: this.newUser.username,
          password: this.newUser.password
        }
      }).subscribe(({data} :any) => {
        //if everything worked correctly store the token in localStorage
        if (data.login !== "Wrong Credentials!")
        {
          localStorage.setItem("accessToken", data.login.accessToken);
          localStorage.setItem("refreshToken", data.login.refreshToken);
          this.sharedService.sendChangeHeaderEvent();
          this.router.navigate(['']);
        }
      }, (error) => {
        console.log(error);
      });
    }
  };

}
