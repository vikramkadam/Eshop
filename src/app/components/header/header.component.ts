import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CommonLogicService } from 'src/app/services/common-logic.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  IsActive:string = "sign-In";  

  constructor(private commonService : CommonLogicService) { }

  ngOnInit(): void {
   
  }

  searhByEnteredText(searchValue: any)
  {
    this.commonService.searchSubject.next(searchValue);
  }

  emittedAction(action:any)
  {
    this.IsActive = action;
  }
  
}
