import { Observable } from 'rxjs';
'use strict'

import { role } from "./role";

  export class human  {
    id: number=0;
    fees: number=0;
    username:string=`ADH${new Date().getMilliseconds()}@koweit.net`;
    firstName: string='';
    lastName: string='';
    fullName: string='';
    phone: string='';
    city: string='';
    gender: string='';
    active: boolean=false;
    isAdmin: boolean=false;
    withRoles: boolean=false;
    roles:role[]=[];
    static hasRoles(obj:any):boolean{
      console.log('hsarole');

      return obj.roles && obj.roles.length>0;
    }
    static isAdmin(obj:any):boolean{
      console.log('hsarole');
      let adminrole= obj.roles.find(function (role:any) {
        if (role.name.includes('Admin')) {
          return role
        }
      }

      )
      return adminrole?true:false;
    }
    setPK(){
      return `AD- ${new Date().getMilliseconds()}`;
    }
    getNewFormData(){
      let rolechecked:number[]=[]
      this.roles.forEach(role => {
        if(role.checked) rolechecked.push(role.id)
      });
      let {id,roles,fullName,...user}=this;
      let formData={
        user,role:rolechecked
      }
      console.log(JSON.stringify(formData));
      return formData;

    }
  }

