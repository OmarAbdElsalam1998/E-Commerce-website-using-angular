export class order{
   

     constructor(
        public userId:number,
        public firstname:string,
        public lastname:string,
        public email: string,
        public Phone: string,
        public country: string,
        public region: string,
        public city: string,
        public zipcode:string,
        public street: string,
        public subscribewhenreciving: boolean,
        public subscribe: boolean,
        public paymentMethod: string,
        public orderStatus: string,
        public itemsList: any[ ],
        public createdAt:Date,
        public subTotalPrice: number,
        public shippingCharge: number,
        public totalPrice: number,
        
        ){

    }
}