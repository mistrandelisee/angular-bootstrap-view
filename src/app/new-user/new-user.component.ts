import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { human } from './../../models/human';
import { role } from './../../models/role';
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
  roles:any=[];
  @Output() closeNewPerson=new EventEmitter<any>();
  constructor() {
    this.person=new human();
    for (let index = 0; index < 6; index++) {
      let element:role = new role();
      element.name='RL-'+index;
      if(element.name=='RL-2') element.checked=true
      this.roles.push(element)
    }
  }

  ngOnInit(): void {
  }
  onSubmit():boolean{
    console.log(this.roles);

    this.toastmessage=JSON.stringify(this.person);
    this.toastvariant='success';
    this.toastshow=true;
    return true;
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
