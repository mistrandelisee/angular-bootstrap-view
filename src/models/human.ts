import { Observable } from 'rxjs';
import { company } from './company';
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
      // console.log('hsarole');

      return obj.roles && obj.roles.length>0;
    }
    static isAdmin(obj:any):boolean{
      // console.log('hsarole');
      let adminrole= obj.roles.find(function (role:any) {
        if (role.name.toLowerCase().includes('admin')) {
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
    getNewRegistrationData(customfile:any,account:company){
      let {id,roles,fullName,active,isAdmin,withRoles,...user}=this;
      let formData={
        request:{
          fees:user.fees,
          username:user.username,
          firstName:user.firstName,
          lastName:user.lastName,
          phone:user.phone,
          city:user.city,
          gender:user.gender,
          roles:'Administrator',
          file:customfile,
          ...account.getRegistrationData()
        }

      }
      /*
      companyName:'FROM Angular Web Test',
          companyMoto:'Angular-Web',
          companyDescription:'FROM Angular Web test'
      */
      // formData.request['file']=customfile;
      console.log(JSON.stringify(formData));
      return {user:formData};

    }
  }

