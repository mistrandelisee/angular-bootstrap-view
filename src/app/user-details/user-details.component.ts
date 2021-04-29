import { AdherantService } from './../adherant.service';
import { Component, OnInit, Input } from '@angular/core';
import { human } from 'src/models/human';

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
  public isCollapsed = false;
  public isCollapsed2 = true;
  public active = 1;
  constructor(private AdherantService:AdherantService) {
    alert(this.userId)

  }

  ngOnInit(): void {
    alert(this.userId)
    this.getPerson();
  }
  getPerson(){
    this.AdherantService.getAdherant(this.userId).subscribe(
      data =>{
        this.user=data;
        console.log(data);
        console.log(this.user);
      },
      error=>{
        this.getError=true;
      }
    )
  }

}
