import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

    //check if the user is authenticated. If not redirect to log in
    const token = localStorage.getItem("token");
    if (token === null || token === "") {
      console.log("Log In first please");
      this.router.navigate(['/login']);
    }

    //if you just logged in, refresh the app so that the taskbar updates
    if (!localStorage.getItem("reload")) {
      localStorage.setItem("reload", 'no-reload');
      window.location.reload();
    }
    else
      localStorage.removeItem("reload");
  }

}
