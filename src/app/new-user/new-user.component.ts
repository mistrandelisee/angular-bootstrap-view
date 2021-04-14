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
  @Input() roles:any=[];
  constructor() {
    this.person=new human();
    console.log(this.roles);
    this.roles=this.roles.map(
      function(r:role){
        if(r.name==='Admin'){
          r.checked=true
        }
        else r.checked=false
        return r;
      }
    )
    console.log(this.roles);

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
