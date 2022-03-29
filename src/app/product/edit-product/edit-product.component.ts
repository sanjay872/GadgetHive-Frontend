import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorMapper } from 'src/app/model/VendorMapper.model';
import { ProductService } from 'src/app/services/product.service';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  form:FormGroup=new FormGroup({});
  formLoaded:boolean=false;
  @Output()
  editedProduct=new EventEmitter<boolean>();
  @Input()
  productId:number=0;
  vendorMapper:VendorMapper[]=[]
  errorStatus:boolean=false;

  constructor(private fb:FormBuilder,private productService:ProductService,private vendorService:VendorService) { }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe(res=>{
      this.form=this.fb.group({
        id:[res.id,[Validators.required]],
        modelName:[res.modelName,[Validators.required,Validators.pattern("[a-zA-Z0-9 ]+")]],
        os:[res.os,[Validators.required]],
        ram:[res.ram,[Validators.required]],
        hardDiskSize:[res.hardDiskSize,[Validators.required]],
        stockAvailable:[res.stockAvailable,[Validators.required]],
        vendorId:[res.vendorId,[Validators.required]],
      })
      this.formLoaded=true;
      this.vendorService.getVendorMapper().subscribe(res=>{
        this.vendorMapper=res;
      })
    },error=>{
      this.formLoaded=false;
    })
  }

  get modelName(){
    return this.form.get("modelName");
  }

  get os(){
    return this.form.get("os");
  }

  get ram(){
    return this.form.get("ram");
  }

  get hardDiskSize()
  {
    return this.form.get("hardDiskSize");
  }

  get stockAvailable()
  {
    return this.form.get("stockAvailable");
  }

  get vendor(){
    return this.form.get("vendorId");
  }
  
  onSubmit()
    {
      this.productService.updateProduct(this.form.value).subscribe(()=>{
        this.editedProduct.emit(true);
        this.errorStatus=false;
      },error=>{
        console.log(error);
        this.errorStatus=true;
      });
    }

    onClose()
    {
      this.editedProduct.emit(false);
    }


}
