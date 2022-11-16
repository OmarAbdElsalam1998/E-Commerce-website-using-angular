export class GeneralInfo
{
    public userName:string;
    public lastName:string;
    public userEmail:string;
    public phone:any;
    public DateOfBirth:string;


    constructor(userName:string,lastName:string,userEmail:string,phone:any,DateOfBirth:string)
    {
        this.userName=userName;
        this.lastName=lastName;
        this.userEmail=userEmail;
        this.phone=phone;
        this.DateOfBirth=DateOfBirth;
      }


}