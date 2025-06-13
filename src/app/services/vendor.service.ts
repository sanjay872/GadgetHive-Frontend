import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vendor } from '../model/vendor.model';
import { VendorMapper } from '../model/VendorMapper.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  //local server
  url:string="http://localhost:8082/vendor";
  
  //production server
  //url:string="http://Vendorservice-env.eba-fpauqv8c.us-east-1.elasticbeanstalk.com";
  
  constructor(private http:HttpClient) { }

  addVendor(vendor:Vendor){
    return this.http.post(this.url,vendor);
  }

  getVendor(id:number){
    return this.http.get<Vendor>(this.url+"/"+id);
  }

  updateVendor(vendor:Vendor){
    return this.http.put(this.url,vendor);
  }

  getVendorMapper(){
    return this.http.get<VendorMapper[]>(this.url+"/map");
  }

  deleteVendor(id:number){
    return this.http.delete(this.url+"/"+id);
  }

  getAllVendors(_pageNo:number,_pageSize:number){
    let queryParams = new HttpParams();
    queryParams=queryParams.append("pageNo",_pageNo);
    queryParams=queryParams.append("pageSize",_pageSize);
    return this.http.get<Vendor[]>(this.url+"/all",{params:queryParams,observe:'response'});
  }

}
