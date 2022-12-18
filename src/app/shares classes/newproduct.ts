export class newProduct
{

        
        brand:string;
        category:string;
        subCategory:string;
        title:string;
        description:string;
        numofitems:number;
        price:number;
        discound:number;
        images:string[];
        overview:string;
        sizes:string[];
        colors:string[];
        rating:number;

        constructor(brand:string,category:string,subCategory:string,title:string,description:string,numofitems:number,price:number,discound:number,images:any,overview:string,sizes:[],colors:[],rating:number){
            this.brand=brand;
            this.category=category;
            this.subCategory=subCategory;
            this.title=title;
            this.description=description;
            this.numofitems=numofitems;
            this.price=price;
            this.discound=discound;
            this.images=images;
            this.overview=overview;
            this.sizes=sizes;
            this.colors=colors;
            this.rating=rating;
        
            }
}