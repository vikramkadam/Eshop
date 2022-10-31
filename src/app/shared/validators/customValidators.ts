import { AbstractControl, ValidationErrors } from "@angular/forms";

export function passwordMismatch(control:AbstractControl):ValidationErrors | null {
    const pass = control.get('password')?.value;
    const cpass = control.get('confirmPassword')?.value;

    if(pass != cpass)
    {   
       return { 'passwordMismatch' : true };
    }
    return null;
}

