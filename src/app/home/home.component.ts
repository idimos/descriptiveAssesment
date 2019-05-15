import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Teacher } from '../_models/teacher.model';
import { AuthenticationService } from '../_services/authentication.service';

@Component({templateUrl: './home.component.html'})

export class HomeComponent implements OnInit, OnDestroy {
  loggedInTeacher : Teacher;
  loggedInTeacherSubscription : Subscription;

  constructor(private authenticationService: AuthenticationService) { 
    this.loggedInTeacherSubscription = this.authenticationService.currentTeacher.subscribe( user => {
      this.loggedInTeacher = user;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.loggedInTeacherSubscription.unsubscribe();
  }
}
