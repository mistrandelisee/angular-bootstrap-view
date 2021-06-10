import { Component, OnInit,EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login:any;
  isRegister:boolean;
  constructor() {
    this.login={username:'' ,password : '',alive:false}
    this.isRegister=true;
  }
  @Input() errorServer:any;
  @Output() submit =new EventEmitter<any>();
  submitted = false;
  ngOnInit(): void {
  }
  onSubmit() {
    this.submitted = true;
    // alert(JSON.stringify(this.login))
    this.submit.emit(this.login);
  }

}
