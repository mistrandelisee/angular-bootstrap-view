import { Observable } from 'rxjs';
'use strict'

import { role } from "./role";

export class company  {
  id: number=0;
  name: string='';
  motto: string='';

  getNewFormData(){
    let {id,...formData}=this;
    return formData;
  }
  getRegistrationData(){
  let formData={
        companyName:this.name,
        companyMoto:this.motto,
        companyDescription:'Created from Client web'
    }

    // formData.request['file']=customfile;
    console.log(JSON.stringify(formData));
    return formData;

  }
}
