import { tap, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { activity } from 'src/models/activity';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  httpOptions = {
    headers: new HttpHeaders()
              .set('Authorization', 'my-auth-token')
              .set('Content-Type', 'application/json')
  };
  private apiUrl = new config().getURL();
  constructor(private http: HttpClient) { }
  newActivity(activityData : any) {//ok
    return this.http.post<activity>( this.apiUrl+'/activity/new', JSON.stringify(activityData), this.httpOptions).pipe(
      tap(_ =>console.log('add a task processing...')),
      //catchError(this.handleError<any>('add Member Err', []))
    );
  }
  getAllActivities():Observable<activity> {
    return this.http.get<activity>( this.apiUrl+'/activity/').pipe(
      tap(_ =>console.log('fetched Activities')),
      retry(3)// retry a failed request up to 3 times
      // catchError(this.handleError<any>('getpersonnes', []))
      );
  }
  getActivity(id:number):Observable<any> {
    return this.http.get<any>( this.apiUrl+'/activity/'+id).pipe(
      tap(_ =>console.log('fetched activity with id '+id)),
      retry(3)// retry a failed request up to 3 times
      // catchError(this.handleError<any>('getpersonnes', []))
      );
  }

}
