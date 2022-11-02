import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CommonLogicService } from 'src/app/services/common-logic.service';
import { LoginSvcService } from 'src/app/services/login-svc.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  IsActive:string = "sign-In";  
  IsUserLoggedIn:boolean = false;
  @ViewChild('btnClose')btnClose !: ElementRef;
  userDetails:any;

  constructor(private commonService : CommonLogicService , private loginService: LoginSvcService) { }

  ngOnInit(): void {
   
    this.validateUser();
   
  }

  searhByEnteredText(searchValue: any)
  {
    this.commonService.searchSubject.next(searchValue);
  }

  emittedAction(action:any)
  {
    if(action == "login-success")
    {      
      this.loginSuccess();
    }else{
      this.IsActive = action;
    }    
  }

  loginSuccess()
  {
    this.IsUserLoggedIn = true;
    const resp = this.loginService.getUserResponse();
    if(resp != null)
    {
      this.userDetails = resp;
    }    
    this.btnClose.nativeElement.click();
  }

  validateUser()
  {
    const resp = this.loginService.getUserResponse();
    if(resp != null)
    {
      this.userDetails = resp;
      this.IsUserLoggedIn = true;
    }    
  }


  SignOutUser()
  {
    this.loginService.clearUserResponse();
    this.IsUserLoggedIn = false;
  }
  
}
