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
    this.token = localStorage.getItem("token");
  };

  logOut(): void {
    localStorage.setItem("token", "");
    this.router.navigate(['/login']);
    this.ngOnInit();
  };

  myRefresh(): void {
    this.ngOnInit();
  };
}
