import { Component, OnInit, Input } from '@angular/core';

import { SubclassesService } from '../_services/subclasses.service';
import { LessonsService } from '../_services/lessons.service';
import { SubClass } from '../_models/subclass.model';
import { Lesson } from '../_models/lessons.model';

@Component({
  selector: 'subclassess',
  templateUrl: './subclassess.component.html',
  styleUrls: ['./subclassess.component.css']
})
export class SubclassessComponent implements OnInit {

  @Input() teacherAFM:string; // teacher afm
  subclasses: SubClass[]; // teacher's subclasses
  lessons : Lesson[];
  selectedSubClass: SubClass = { id:null, name:null, classname:null};

  constructor(private subclassService: SubclassesService, private ls : LessonsService) { }

  ngOnInit() {
    this.subclassService.getTeacherSubClassess(this.teacherAFM).subscribe((subclas:SubClass[]) => {
      this.subclasses = subclas;
    })
  }

  selectSubClass(subclass:SubClass){
    this.selectedSubClass = subclass;
    this.getLessons();
    console.log(this.selectedSubClass);
  }

  getLessons(){
    this.ls.getTeacherLessonsFromSubClassId(this.selectedSubClass.id).subscribe((lessons:Lesson[])=>{
      this.lessons = lessons;
    })
  }
}
