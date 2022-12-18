import { Address } from "./address";
import { GeneralInfo } from "./generalInfo";

export class UserRole
{
    public userName:string;
    public lastName:string;
    public userEmail:string;
    public phone:any;
    public Password:string;
    public role:string;
    public addresses:any[];
    public generalInfo:any;
    public image:string; 
    public responsability:string[]; 


    constructor(userName:string,lastName:string,userEmail:string,phone:any,Password:string,role:string,addresses:any[],generalInfo:any,image:string,responsability:string[])
    {
        this.userName=userName;
        this.lastName=lastName;
        this.userEmail=userEmail;
        this.phone=phone;
        this.Password=Password;
        this.role=role;
        this.addresses=addresses;
        this.generalInfo=generalInfo;
        this.image=image;
        this.responsability=responsability;

  
      }


}