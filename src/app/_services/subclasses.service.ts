import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SubClass } from '../_models/subclass.model';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubclassesService {

  private PHP_API_SERVER = 'http://devalu.labstem.gr';

  constructor(private http: HttpClient) { }

  public getTeacherSubClassess(afm:string) : Observable<SubClass[]> {
    return this.http.get<SubClass[]>(`${this.PHP_API_SERVER}/backend/api/subclass/getTeacherSubClasses.php?teacherAfm=${afm}`);
  }
}
