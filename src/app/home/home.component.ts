import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {  NgbDropdown, NgbModal, ModalDismissReasons,NgbActiveModal,NgbNavChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import { human } from 'src/models/human';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbDropdown,NgbActiveModal]
})

export class HomeComponent implements OnInit {
  public isMenuCollapsed = true;
  closeResult = '';
  active:number=1;//activated nav
  disabled = true;
  person:human;
  constructor(private modalService: NgbModal,public modal: NgbActiveModal) {
    this.person=new human();
    this.user=new human();
    console.log(this.user);

   }
  @Output() logout =new EventEmitter<any>();
  @Input() user:human;
  @Input() errorserver:any;
  ngOnInit(): void {
    console.log('on Init');
    console.log(this.user);
    this.person=<human>this.user;
    console.log(human.hasRoles(this.user));
    this.user.withRoles=human.hasRoles(this.user);
    this.user.isAdmin=human.isAdmin(this.user);
    console.log(this.user);


  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  dologout(){
    // alert('bye');
    this.logout.emit(this.user);
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
