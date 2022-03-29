import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendorService } from 'src/app/services/vendor.service';
@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.css']
})
export class EditVendorComponent implements OnInit {

  form:FormGroup=new FormGroup({});
  formLoaded:boolean=false;
  @Output()
  editedVendor=new EventEmitter<boolean>();
  @Input()
  vendorId:number=0;
  errorStatus:boolean=false;

  constructor(private fb:FormBuilder,private vendorService:VendorService) { }

  ngOnInit(): void {
    this.vendorService.getVendor(this.vendorId).subscribe(res=>{
      this.form=this.fb.group({
        id:[res.id,[Validators.required]],
        name:[res.name,[Validators.required,Validators.pattern("[a-zA-Z ]+")]],
        rating:[res.rating,[Validators.required]],
        address:[res.address,[Validators.required]],
        contactNumber:[res.contactNumber,[Validators.required]]
      })
      this.formLoaded=true;
    },error=>{
      this.formLoaded=false;
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
      this.vendorService.updateVendor(this.form.value).subscribe(()=>{
        this.editedVendor.emit(true);
        this.errorStatus=false;
      },error=>{
        console.log(error);
        this.errorStatus=true;
      });
    }

    onClose()
    {
      this.editedVendor.emit(false);
    }

}
