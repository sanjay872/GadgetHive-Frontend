export class Product{
    id:number;
    modelName:string;
    os:string;
    ram:number;
    hardDiskSize:number;
    stockAvailable:number;
    vendorId:number;
    vendorName:string;

    constructor(_id:number,_modelName:string,_os:string,_ram:number,_hardDiskSize:number,_stockAvailable:number,_vendorId:number,_vendorName:string){
        this.id=_id;
        this.modelName=_modelName;
        this.os=_os;
        this.ram=_ram;
        this.hardDiskSize=_hardDiskSize;
        this.stockAvailable=_stockAvailable;
        this.vendorId=_vendorId;
        this.vendorName=_vendorName;
    }

}