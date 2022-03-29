import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorMapper } from 'src/app/model/VendorMapper.model';
import { ProductService } from 'src/app/services/product.service';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  form:FormGroup=new FormGroup({});

  @Output()
  added=new EventEmitter<boolean  >();

  vendorMapper:VendorMapper[]=[];

  errorStatus:boolean=false;

  constructor(private fb:FormBuilder,private productService:ProductService,private vendorService:VendorService ) { }

  ngOnInit(): void {
    this.form=this.fb.group({
      modelName:["",[Validators.required,Validators.pattern("[a-zA-Z0-9 ]+")]],
      os:["",[Validators.required]],
      ram:["",[Validators.required]],
      hardDiskSize:["",[Validators.required]],
      stockAvailable:["",[Validators.required]],
      vendorId:["",[Validators.required]]
    })
    this.vendorService.getVendorMapper().subscribe(res=>{
       this.vendorMapper=res
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

  onSubmit(){
    this.productService.addProduct(this.form.value).subscribe(res=>{
      this.form.reset();
      this.errorStatus=false;
      this.added.emit(true);
    },error=>{
      this.errorStatus=true;
    });
  }

  reset()
  {
    this.form.reset();
    this.errorStatus=false;
  }

  onClose(){
    this.added.emit(false);
  }
}
