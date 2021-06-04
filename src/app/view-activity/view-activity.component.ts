import { Component, Input, OnInit } from '@angular/core';
import { activity } from './../../models/activity';

import {  NgbDropdown, NgbModal, ModalDismissReasons,NgbActiveModal,NgbNavChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { AdherantService } from '../adherant.service';
import { VariablesGlobales } from '../VariablesGlobales';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.css'],
  providers: [NgbDropdown,NgbActiveModal]
})
export class ViewActivityComponent implements OnInit {
  @Input() Activity:activity;
  closeResult = '';
  description='';

  info:number=-1;
  price:number=0;
  toastshow:boolean=false;
  isloading:boolean=false;
  toastvariant='warning';
  @Input() mode:string='ADMIN';
  toastmessage='';
  constructor(private variablesGlobales:VariablesGlobales,private modalService: NgbModal,public modal: NgbActiveModal,private adherantservice:AdherantService) {
    this.Activity=new activity(0);
    // this.price=0;
  }

  ngOnInit(): void {
    console.log('activity');

    this.price=this.Activity.basePrice;
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  /**
   * modif
   */
  activationReject(modifierId:number){
    let data= this.Modified(modifierId,this.description,this.info);
    // let act:activity=this.Activity ;
    // let data= act.getModified();
    //make call to server
    this.isloading=true;

    this.adherantservice.ComfirmParticipation(this.Activity.UserId,this.Activity.ActId,{participate:data}).subscribe(
      data=>{console.log(data);
        this.isloading =false
        this.toastshow=true;
        this.toastvariant='success';
        this.toastmessage='updated has been done successfully';

        console.log(data);
      },
      error=>{console.error(error);
        this.isloading =false
        this.toastshow=true;
        this.toastvariant='error';
        this.toastmessage='Error ';
      }
    )
  }
  doParticipate(modifierId:number){
    let data= this.Participate(this.description,this.price);
    // let act:activity=this.Activity ;
    // let data= act.getModified();
    //make call to server
    this.isloading=true;

    this.adherantservice.SendParticipation(modifierId,this.Activity.id,{participate:data}).subscribe(
      data=>{console.log(data);
        this.isloading =false
        console.log(data);
        if(data.state && data.state=='OK'){

          this.toastshow=true;
          this.toastvariant='success';
          this.toastmessage='Your Participation has been send succesfully';
        }else{

          this.toastshow=true;
          this.toastvariant='error';
          this.toastmessage='Error ';
        }


      },
      error=>{console.error(error);
        this.isloading =false
        this.toastshow=true;
        this.toastvariant='error';
        this.toastmessage='Error ';
      }
    )
  }
   modif() {
    this.toastshow=false;
    let modifierId=this.variablesGlobales.connectedUser.id;
    if (this.info!=3) {
      this.activationReject(modifierId);
    } else {
      this.doParticipate(modifierId);
    }

    this.modalService.dismissAll('cancel click');
    console.log(this.Activity);
    this.isloading=false;
    this.toastmessage='operation done ';
    this.toastvariant='success';
    this.toastshow=true;


  }
  open(content:any,info:number) {
    this.info=info;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  Modified(modifierId:number,comment:string,info:number){
    // public getModified(){
      this.Activity.note=comment;
      this.Activity.ModifDate=new Date();
      this.Activity.modifierUserId=modifierId;
      this.Activity.Status=info==0?'Approved':'Rejected';
      this.Activity.approved=(this.Activity.Status=='Approved');
      return {'note':this.Activity.note,'modifDate':this.Activity.ModifDate,'modifierUserId':this.Activity.modifierUserId,'Status':this.Activity.Status};
  }
  Participate(comment:string,price:number){
    // public getModified(){
      // this.Activity.description=comment;
      // this.Activity.Status='Pending';
      // this.Activity.price=price;
      this.Activity.approved=(this.Activity.Status=='Approved');
      return {'userNote':comment,'Status':'Pending','price':price};
  }

}
