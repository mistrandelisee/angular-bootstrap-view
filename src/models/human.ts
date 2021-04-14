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
    roles:role[]=[];
    hasRoles(){
      console.log(this);

      return this.roles && this.roles.length>0;
    }
    setPK(){
      return `AD- ${new Date().getMilliseconds()}`;
    }
  }

