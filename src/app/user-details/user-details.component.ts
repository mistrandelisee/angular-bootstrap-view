import { Component, OnInit, Input } from '@angular/core';
import { human } from 'src/models/human';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Input() userId:number=-1;
  @Input() user:human=new human();
  isloading:boolean=true;
  public isCollapsed = false;
  public isCollapsed2 = true;
  public active = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
