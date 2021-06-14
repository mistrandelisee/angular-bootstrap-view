import { LabelsServiceService } from './../labels-service.service';
import { human } from 'src/models/human';
import { RegistrationServiceService } from './../registration-service.service';
import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';
import { role } from 'src/models/role';
import { config } from 'src/models/config';
import { company } from 'src/models/company';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private apiUrl = new config().getURL();
  backDelay:number=3000;
  account:company;
  person:human;
  toastshow:boolean=false;
  isloading:boolean=false;
  fileSelected:boolean=false;
  submitted:boolean=false;
  toastvariant='warning';
  toastmessage='';
  filename='';
  acceptedFormats:string[];
  fileList:any[];
  toastdelay=5000;
  @Output() back =new EventEmitter<any>();
  @Input() roles:role[];
  constructor(private adhservice :RegistrationServiceService,public label:LabelsServiceService) {
    this.roles=[];
    this.fileList=[];
    this.acceptedFormats=[];
    this.acceptedFormats.push('.png');
    this.acceptedFormats.push('.jpg');
    this.person=new human();
    this.person.username='';
    this.account=new company();
    console.log('roles comstruct');
    console.log(this.roles);
    }

  ngOnInit(): void {
    console.log('roles on init');
    // console.log(this.roles);
    this.roles=this.roles.map(element => {
      return new role(element);
    });
    console.log(this.roles);
  }
  onSubmit():boolean{
    this.isloading=true;
    console.log(this.roles);
    this.person.roles=this.roles;
    // this.toastmessage=JSON.stringify(this.person);
    this.toastmessage='Save successfully';

    let data=this.person.getNewRegistrationData(this.fileList.pop(),this.account);
    /*to uncomment
    this.adhservice.newAdherant(data).subscribe(
      data=>{
        console.log(data);
        this.isloading=false;
        this.toastvariant='success';
        this.toastshow=true;
      },
      error=>{
        console.error(error);

      }
    )
    */
      console.log(data);

    return true;
  }
  saveNew(){
    this.onSubmit()
    setTimeout(() => {
      this.isloading=false;
      this.toastmessage='';
      this.toastvariant='';
      this.toastshow=false;
      this.submitted=true;
      setTimeout(() => {
        this.backToLogin();
      }, this.backDelay);
    }, this.toastdelay);
    this.person=new human();
    // this.person.firstName='';
    // this.person.lastName='';

  }
  backToLogin(){
    this.back.emit(true)
  }
  handleFilesChange(event:any) {
    if (event.target.files.length > 0) {
        this.uploadHelper(event.target.files[0]);
    }
  }

    uploadHelper(file:any) {
        // create a FileReader object
        const fileReader = new FileReader();
        // set onload function of FileReader object
        fileReader.onloadend = (() => {
        var fileContents= fileReader.result;
        let base64 = 'base64,';
        let content = (fileContents) ?fileContents.toString().indexOf(base64) + base64.length :0;
        fileContents = (fileContents) ?fileContents.toString().substring(content) :'';

        var fileToUpload:any = {
            fullname : file.name,
            name : file.name,
            parent:'',
            Base64Data : fileContents
        }
        this.filename=file.name;
        this.fileSelected=true;
        this.fileList.push(fileToUpload);

        /*console.log('file name : ' + this.fileList[0].fileName);
        console.log('base64Data : ' + this.fileList[0].base64Data);*/

    });

    fileReader.readAsDataURL(file);
}
// loadFiles(fileList:FileList):void{

//    const reader= new FileReader();
//    reader.addEventListener('load',(event)=>{
//      const result=event.target.result;

//    });
//   // reader.readAsText(fileList[0],'UTF-8');
//   reader.readAsText(fileList[0],'UTF-8');


//  }

}
