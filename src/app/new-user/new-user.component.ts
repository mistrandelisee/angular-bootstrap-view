import { AdherantService } from './../adherant.service';
import { Component, EventEmitter, OnInit, Output,Input } from '@angular/core';
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
  @Output() closeNewPerson=new EventEmitter<any>();
  @Input() roles:role[];
  constructor(private adhservice :AdherantService) {
    this.roles=[];
    this.person=new human();
    console.log('roles comstruct');
    console.log(this.roles);
    }

  ngOnInit(): void {
    console.log('roles on init');
    // console.log(this.roles);
    this.roles=this.roles.map(element => {
      return new role(element);
    });
    console.log(this.roles);
  }
  onSubmit():boolean{
    console.log(this.roles);
    this.person.roles=this.roles;
    this.toastmessage=JSON.stringify(this.person);
    let data=this.person.getNewFormData();
    this.adhservice.newAdherant(data).subscribe(
      data=>{
        console.log(data);

      },
      error=>{
        console.error(error);

      }
    )
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
