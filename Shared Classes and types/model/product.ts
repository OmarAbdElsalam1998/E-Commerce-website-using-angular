export class Product {

  
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;


    constructor(id=1 ,name='',price=0,imageUrl="",description=''){

        this.id=id;
        this.name=name;
        this.description=description;
        this.price=price;
        this.imageUrl=imageUrl;
    }
  }
