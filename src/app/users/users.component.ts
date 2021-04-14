import { Component, OnInit, Input } from '@angular/core';
import { human } from 'src/models/human';
import { AdherantService } from '../adherant.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  newperson:boolean=false;
  hided:boolean=false;
  isloading:boolean=false;
  getError:boolean=false;
  users:any=[];
  search:any;
  allUsers:any=[];
  @Input() allRoles:any=[];
  constructor(private adherantservice:AdherantService) {
    this.search={input:'',choix:'0'};
    this.isloading=true;
    this.getAllPerson();
    this.isloading=false;
   }
  getAllPerson(){
    this.adherantservice.getAllAdherants().subscribe(
      data =>{


        this.users=data;
        this.allUsers=data;
        this.getError=false;
        console.log(data);
        console.log(this.users);
      },
      error=>{
        this.getError=true;
      }
    )
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
    console.log(this.search)
    var srch:string=this.search.input;

    var haschoice=this.search.choix=='0'?false:true;
    var choix=this.search.choix=='1'?true:false;
    this.users =this.allUsers.filter( (e :human) => {
      let  b:boolean=false;
      let fullname=e.fullName||"";
      let phone=e.phone||"";
        if (fullname.includes(srch) || phone.includes(srch)) {
          b=true;
          if (haschoice && e.active!=choix) {
            b=false;
          }

        }
        if(b) return e;
        else return null
      }
    )
  }
   makeData() {
    this.search={input:'',choix:'0'};
    for (let index = 0; index < 300; index++) {
      let element:human = new human();
      element.firstName=`FN${new Date().getMilliseconds()%10 } text${index}`;
      if (index%3 ==1) { //randomly activate
        element.active=true;
      }

      this.users.push(element)
      this.allUsers.push(element)
    }
  }
}
