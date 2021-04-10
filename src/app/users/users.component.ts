import { Component, OnInit } from '@angular/core';
import { human } from 'src/models/human';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  newperson:boolean=false;
  hided:boolean=false;
  users:any=[];
  search:any;
  allUsers:any=[];
  constructor() {
    this.search={input:''};
    for (let index = 0; index < 10; index++) {
      let element:human = new human();
      element.firstName=`FN${new Date().getMilliseconds()%10 } text${index}`;
      if (index%3 ==1) { //randomly activate
        element.active=true;
      }

      this.users.push(element)
      this.allUsers.push(element)
    }
   }
  addperson(){
    this.newperson=true;
    this.hided=true;

  }
  ngOnInit(): void {

  }
  closeAddPerson(){
    this.newperson=false;
    this.hided=false;
  }
  doSearch(){
    // alert(this.search.input)
    var srch:string=this.search.input;
    this.users =this.allUsers.filter( (e :human) => {
      debugger
      let  b:boolean=false;
        if (e.firstName.includes(srch)) {
          b=true;
        }
        if(b) return e;
        else return null
      }
    )
  }
}
