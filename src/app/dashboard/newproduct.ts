export class newProduct
{

        
        brand:any;
        category:any;
        title:any;
        description:any;
        numofitems:any;
        price:any;
        discound:any;
        images:any;
        overview:any;
        sizes:[];
        colors:[];

        constructor(brand:any,category:any,title:any,description:any,numofitems:any,price:any,discound:any,images:any,overview:any,sizes:[],colors:[]){
            this.brand=brand;
            this.category=category;
            this.title=title;
            this.description=description;
            this.numofitems=numofitems;
            this.price=price;
            this.discound=discound;
            this.images=images;
            this.overview=overview;
            this.sizes=sizes;
            this.colors=colors;
        
            }
}