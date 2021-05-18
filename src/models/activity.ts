
'use strict'

import { human } from "./human";

  export class activity  {
    id: number=0;
    ownerId: number=0;
    basePrice: number=0;
    price:number=0;
    Status:string='Pending'
    approverUserId:number=0;
    name: string='';
    owner: human= new human();
    description: string='';
    gender: string='';
    closed: boolean=false;
    requiered: boolean=false;
    approved: boolean=this.Status=='Approved';
    constructor(id:number){

    }
    static getActivity(obj:any):activity{
      let act=<activity>obj;
      act.price=obj.human_participate_activity.price;
      act.Status=obj.human_participate_activity.Status;
      console.log('act');

      console.log(act);

      return act;

    }
  }

