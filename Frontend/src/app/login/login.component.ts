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

  newUser: any = {
    username: "",
    password: ""
  };

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
  }

  logIn(): void {
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
