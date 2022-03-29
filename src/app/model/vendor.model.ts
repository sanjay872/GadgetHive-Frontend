export class Vendor{
    id:number;
    name:string;
    rating:number;
    address:string;
    contactNumber:string;

    constructor(_id:number,_name:string,_rating:number,_address:string,_contactNumber:string){
        this.name=_name;
        this.rating=_rating;
        this.address=_address;
        this.contactNumber=_contactNumber;
    }

}