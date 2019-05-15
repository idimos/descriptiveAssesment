import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Lesson } from '../_models/lessons.model';
import { Observable } from  'rxjs';

@Injectable({ 
  providedIn: 'root'
})
export class LessonsService {

  private PHP_API_SERVER = 'http://devalu.labstem.gr';

  constructor(private http: HttpClient) { }

  public getTeacherLessonsFromSubClassId(subclassid:number) : Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.PHP_API_SERVER}/backend/api/lessons/getTeacherLessonsFromSubClassesId.php?subclassid=${subclassid}`);
  }
} 
