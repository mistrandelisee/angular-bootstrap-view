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
  constructor() {
    for (let index = 0; index < 10; index++) {
      let element:human = new human();
      this.users.push(element)
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

}
