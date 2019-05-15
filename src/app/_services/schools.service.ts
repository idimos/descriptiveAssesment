import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {School} from '../_models/school.model';
import { Observable } from  'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolsService {

  private PHP_API_SERVER = 'http://devalu.labstem.gr';

  constructor(private http: HttpClient) { }

  public getSchool(code:string) : Observable<School> {
    return this.http.get<School>(`${this.PHP_API_SERVER}/backend/api/school/getSchool.php?code=${code}`);
  }

}
