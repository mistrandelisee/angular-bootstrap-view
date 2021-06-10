import { human } from 'src/models/human';
import { AdherantService } from './../adherant.service';
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
  toastdelay=5000;
  @Output() closeNewPerson=new EventEmitter<any>();
  @Input() roles:role[];
  constructor(private adhservice :AdherantService) {
    this.roles=[];
    this.acceptedFormats=[];
    this.acceptedFormats.push('.png');
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
    let data=this.person.getNewFormData();
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
        var fileContents = fileReader.result;
        let base64 = 'base64,';
        let content = fileContents.indexOf(base64) + base64.length;
        fileContents = fileContents.substring(content);

        var fileToUpload = {
            fileName : file.name,
            base64Data : fileContents
        }

        this.fileList.push(fileToUpload);

        /*console.log('file name : ' + this.fileList[0].fileName);
        console.log('base64Data : ' + this.fileList[0].base64Data);*/

    });

    fileReader.readAsDataURL(file);
}

}
