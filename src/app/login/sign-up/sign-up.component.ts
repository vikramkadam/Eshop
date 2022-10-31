import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { passwordMismatch } from 'src/app/shared/validators/customValidators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm !:FormGroup;
  @Output() actionEmit : EventEmitter<any> = new EventEmitter(); 

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm()
  {
    this.signUpForm = this.fb.group({

      'userName': ['',[Validators.required]],
      'mobileNo': ['',[Validators.required, Validators.minLength(10) , Validators.maxLength(10), Validators.pattern("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")]],
      'password': ['',[Validators.required]],
      'confirmPassword': ['',Validators.required]
      },{validators:passwordMismatch})
  }


  redirectToSignIn()
  {
     this.actionEmit.emit('sign-In');
  }

}
