export class comments{
    userId:number;
    productId:number;
    rate:number;
    comment:string;
    customerName:string;
    createdAt:Date;

    constructor(userId:number,productId:number,rate:number,comment:string,customerName:string,createdAt:Date){
        this.userId=userId;
        this.productId=productId;
        this.rate=rate;
        this.comment=comment;
        this.customerName=customerName;
        this.createdAt=createdAt;

    }

}