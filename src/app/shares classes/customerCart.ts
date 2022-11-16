import { Cart } from "./cart";

export default class CustomerCart{
    customerId:number;
    cartItems:Cart[];

    constructor(customerId:number,cartItems:Cart[]){
        this.cartItems=cartItems;
        this.customerId=customerId;

    }
}