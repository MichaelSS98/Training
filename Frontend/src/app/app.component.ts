import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
  token = localStorage.getItem("token");

  constructor(private router: Router) {}

  ngOnInit(): void {
    //refresh the value of token
    this.token = localStorage.getItem("token");
  };

  logOut(): void {

    //on log out delete the token from localStorage
    localStorage.setItem("token", "");

    //reroute to Log In
    this.router.navigate(['/login']);

    //refresh the token value and therefore the taskbar
    this.ngOnInit();
  };

}
