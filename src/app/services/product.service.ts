import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //local server
  //url:string="http://localhost:8081/product";
  
  //ec2 production server
  //url:string="http://ec2-3-84-83-228.compute-1.amazonaws.com:8081/product";
  
  //elastic beanstalker server
  url:string="http://Productservice-env.eba-vdkppabe.us-east-1.elasticbeanstalk.com/product";

  constructor(private http:HttpClient) { }

  addProduct(_product:Product){
    return this.http.post(this.url,_product);
  }

  getProduct(_id:number){
    return this.http.get<Product>(this.url+"/"+_id);
  }

  getAllProducts(_pageNo:number,_pageSize:number){
    let queryParams = new HttpParams();
    queryParams= queryParams.append("pageNo",_pageNo);
    queryParams=queryParams.append("pageSize",_pageSize);
    return this.http.get<Product[]>(this.url+"/all",{params:queryParams,observe:'response'});
  }

  updateProduct(_product:Product){
    return this.http.put(this.url,_product);
  }

  deleteProduct(_id:number){
    return this.http.delete(this.url+"/"+_id);
  }

  searchByVendor(_name:string,_pageNo:number,_pageSize:number){
    let queryParams = new HttpParams();
    queryParams=queryParams.append("pageNo",_pageNo);
    queryParams=queryParams.append("pageSize",_pageSize);
    return this.http.get<Product[]>(this.url+"/vendor/"+_name,{params:queryParams,observe:'response'});
  }

  searchByProduct(_name:string,_pageNo:number,_pageSize:number){
    let queryParams = new HttpParams();
    queryParams=queryParams.append("pageNo",_pageNo);
    queryParams=queryParams.append("pageSize",_pageSize);
    return this.http.get<Product[]>(this.url+"/name/"+_name,{params:queryParams,observe:'response'});
  }

}
