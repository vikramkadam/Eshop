import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signIn !: FormGroup;  
  @Output() actionEmit : EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

    this.initializeForm();
  }

  initializeForm()
  {
    this.signIn = new FormGroup({
      'userName': new FormControl ('', [Validators.required]),
      'password': new FormControl('', [Validators.required])
    })
  }


  redirectToSignIn()
  {
    this.actionEmit.emit("sign-Up");
  }

}
