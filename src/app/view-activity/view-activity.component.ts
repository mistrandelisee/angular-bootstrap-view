import { Component, Input, OnInit } from '@angular/core';
import { activity } from './../../models/activity';

import {  NgbDropdown, NgbModal, ModalDismissReasons,NgbActiveModal,NgbNavChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { AdherantService } from '../adherant.service';

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
  toastshow:boolean=false;
  isloading:boolean=false;
  toastvariant='warning';
  toastmessage='';
  constructor(private modalService: NgbModal,public modal: NgbActiveModal,private adherantservice:AdherantService) {
    this.Activity=new activity(0);
  }

  ngOnInit(): void {
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
   modif() {
    this.toastshow=false;
     let data= this.Modified(20,this.description,this.info);
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
      },
      error=>{console.error(error);
      }
    )
    this.modalService.dismissAll('cancel click');
    console.log(data);
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

}
