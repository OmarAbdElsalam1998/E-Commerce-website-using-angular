import { Product } from "./product";

export class Cart {
    id :number;
    productName:string;
    productId:number;
    qty:number;
    price:number;



    constructor(id:number,qty=0,product:Product){
    this.id=id;
    this.qty=qty;
    this.productId=product.id;
    this.productName=product.name;
    this.price=product.price;
    this.qty=qty;

    }
}
