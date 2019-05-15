import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Teacher } from '../_models/teacher.model';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {

  PHP_API_SERVER = 'http://devalu.labstem.gr';
  private currentTeacherSubject: BehaviorSubject<Teacher>;
  public currentTeacher: Observable<Teacher>;

  constructor(private http: HttpClient) {
    this.currentTeacherSubject = new BehaviorSubject<Teacher>(JSON.parse(localStorage.getItem('currentTeacher')));
    this.currentTeacher = this.currentTeacherSubject.asObservable();
   }

  public get currentTeacherValue(): Teacher {
    return this.currentTeacherSubject.value;
  }

  // login(afm:string,password:string): Observable<Teacher>{
  //   this.currentTeacher = this.http.get<Teacher>(`${this.PHP_API_SERVER}/backend/api/teacher/login.php?afm=${afm}&password=${password}`);
  //   localStorage.setItem('currentteacher', JSON.stringify(this.currentTeacher));
  //   return this.currentTeacher;
  // }

  login(afm:string,password:string) {
    return this.http.get<Teacher>(`${this.PHP_API_SERVER}/backend/api/teacher/login.php?afm=${afm}&password=${password}`)
        .pipe(map(teacher => {
            if (teacher) {
                // store teacher details in local storage to keep teacher logged in between page refreshes
                localStorage.setItem('currentTeacher', JSON.stringify(teacher));
                this.currentTeacherSubject.next(teacher);
            }

            return teacher;
        }));
}

  logout() {
    // remove teacher from local storage to log teacher out
    localStorage.removeItem('currentTeacher');
    this.currentTeacherSubject.next(null);
  }

}