
'use strict'
import { human } from "./human";

  export class activity  {
    id: number=0;
    ownerId: number=0;
    basePrice: number=0;
    price:number=0;
    Status:string='Pending'
    modifierUserId:number=0;
    UserId:number=0;
    ActId:number=0;
    name: string='';
    description: string='';
    owner: human= new human();
    closed: boolean=false;
    requiered: boolean=false;
    ModifDate:any;//approved or rejected date
   approved: boolean=false;
    test: boolean=(this.Status==''?true:false);
    note: string='The is in this '+this.Status;
    constructor(id:number){

    }

    // public get approved() : boolean {
    //   return this.Status==''?true:false;
    // }

    // public set approved(b : boolean) {
    //   this.approved = b;
    // }


  //  public Modified(modifierId:number,comment:string,info:number){
    public getModified(){
    // this.note=comment;
    // this.ModifDate=new Date();
    // this.modifierUserId=modifierId;
    // this.Status=info==0?'Approved':'Rejected';
    return {'note':this.note,'modifDate':this.ModifDate,'modifierUserId':this.modifierUserId,'Status':this.Status};
  }

    static getActivity(obj:any):activity{
      let act=<activity>obj;
      act.price=obj.human_participate_activity.price;
      act.Status=obj.human_participate_activity.Status;
      act.description=obj.human_participate_activity.description;
      act.note=(obj.human_participate_activity.note|| act.description)|| act.note;
      act.ModifDate=obj.human_participate_activity.ApprovedDate|| obj.human_participate_activity.rejectectedDate;
      act.UserId=obj.human_participate_activity.humanId;
      act.ActId=obj.human_participate_activity.activityId;
      act.approved=(act.Status=='Approved');
      console.log('act');
      console.log(act.approved);

      console.log(act);

      return act;

    }
  }

