import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { human } from 'src/models/human';
import { AdherantService } from '../adherant.service';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  @Input() user:human=new human();
  @Output() onSelectUser=new EventEmitter<number>();
  isloading:boolean=false;
  getError:boolean=false;
  toastshow:boolean=false;
  toastvariant='warning';
  toastmessage='';
  toastdelay=5000;
  constructor(private adherantservice:AdherantService) { }

  ngOnInit(): void {
    this.user.withRoles=human.hasRoles(this.user);
    this.user.isAdmin=human.isAdmin(this.user);
  }
  selectUser(id:number){
    this.onSelectUser.emit(id)
  }
  modify(username:String,active:boolean) {
    this.toastshow=false;
    let userbody={
      user:{
        username,
        active
      }
    }
    console.log(userbody);
    this.isloading=true;
    this.adherantservice.updatePerson(userbody).subscribe(
      data=>{console.log(data);
        this.isloading =false
        this.toastshow=true;
        this.toastvariant='success';
        this.toastmessage='updated has been done successfully';
      },
      error=>{console.error(error);
      }
    )
  }
}
