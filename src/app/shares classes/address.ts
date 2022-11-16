export class Address
{
    public country?:string;
    public city?:string;
    public address?:string;


    constructor(country:string,city:string,address:string)
    {
        this.country=country;
        this.city=city;
        this.address=address;
      }

}