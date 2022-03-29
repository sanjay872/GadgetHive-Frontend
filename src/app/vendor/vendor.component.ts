import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { Vendor } from '../model/vendor.model';
import { LoginService } from '../services/login.service';
import { VendorService } from '../services/vendor.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {

  vendors:Vendor[]=[];
  showEdit:boolean=false;
  editVendorId:number=0;
  addNewVendor:boolean=false;
  user:User=null;
  pageNo:number=0;
  pageSize:number=3;
  totalPages:number=0;
  totalResults:number=0;

  constructor(private vendorService:VendorService,private loginService:LoginService) { }

  ngOnInit(): void {
    this.vendorService.getAllVendors(this.pageNo,this.pageSize).subscribe(res=>{
      this.vendors=res.body;
      this.totalPages=+res.headers.get('totalPages');
      this.totalResults=+res.headers.get('totalElement');
    })
    this.user=this.loginService.user;
  }

  loadView(){
    this.ngOnInit();
  }

  onUpdate(id:number){
    this.showEdit=true;
    this.editVendorId=id;
  }

  onDelete(id:number){
    if(confirm("are you sure that you want to delete this Vendor?")){
      this.vendorService.deleteVendor(id).subscribe(()=>{
        this.loadView();
      })
    }
  }

  Updated(edited:boolean)
  {
    if(edited)
      this.ngOnInit();
    this.showEdit=false
  }

  addVendor(){
    this.addNewVendor=true;
  }

  addedVendor(_added:boolean){
    if(_added)
      this.loadView();
    this.addNewVendor=false;
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
    this.loadView();
  }

  nextPage(){
    this.pageNo+=1;
    this.loadView();
  }
}
