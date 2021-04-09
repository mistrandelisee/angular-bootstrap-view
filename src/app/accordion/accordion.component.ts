import { Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import { NgbAccordionConfig,NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css'],
  providers: [NgbAccordionConfig]
})
export class AccordionComponent implements OnInit {

constructor(public config: NgbAccordionConfig, public elementRef: ElementRef) {
  // customize default values of accordions used by this component tree
  this.config.closeOthers = true;
  this.config.type = 'info';
  this.show=false;
}
show:boolean;

  ngOnInit() {
  }

  beforeChange($event: NgbPanelChangeEvent) {
    console.log($event.panelId);
    if ($event.panelId === 'panelOne') {
      $event.preventDefault();
    }

    if ($event.panelId === 'panelTwo' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  // togglePanel(id:any){
  //   this.config.toggle(id);
  // }


}
