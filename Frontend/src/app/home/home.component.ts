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

    const token = localStorage.getItem("token");
    if (token === null || token === "") {
      console.log("Log In first please");
      this.router.navigate(['/login']);
    }

    if (!localStorage.getItem("reload")) {
      localStorage.setItem("reload", 'no-reload');
      window.location.reload();
    }
    else
      localStorage.removeItem("reload");
  }

}
