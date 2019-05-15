import { Component, OnInit, Input } from '@angular/core';
import { LessonsService } from '../_services/lessons.service';
import { Lesson } from '../_models/lessons.model';

@Component({
  selector: 'lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {
  @Input() subclassId: number;
  lessons : Lesson[];

  constructor(private ls : LessonsService) { }

  ngOnInit() {
    this.ls.getTeacherLessonsFromSubClassId(this.subclassId).subscribe((lessons:Lesson[])=>{
      this.lessons = lessons;
    })
  }

}
