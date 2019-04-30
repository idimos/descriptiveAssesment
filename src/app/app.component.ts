import { Component } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { NavigationCancel,
        Event,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';
import { Teacher } from './_models/teacher.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Descriptive Evaluation Project';
  currentTeacher: Teacher;

  constructor(
    private _loadingBar: SlimLoadingBarService, 
    private _router: Router,
    private authenticationService: AuthenticationService
    ) {
        this._router.events.subscribe((event: Event) => {
          this.navigationInterceptor(event);
        });
        this.authenticationService.currentTeacher.subscribe(x => this.currentTeacher = x);
        console.log(this.currentTeacher.surname);
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }

  logout() {
    this.authenticationService.logout();
    this._router.navigate(['/login']);
}
}