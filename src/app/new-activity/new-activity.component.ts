import { ActivityService } from './../activity.service';
import { activity } from './../../models/activity';
import { Component, Input, OnInit } from '@angular/core';
import { VariablesGlobales } from '../VariablesGlobales';

@Component({
  selector: 'app-new-activity',
  templateUrl: './new-activity.component.html',
  styleUrls: ['./new-activity.component.css']
})
export class NewActivityComponent implements OnInit {
  task:activity;
  toastshow:boolean=false;
  isloading:boolean=false;
  toastvariant='warning';
  toastmessage='';
  toastdelay=5000;
  constructor(private activityService:ActivityService,private variablesGlobales:VariablesGlobales) {
    this.task=new activity(-1);
    console.log(this.variablesGlobales.connectedUser);

    // this.task.price=-1;
  }
  onSubmit():boolean{
    this.toastshow=false;
    this.isloading=true;
    // this.toastmessage=JSON.stringify(this.person);
    this.toastmessage='Save successfully';
    this.task.ownerId=this.variablesGlobales.connectedUser.id;
    let data={activity:this.task};//.getNewFormData();
    this.activityService.newActivity(data).subscribe(
      data=>{
        console.log(data);
        this.isloading=false;
        this.toastvariant='success';
        this.toastshow=true;
      },
      error=>{
        console.error(error);

      }
    )

    return true;
  }

  ngOnInit(): void {
  }
  saveNew(){
    console.log(this.task);

    this.onSubmit()
    setTimeout(() => {
      this.toastmessage='';
      this.toastvariant='';
      this.toastshow=false;
    }, this.toastdelay);
    this.task=new activity(-1);
  }
  async saveClose(){
    // let b= await this.onSubmit();



        // if(b){this.closeNewPerson.emit(true)}

  }

}
