import { Component, OnInit, OnDestroy } from '@angular/core';
import { SchoolsService } from '../../_services/schools.service';
import { School } from '../../_models/school.model';

@Component({
  selector: 'app-school',
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.css']
})
export class SchoolComponent implements OnInit {
  school:School;
  private schoolCode = '4601041'; //6th GYMNASIUM

  constructor(private ss:SchoolsService) { }

  ngOnInit() {
    this.ss.getSchool(this.schoolCode).subscribe((sch:School)=>{
      this.school = sch;
    })   
  }

}
