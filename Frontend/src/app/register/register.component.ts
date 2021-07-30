import { Component, OnInit } from '@angular/core';
import { gql } from 'apollo-angular';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';

const REGISTER = gql`
mutation RegisterMutation($email: String!, $password: String!, $username: String!) {
  register(email: $email, password: $password, username: $username)
}
`;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //the entry in which we keep the form information
  newUser: any = {
    username: "",
    email: "",
    password: "",
    confirm_password: ""
  };

  constructor(private apollo: Apollo, private router: Router) { }

  ngOnInit(): void {
  }

  Register(): void {

    //check if all the credentials are completed
    if (this.newUser.username === "" || this.newUser.password === "" ||
        this.newUser.email === "" || this.newUser.confirm_password === "")
      console.log("Missing credentials for register!");
    else if (this.newUser.password !== this.newUser.confirm_password)
      console.log("Passwords do not match!"); //check if the password fields match
    else
      this.apollo.mutate({
        mutation: REGISTER,
        variables: {
          username: this.newUser.username,
          password: this.newUser.password,
          email: this.newUser.email
        }
      }).subscribe(({data} :any) => {
          //if everything worked correctly an account is created
          //and the user is redirected to the Log In page
          console.log("Account created!")
          this.router.navigate(['/login']);
      }, (error) => {
        console.log(error);
      });
  };
}
