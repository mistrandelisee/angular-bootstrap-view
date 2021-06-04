import { Component } from '@angular/core';
import { human } from 'src/models/human';
import { AdherantService } from './adherant.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'learning-view';
  appcookiename = 'learning-view';
  submitted:boolean = false;
  errMsg:any;
  userData:any;
  user:human=new human();
  constructor(private AdherantService:AdherantService) {
    this.errMsg={}
    if (document.cookie.replace(/(?:(?:^|.*;\s*)learningApp-User\s*\=\s*([^;]*).*$)|^.*$/, "$1")) {

      let cookieValue=document.cookie.replace(/(?:(?:^|.*;\s*)learningApp-User\s*\=\s*([^;]*).*$)|^.*$/, "$1")
      console.log('The cookie value',cookieValue)
      // this.submitted = true;
      // this.userData={username:cookieValue}
      this.AdherantService.authentification({token:cookieValue}).subscribe(
        data=>{
          if (data.OK) {
            this.user=data.OK;
            console.log(this.user);
            console.log(human.hasRoles(this.user));

            this.submitted=true;
          }
          else{
            console.log(data);
            this.errMsg={warning:true,msg:data.KO};
          }
        },
        error=>{
          this.errMsg={warning:true,msg:error};
          // this.submitted=true;
        }
      )
    }
    else{

      console.log('The cookie "reader" hasn\'t "1" for value')
    }
  }
  onSubmitHandler(login:any) {
    if(login.username){
      console.log(login);
      this.userData=login
      this.AdherantService.authentification(login).subscribe(
        data=>{
          if (data.OK) {
            this.user=data.OK;

            this.submitted=true;
            if(login.alive)
            this.doOnce(data.token)
          }
          else{
            console.log(data);
            this.errMsg={warning:true,msg:data.KO};
          }


        },
        error=>{
          this.errMsg={warning:true,msg:error};
          // this.submitted=true;
        }
      )
    }
  }
  onlogoutHandler(data:any) {
    console.log('this user has logged out :');
    //call server
    //get result
    //if error send it on page
    //else set submitted to true

    let cookieValue=document.cookie.replace(/(?:(?:^|.*;\s*)learningApp-User\s*\=\s*([^;]*).*$)|^.*$/, "$1")

    document.cookie = `learningApp-User=; expires=Fri, 31 Dec 9999 23:59:59 GMT`;

    this.AdherantService.authentification({token:cookieValue,close:true}).subscribe(
      data=>{
        if (data.OK) {
          this.user=new human();
          this.errMsg={msg:'you logged out succesfully',warning:true};
          this.submitted=false;
        }
        else{
          console.log(data);
          this.errMsg={warning:true,msg:data.KO};
        }
      },
      error=>{
        this.errMsg={warning:true,msg:error};
        // this.submitted=true;
      }
    )

  }
   doOnce(user_token:string) {
    if (document.cookie.replace(/(?:(?:^|.*;\s*)learningApp-User\s*\=\s*([^;]*).*$)|^.*$/, "$1") !== user_token) {
      // alert("Do something here!");
      document.cookie = `learningApp-User=${user_token}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;

    }
  }


}
