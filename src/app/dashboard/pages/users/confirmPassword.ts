import { AbstractControl } from "@angular/forms";

export function ConfirmPasswordValidator(control:AbstractControl )
{
    const Password=control.get('Password');
    const confirmPassword=control.get('confirmPassword');

    
    if(Password?.pristine || confirmPassword?.pristine)                    //
    { 
        return null;
    }

    else
    {
        return Password && confirmPassword && confirmPassword.value !== Password.value ?
        {'misMatch' : true}                       //if condition true return mis match
        :null                                    //if condition false return null

    }                               
}