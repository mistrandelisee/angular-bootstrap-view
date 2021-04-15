import { element } from 'protractor';
'use strict'
  export class role  {
    id: number=0;
    name: string=`Role${new Date().getMilliseconds()}`;
    description: string='';
    checked: boolean=false;
    constructor(element:role){
      this.id=element.id;
      this.name=element.name;
      this.description=element.description;
      if (element.name==='Admin') {
        this.checked=true;
      }
    }
  }

