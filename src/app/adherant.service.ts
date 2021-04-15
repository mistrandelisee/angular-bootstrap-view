import { Injectable } from '@angular/core';
import { human } from '../models/human';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdherantService {
  httpOptions = {
    headers: new HttpHeaders()
              .set('Authorization', 'my-auth-token')
              .set('Content-Type', 'application/json')
  };
  private apiUrl = `http://127.0.0.1:3000`;//https://learn-node-postgres.herokuapp.com/
  // private apiUrl = `https://learn-node-postgres.herokuapp.com`;//https://learn-node-postgres.herokuapp.com/

  constructor(private http: HttpClient) { }
  newAdherant(AdherantData : any) {//ok
    return this.http.post<human>( this.apiUrl+'/adherant/new', JSON.stringify(AdherantData), this.httpOptions).pipe(
      tap(_ =>console.log('add a member processing...')),
      //catchError(this.handleError<any>('add Member Err', []))
    );
  }
  getAllAdherants():Observable<human> {
    return this.http.get<human>( this.apiUrl+'/persone/').pipe(
      tap(_ =>console.log('fetched humans')),
      retry(3)
      // , // retry a failed request up to 3 times
      // catchError(this.handleError<any>('getpersonnes', []))
      );
  }
  updatePerson(userNewData : any) {//ok
    return this.http.post<human>( this.apiUrl+'/persone/update', JSON.stringify(userNewData), this.httpOptions).pipe(
      tap(_ =>console.log('update a member processing...')),
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
