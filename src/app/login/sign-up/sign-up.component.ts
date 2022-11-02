import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  PatternValidator,
  Validators,
} from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { passwordMismatch } from 'src/app/shared/validators/customValidators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;
  @Output() actionEmit: EventEmitter<any> = new EventEmitter();
  userRegisteredStatus: boolean = false;

  constructor(private fb: FormBuilder, private http: HttpService) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.signUpForm = this.fb.group(
      {
        userName: ['', [Validators.required]],
        mobileNo: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern(
              '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
            ),
          ],
        ],
        password: ['', [Validators.required]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMismatch }
    );
  }

  redirectToSignIn() {
    this.actionEmit.emit('sign-In');
  }

  signUp() {
    // this.CheckUserAlreadyExist();

    const params = new HttpParams()
       .set('userName', this.signUpForm.value.userName)
      // .set('mobileNo', this.signUpForm.value.mobileNo);

    this.http.getData('users', params).subscribe((response) => {
        if (Array.isArray(response) && response.length > 0)
        {
           alert('We hav already registered user with same credentials , chosse another user Name .' );
        } 
        else
        {
          const data = this.signUpForm.value;
          this.http.postData('users', data).subscribe((res) => {
          if (res) 
          {
            alert('registration successfully done.');
            this.redirectToSignIn();
          }
          },(error) => {
             alert('Error while  checking is user available  on  sign-up' + error);
           });  
        }   
     });
  }

  // CheckUserAlreadyExist()
  // {

  //     const params = new HttpParams()
  //    .set('userName' , this.signUpForm.value.userName)
  //    .set('mobileNo' , this.signUpForm.value.mobileNo)

  //    this.http.getData("users",params).subscribe((response) => {

  //     if( Array.isArray(response) && response.length > 0 )
  //     {
  //       alert('res available');
  //       this.userRegisteredStatus = true;
  //     }
  //     else {
  //        this.userRegisteredStatus = false;
  //     }
  //    },
  //    (error) => {alert("Error while getting sign-up"+ error)} )
  // }
}
