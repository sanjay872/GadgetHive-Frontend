import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { Product } from '../model/product.model';
import { User } from '../model/user.model';
import { LoginService } from '../services/login.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products:Product[]=[];
  showEdit:boolean=false;
  editProductId:number=0;
  addNewProduct:boolean=false;
  searchPattern:string="^[a-zA-Z0-9 ]+$";
  searchKey:string="";
  user:User=null;
  searchType:string="product";
  pageNo:number=0;
  pageSize:number=3;
  totalPages:number=0;
  searchMode:boolean=false;
  totalResults:number=0;

  constructor(private productService:ProductService,private loginService:LoginService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.loadView();
    this.user=this.loginService.user;
  }

  loadView(){
    this.productService.getAllProducts(this.pageNo,this.pageSize).subscribe(res=>{
      this.products=res.body;
      this.totalPages=+res.headers.get('totalPages');
      this.searchMode=false;
      this.totalResults=+res.headers.get('totalElement');
    })
  }

  onUpdate(id:number){
    this.showEdit=true;
    this.editProductId=id;
  }

  onDelete(id:number){
    if(confirm("are u sure u want to delete this product?"))
    {
      this.productService.deleteProduct(id).subscribe(()=>{
        this.loadView();
      })
    }
  }

  Updated(edited:boolean)
  {
    if(edited)
      this.loadView();
    this.showEdit=false
  }

  addedProduct(edited:boolean){
    if(edited)
      this.loadView();
    this.addNewProduct=false;
  }

  addProduct(){
    this.addNewProduct=true;
  }

  search(searchText:string)
  {
    if(!this.searchMode)
      this.pageNo=0;
    if(searchText.trim().length>0){
      if(this.searchKey!=searchText)
        this.pageNo=0;
      this.searchKey=searchText;
      if(this.searchType=='product')
        this.searchByProduct(searchText);
      else if(this.searchType=='vendor')
        this.searchByVendor(searchText);  
    }
    else
    {
      this.pageNo=0;
      this.loadView();
    }
  }

  searchByVendor(vendorName:string){
    this.productService.searchByVendor(vendorName,this.pageNo,this.pageSize).subscribe(res=>{
      this.products=res.body;
      this.totalPages=+res.headers.get('totalPages');
      this.searchMode=true;
      this.totalResults=+res.headers.get('totalElement');
    },error=>{
      this.products=null;
    })
  }

  searchByProduct(productName:string){
    this.productService.searchByProduct(productName,this.pageNo,this.pageSize).subscribe(res=>{
      this.products=res.body;
      this.totalPages=+res.headers.get('totalPages');
      this.searchMode=true;
      this.totalResults=+res.headers.get('totalElement');
    },
    error=>{
      this.products=null;
    })
  }

  ispageStarted(){
    if(this.pageNo==0)
      return true;
    return false;
  }

  ispageEnded(){
    if((this.pageNo+1)>=this.totalPages)
      return true;
    return false;
  }

  previousPage(){
    this.pageNo-=1;
    if(this.searchMode)
      this.search(this.searchKey);
    else
      this.loadView();
  }

  nextPage(){
    this.pageNo+=1;
    if(this.searchMode)
    {
      this.search(this.searchKey);
      console.log(this.searchKey);
    }
    else
      this.loadView();
  }

}
