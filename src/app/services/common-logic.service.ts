import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonLogicService {

  searchSubject : BehaviorSubject<any> = new BehaviorSubject('df');

  constructor() { }


}
