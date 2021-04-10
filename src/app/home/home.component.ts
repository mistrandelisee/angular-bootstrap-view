import { Component, OnInit } from '@angular/core';
import {  NgbDropdown, NgbModal, ModalDismissReasons,NgbActiveModal,NgbNavChangeEvent} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbDropdown,NgbActiveModal]
})

export class HomeComponent implements OnInit {
  public isMenuCollapsed = true;
  closeResult = '';
  active:number=3;//activated nav
  disabled = true;
  constructor(private modalService: NgbModal,public modal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  dologout(){
    alert('bye');
    this.modalService.dismissAll('close');

    this.modal.close('Ok click')
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


  onNavChange(changeEvent: NgbNavChangeEvent) {
    // if (changeEvent.nextId === 3) {//to disable
    //   changeEvent.preventDefault();
    // }
  }



}
