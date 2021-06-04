import { ActivityService } from './../activity.service';
import { Component, OnInit } from '@angular/core';
import { VariablesGlobales } from '../VariablesGlobales';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  Activities:any=[];
  constructor(private activityService:ActivityService,private variableglob:VariablesGlobales) {
    this.getActicities()
  }

  ngOnInit(): void {
  }
  getActicities(){
    this.activityService.getAvailableActivities(this.variableglob.connectedUser.id).subscribe(
      data=>{
        console.log(data);
        this.Activities=data;
      },
      error=>{
        console.error(error);


      }
    )
  }

}
