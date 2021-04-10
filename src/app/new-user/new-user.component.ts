import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { human } from './../../models/human';
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  person:human;
  toastshow:boolean=false;
  toastvariant='warning';
  toastmessage='';
  toastdelay=5000;
  @Output() closeNewPerson=new EventEmitter<any>();
  constructor() {
    this.person=new human();
  }

  ngOnInit(): void {
  }
  onSubmit():Promise<any>{
    this.toastmessage=JSON.stringify(this.person);
    this.toastvariant='success';
    this.toastshow=true;
    return new Promise<any>((resolve, reject) => {
      resolve(false)
    });
  }
  saveNew(){
    this.onSubmit()
    setTimeout(() => {
      this.toastmessage='';
      this.toastvariant='';
      this.toastshow=false;
    }, this.toastdelay);
    this.person=new human();
    this.person.firstName=" ";
    this.person.lastName=" ";
  }
  async saveClose(){
    let b= await this.onSubmit();



        if(b){this.closeNewPerson.emit(true)}


  }

}
