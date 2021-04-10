'use strict'
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
    setPK(){
      return `AD- ${new Date().getMilliseconds()}`;
    }
  }

