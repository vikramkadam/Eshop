import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginSvcService {

  constructor() { }



  setUserResponse(data:any)
  {
    if(data)
    {
     let userResponse = JSON.stringify(data);    
      userResponse = window.btoa(userResponse);   
     
     localStorage.setItem('userResponse' ,  userResponse);
    }
  }

  getUserResponse(){
    let data = localStorage.getItem('userResponse');
    if(data)
    {
       data = window.atob(data);
       data = JSON.parse(data);
       return data;
    }
    return null;
  }

  clearUserResponse()
  {
     localStorage.clear();
  }


}
