import { Injectable } from '@angular/core';
import { human } from '../models/human';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { config } from '../models/config';
@Injectable({
  providedIn: 'root'
})
export class RegistrationServiceService {
  httpOptions = {
    headers: new HttpHeaders()
              .set('Authorization', 'my-auth-token')
              .set('Content-Type', 'application/json')
  };
  private apiUrl = new config().getURL();
  constructor(private http: HttpClient) { }
  newAdherant(AdherantData : any) {//ok
    return this.http.post<any>( this.apiUrl+'/sfexternal/new/account', JSON.stringify(AdherantData), this.httpOptions).pipe(
      tap(_ =>console.log('add a registration...',AdherantData)),
      //catchError(this.handleError<any>('add Member Err', []))
    );
  }
}
