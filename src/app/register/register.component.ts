import { human } from 'src/models/human';
import { RegistrationServiceService } from './../registration-service.service';
import { Component, OnInit, Output,Input, EventEmitter } from '@angular/core';
import { role } from 'src/models/role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  person:human;
  toastshow:boolean=false;
  isloading:boolean=false;
  toastvariant='warning';
  toastmessage='';
  acceptedFormats:string[];
  fileList:any[];
  toastdelay=5000;
  @Output() closeNewPerson=new EventEmitter<any>();
  @Input() roles:role[];
  constructor(private adhservice :RegistrationServiceService) {
    this.roles=[];
    this.fileList=[];
    this.acceptedFormats=[];
    this.acceptedFormats.push('.png');
    this.acceptedFormats.push('.jpg');
    this.person=new human();
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

    let data=this.person.getNewRegistrationData(this.fileList.pop());
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

    return true;
  }
  saveNew(){
    this.onSubmit()
    setTimeout(() => {
      this.toastmessage='';
      this.toastvariant='';
      this.toastshow=false;
    }, this.toastdelay);
    this.person=new human();
    this.person.firstName=" ";
    this.person.lastName=" ";
  }
  async saveClose(){
    let b= await this.onSubmit();



        if(b){this.closeNewPerson.emit(true)}

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
