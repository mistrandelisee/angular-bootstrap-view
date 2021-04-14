import { role } from 'src/models/role';
import { FunctionService } from '../function.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {
  roles:any=[];
  isLoading:boolean=false;
  constructor(private roleService:FunctionService) {
    this.getAllRoles();
  }

  ngOnInit(): void {
  }
  getAllRoles(){
    this.isLoading=true;
    this.roleService.getAllRoles().subscribe(
      data=>{
        this.roles=data;
        console.log(data);

      },
      error=>{
        console.log(error);

      }
    )
    this.isLoading=false;
}
}
