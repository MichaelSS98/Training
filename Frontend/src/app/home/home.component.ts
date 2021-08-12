import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  slides = [
    {'image': '../../assets/carusel1.jpeg'}, 
    {'image': '../../assets/carusel2.jpg'},
    {'image': '../../assets/carusel3.jpg'}
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {

    //check if the user is authenticated. If not redirect to log in
    const token = localStorage.getItem("accessToken");
    if (token === null) {
      console.log("Log In first please");
      this.router.navigate(['/login']);
    }
  }

}
