import { element } from 'protractor';
import { AdherantService } from './../adherant.service';
import { Component, OnInit, Input } from '@angular/core';
import { human } from 'src/models/human';
import { activity } from 'src/models/activity';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() userId:number=-1;
  user:human=new human();
  isloading:boolean=true;
  getError:boolean=true;
  activities:activity[]=[];
  public isCollapsed = false;
  public isCollapsed2 = true;
  public active = 1;
  constructor(private AdherantService:AdherantService) {
    // alert(this.userId)

  }

  ngOnInit(): void {
    // alert(this.userId)
    this.getPerson();
  }
  getPerson(){
    this.AdherantService.getAdherant(this.userId).subscribe(
      data =>{
        this.user=data.adherant;
        this.user.withRoles=human.hasRoles(this.user);
        this.user.isAdmin=human.isAdmin(this.user);
        console.log(data);
        console.log(this.user);
        for (let index = 0; index < data.adherant.activities.length; index++) {
          const element = data.adherant.activities[index];
          console.log(element);
          this.activities.push(activity.getActivity(element));

        }

      },
      error=>{
        this.getError=true;
      }
    )
  }

}
