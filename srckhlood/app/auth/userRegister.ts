export class userDataRegister
{
    constructor
    (
        public username:string,
        public email:string,
        public password:string,
        public confirnpassword:string,
        public role:string,

    )
    {
        role="user";
    }

}