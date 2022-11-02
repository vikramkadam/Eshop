import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { LoginSvcService } from 'src/app/services/login-svc.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signIn !: FormGroup;  
  @Output() actionEmit : EventEmitter<string> = new EventEmitter();

  constructor(private http : HttpService , private loginService : LoginSvcService) { }

  ngOnInit( ): void {

    this.initializeForm();
  }

  initializeForm()
  {
    this.signIn = new FormGroup({
      'userName': new FormControl ('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    })
  }


  redirectToSignIn(action:string)
  {
    this.actionEmit.emit(action);
  }

  signInPage()
  {
      const params = new HttpParams()
      .set('userName',this.signIn.value.userName)
      .set('password', this.signIn.value.password)

      this.http.getData('users',params).subscribe((res) => {
         if(Array.isArray(res) && res.length >0 )
         {
          let response = res[0];
          response['Token'] = "hkdid7sd5fsddd";
            alert('login successfull.')
            this.loginService.setUserResponse(response);

            this.redirectToSignIn('login-success');
         }
         else
         {
          alert('Invalid Crediantials.')
         }
      })
  }

}
