import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { human } from 'src/models/human';
import { AdherantService } from '../adherant.service';
import { ImageServiceService } from '../image-service.service';
import { config } from 'src/models/config';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  private apiUrl = new config().getURL();
  @Input() user:human=new human();
  @Output() onSelectUser=new EventEmitter<number>();
  isloading:boolean=false;
  getError:boolean=false;
  toastshow:boolean=false;
  toastvariant='warning';
  toastmessage='';
  toastdelay=5000;
  imageUrl:string='';
  imageToShow:any;
  constructor(private adherantservice:AdherantService,private imageservice:ImageServiceService,private http: HttpClient) { }

  ngOnInit(): void {
    this.user.withRoles=human.hasRoles(this.user);
    this.user.isAdmin=human.isAdmin(this.user);
    this.imageUrl='https://brave-bear-ciavsw-dev-ed.my.salesforce.com/sfc/p/4L000000iKbv/a/4L000000XnKf/sdpYeaZN0JkKfjTpLRPc.Ia5enevwkeK6xfThAFq8tQ';
    // this.onURLinserted();
    let self=this;
    this.asyncgetImage('https://cors-anywhere.herokuapp.com/'+this.imageUrl, 'image').
    then(function(file) {

      // with file reader you will transform the file in a data url file;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {

      // just putting the data url to img element
          if(document.getElementById('image') !=null){
            self.imageToShow = reader.result;
            // document.getElementsByTagName('img').src = reader.result ;
          }
      }
    })
    .catch(error=>{
      console.log(error);

    })
  }
  selectUser(id:number){
    this.onSelectUser.emit(id)
  }
  modify(username:String,active:boolean) {
    this.toastshow=false;
    let userbody={
      user:{
        username,
        active
      }
    }
    console.log(userbody);
    this.isloading=true;
    this.adherantservice.updatePerson(userbody).subscribe(
      data=>{console.log(data);
        this.isloading =false
        this.toastshow=true;
        this.toastvariant='success';
        this.toastmessage='updated has been done successfully';
      },
      error=>{console.error(error);
      }
    )
  }
  onURLinserted() {
      this.imageservice.getImage().subscribe(data => {
        this.createImageFromBlob(data);
      }, error => {
        console.log("Error occured",error);
      });
}

getImage(imageUrl: string): Observable<Blob> {
  return this.http
        .get(imageUrl, { responseType:'blob'});
        // .map((res: Response) => res.blob());
}

createImageFromBlob(image: Blob) {
   let reader = new FileReader(); //you need file reader for read blob data to base64 image data.
   reader.addEventListener("load", () => {
      this.imageToShow = reader.result; // here is the result you got from reader
   }, false);

   if (image) {
      reader.readAsDataURL(image);
   }
}

async asyncgetImage(url:string, fileName:string) {
  // on the first then you will return blob from response
  let headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  headers.append('Access-Control-Allow-Origin', '*');
  // headers.append('Access-Control-Allow-Credentials', 'true');

  headers.append('GET', 'POST');

  // headers.append('Authorization', 'Basic ' + base64.encode(username + ":" + password));

 return await fetch(url).then(r => r.blob())
 .then((blob) => { // on the second, you just create a file from that blob, getting the type and name that intend to inform

     return new File([blob], fileName+'.'+   blob.type.split('/')[1]) ;
 });
}
}
