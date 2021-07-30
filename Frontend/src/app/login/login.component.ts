import { Component, OnInit } from '@angular/core';
import { gql } from 'apollo-angular';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';

const LOGIN = gql`
  mutation LoginMutation($password: String!, $username: String!) {
    login(password: $password, username: $username)
  }  
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //the entry in which we keep the form information
  newUser: any = {
    username: "",
    password: ""
  };

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
  }

  logIn(): void {
    
    //check if all the credentials are completed
    if (this.newUser.username === "" || this.newUser.password === "")
      console.log("Missing credentials for login!");
    else
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
          localStorage.setItem("token", data.login);
          this.router.navigate(['']);
        }
      }, (error) => {
        console.log(error);
      });
  };

}
