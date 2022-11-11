export class UserRole
{
    public userName:string;
    public lastName:string;
    public userEmail:string;
    public phone:any;
    public Password:string;
    public confirmPassword:string;
    public role:string[];
    public image:string
    public id:any;

    constructor(userName:string,lastName:string,userEmail:string,phone:any,Password:string,confirmPassword:string,role:string[],image:string,id:any)
    {
        this.userName=userName;
        this.lastName=lastName;
        this.userEmail=userEmail;
        this.phone=phone;
        this.Password=Password;
        this.confirmPassword=confirmPassword;
        this.role=role;
        this.image=image;
        this.id=id;

  
      }

}