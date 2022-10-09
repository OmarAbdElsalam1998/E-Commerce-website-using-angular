import { AbstractControl } from "@angular/forms";

export function ConfirmPasswordValidator(control:AbstractControl )
{
    const password=control.get('password');
    const confirmpassword=control.get('confirmpassword');

    
    if(password?.pristine || confirmpassword?.pristine)                    //
    { 
        return null;
    }

    else
    {
        return password && confirmpassword && confirmpassword.value !== password.value ?
        {'misMatch' : true}                       //if condition true return mis match
        :null                                    //if condition false return null

    }                               
}