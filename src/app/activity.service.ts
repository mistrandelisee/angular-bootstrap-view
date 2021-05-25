import { Injectable } from '@angular/core';
import { config } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private apiUrl = new config().getURL();
constructor() { }

}
