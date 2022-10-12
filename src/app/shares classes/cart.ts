export class Cart {
    productId:number
    title:string;
    price:number;
    discount:number;
    thumbnail:string;
    count?:number;

// var productt={
    //   "title":this.pro.title,
    //   "price":this.pro.price,
    //   "discount":this.pro.discountPercentage,
    //   "thumbnail":this .pro.thumbnail,
    //   "count": 1
    
    //   }
    constructor(productId:number,title:string,price:number,discount:number,thumbinal:string,count:number=1){
      this.productId=productId;
      this.title=title;
      this.price=price;
      this.thumbnail=thumbinal;
      this.discount=discount;
      this.count=count;

    }
}