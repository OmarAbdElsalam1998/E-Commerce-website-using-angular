export class userDataRegister
{
    constructor
    (
        public userName:string,
        public userEmail:string,
        public Password:string,
        public confirmPassword:string,
        public role:string,

    )
    {
        role="user";
    }

}