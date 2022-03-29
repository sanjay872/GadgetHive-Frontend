import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent implements OnInit {

  form:FormGroup=new FormGroup({});

  @Output()
  added=new EventEmitter<boolean>();

  errorStatus:boolean=false;

  constructor(private fb:FormBuilder,private vendorService:VendorService) { }

  ngOnInit(): void {
    this.form=this.fb.group({
      name:["",[Validators.required,Validators.pattern("[a-zA-Z ]+")]],
      rating:["",[Validators.required]],
      address:["",[Validators.required]],
      contactNumber:["",[Validators.required]]
    })
  }

  get name(){
    return this.form.get("name");
  }

  get rating(){
    return this.form.get("rating");
  }

  get address(){
    return this.form.get("address");
  }

  get contactNumber(){
    return this.form.get("contactNumber");
  }

  onSubmit()
  {
      this.vendorService.addVendor(this.form.value).subscribe(res=>{
        this.form.reset();
        this.errorStatus=false;
        this.added.emit(true);
      },error=>{
        this.errorStatus=true;
      });
  } 

  onClose(){
    this.added.emit(false);
  }

  reset()
  {
    this.form.reset();
    this.errorStatus=false;
  }

}
