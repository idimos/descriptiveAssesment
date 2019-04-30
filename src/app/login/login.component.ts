import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { Teacher } from '../_models/teacher.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  teacher : Teacher;
  returnUrl: string;
  constructor(
    private fb:FormBuilder, 
    private ts: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,) { 
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      afm: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.ts.login(this.loginForm.controls.afm.value,this.loginForm.controls.password.value).subscribe((teacher:Teacher)=>{
      this.teacher = teacher;
      console.log(this.teacher);
      localStorage.setItem('token',this.teacher.afm);
      this.router.navigate([this.returnUrl]);
    })
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

}
