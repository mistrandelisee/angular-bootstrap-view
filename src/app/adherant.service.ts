import { Injectable } from '@angular/core';
import { human } from '../models/human';
import { responseauth } from '../models/responseauth';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { config } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class AdherantService {
  httpOptions = {
    headers: new HttpHeaders()
              .set('Authorization', 'my-auth-token')
              .set('Content-Type', 'application/json')
  };
  private apiUrl = new config().getURL();
  constructor(private http: HttpClient) { }
  newAdherant(AdherantData : any) {//ok
    return this.http.post<human>( this.apiUrl+'/adherant/new', JSON.stringify(AdherantData), this.httpOptions).pipe(
      tap(_ =>console.log('add a member processing...')),
      //catchError(this.handleError<any>('add Member Err', []))
    );
  }
  getAllAdherants():Observable<human> {
    return this.http.get<human>( this.apiUrl+'/adherant/').pipe(
      tap(_ =>console.log('fetched humans')),
      retry(3)
      // , // retry a failed request up to 3 times
      // catchError(this.handleError<any>('getpersonnes', []))
      );
  }
  getAdherant(id:number):Observable<any> {
    return this.http.get<any>( this.apiUrl+'/adherant/'+id).pipe(
      tap(_ =>console.log('fetched human with id '+id)),
      retry(3)
      // , // retry a failed request up to 3 times
      // catchError(this.handleError<any>('getpersonnes', []))
      );
  }
  ComfirmParticipation(id:number,aid:number,data:any):Observable<any> {
    return this.http.post<any>( this.apiUrl+'/adherant/'+id+'/participate-update/'+aid, JSON.stringify(data), this.httpOptions).pipe(
      tap(_ =>console.log('update participate id '+id))
      // retry(3)
      // , // retry a failed request up to 3 times
      // catchError(this.handleError<any>('getpersonnes', []))
      );
  }
  updatePerson(userNewData : any) {//ok
    return this.http.post<human>( this.apiUrl+'/adherant/update', JSON.stringify(userNewData), this.httpOptions).pipe(
      tap(_ =>console.log('update a member processing...')),
      //catchError(this.handleError<any>('update menber Err', []))
      );
  }
  authentification(userloginData : any) {//ok
    return this.http.post<any>( this.apiUrl+'/authentification', JSON.stringify(userloginData), this.httpOptions).pipe(
      tap(_ =>console.log('authentification a member processing...')),
      //catchError(this.handleError<any>('update menber Err', []))
      );
  }







  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      let pers:Observable<T>=new Observable();
      // Let the app keep running by returning an empty result.
      return pers;
    };
  }
}
