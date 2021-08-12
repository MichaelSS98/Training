import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
  token = localStorage.getItem("token");
  clickEventSubscription: Subscription;

  constructor(private router: Router, private sharedService: SharedService) {
    this.clickEventSubscription = this.sharedService.getChangeHeaderEvent().subscribe(() => {
      this.refreshToken();
    });
  }

  ngOnInit(): void {
    //refresh the value of token
    this.token = localStorage.getItem("accessToken");
  };

  logOut(): void {

    //on log out delete the token from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    //reroute to Log In
    this.router.navigate(['/login']);

    //refresh the token value and therefore the taskbar
    this.ngOnInit();
  };

  refreshToken(): void {
    this.token = localStorage.getItem("accessToken");
  }

}
