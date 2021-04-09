import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toat',
  templateUrl: './toat.component.html',
  styleUrls: ['./toat.component.css']
})
export class ToatComponent implements OnInit {
  @Input() show:boolean = true;
  toast:any;
  @Input() issuccess:boolean=false;
  @Input() msg:string='';

  constructor() {
    if(!this.msg){
    this.msg="empty";
    }
  }

  ngOnInit(): void {
  }

}
