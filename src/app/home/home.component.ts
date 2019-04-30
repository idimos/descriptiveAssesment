import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Teacher } from '../_models/teacher.model';
import { AuthenticationService } from '../_services/authentication.service';

@Component({templateUrl: './home.component.html'})

export class HomeComponent implements OnInit {
  teacher : Teacher;
  currentTeacherSubscription : Subscription;

  constructor(private authenticationService: AuthenticationService) { 
    this.currentTeacherSubscription = this.authenticationService.currentTeacher.subscribe( user => {
      this.teacher = user;
    });
  }

  ngOnInit() {
  }

}
