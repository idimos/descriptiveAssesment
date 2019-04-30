import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { Teacher } from '../_models/teacher.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  PHP_API_SERVER = 'http://devalu.labstem.gr';
  private currentTeacherSubject: BehaviorSubject<Teacher>;
  public currentTeacher: Observable<Teacher>;

  constructor(private http: HttpClient) {
    this.currentTeacherSubject = new BehaviorSubject<Teacher>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentTeacher = this.currentTeacherSubject.asObservable();
   }

  public get currentUserValue(): Teacher {
    return this.currentTeacherSubject.value;
  }

  login(afm:string,password:string): Observable<Teacher>{
    this.currentTeacher = this.http.get<Teacher>(`${this.PHP_API_SERVER}/backend/api/teacher/login.php?afm=${afm}&password=${password}`);
    localStorage.setItem('currentUser', JSON.stringify(this.currentTeacher));
    return this.currentTeacher;
  }

//   login_(username: string, password: string) {
//     return this.http.post<any>(`/users/authenticate`, { username, password })
//         .pipe(map(user => {
//             // login successful if there's a jwt token in the response
//             if (user && user.token) {
//                 // store user details and jwt token in local storage to keep user logged in between page refreshes
//                 localStorage.setItem('currentUser', JSON.stringify(user));
//                 this.currentTeacherSubject.next(user);
//             }

//             return user;
//         }));
// }

logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentTeacher = null;
}
}
