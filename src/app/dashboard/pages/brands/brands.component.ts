import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { data, error } from 'jquery';
import { BrandsService } from 'src/app/services/brands.service';
import { brand } from 'src/app/shares classes/brands';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {


  productsForm!: FormGroup;
  productsModel: any;
  productsDetails: any;
  showAddBtn: boolean = true;
  showUpdateBtn: boolean = false;
  page: number = 1;
  brands: any;
  copyBrands: any = [];
  image: any;
  id: any;
  currentbrand:any;
 


  constructor(private brand: BrandsService, private fb: FormBuilder, private router: ActivatedRoute
  ) { }



  ngOnInit(): void {
      


    this.brand.getAllbrands().subscribe((res) => {
      this.brands = res;
      this.brands = res;
    })

    this.getAllbrandDetails();
    this.createbrandForm();
    this.brand.getCurrent(this.router.snapshot.params['id']).subscribe((result:any) => {
      
      (
        this.productsForm.controls['name'].setValue(result['name']),
        this. brandImageUrl=result['Img']
        
      )
  
  })

}
  search(e: any) {
    console.log(e.keyCode);
    this.copyBrands = [...this.brands];
    if (e.target.value == "") {
      // this.ngOnInit();
    }
    else {

      this.copyBrands = this.brands.filter((res: any) => {
        return res.name.toLocaleLowerCase().match(e.target.value.toLocaleLowerCase());
      });
    }
  }

  brandImageUrl = '';
  onSelect(event: any) {
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.brandImageUrl = event.target.result;
        console.log(this.brandImageUrl)
      };
    } else {
      window.alert('Please select correct image format');
    }
  }
  /////////////////////////////
  createbrandForm() {
    this.productsForm = this.fb.group({
      Img: [this.brandImageUrl],
      name: [''],

    });
  }
  /////////////////////////
  onAddClick() {
    this.showAddBtn = true;
    this.showUpdateBtn = false;
  }
  ////////////////////////////////

  getAllbrandDetails() {
    this.brand.getAllbrands().subscribe(res => {
      this.productsDetails = res;
    }, err => {
      console.log(err);

    })
  }
  ////////////////////////////////
  addbrandForm = this.fb.group(
    {
      name: ['', Validators.required],

      Img: [this.brandImageUrl, Validators.required]
    });


  get name() {
    return this.productsForm.get('name');
  }
  get img() {
    return this.productsForm.get('Img');
  }
  //////////////////Add/////////////////
  addbrandDetails() {
    // this.productsModel = Object.assign({}, this.productsForm.value);
    // console.log(this.productsForm.value);

    var bran = new brand(this.productsForm.value.name, this.brandImageUrl);
    this.brand.Postbrand(bran).subscribe(res => {
      alert("brand Information added successfully");
      let close = document.getElementById('close');
      close?.click();
      this.productsForm.reset();
      this.brandImageUrl='';
      this.getAllbrandDetails();
    }, err => {
      alert("Error");
    })
  }
  ////////////////////FOOORM/////////////////

  //////////////////////////////Delete/////////////////
  deletebrandDetails(id: any) {
    this.brand.Deletebrand(id).subscribe(res => {
      alert("product information deleted successfully");
      this.getAllbrandDetails();
    }, err => {
      alert("Failed to delete product information");
    })
  }
  ///////////////////Edit///////////////////

  Edit(Brandid:number) {

    this.showAddBtn = false;
    this.showUpdateBtn = true;
    this.brand.getCurrent(Brandid).subscribe((result:any) => {
      
      this.productsForm.controls['name'].setValue(result['name']),
      this. brandImageUrl=result['Img'],
      this.currentbrand=result;

    })
  }
  ////////////update/////////////////////////

  updatebrandDetails(id:any) {
    // this.productsModel = Object.assign({}, this.productsForm.value);

    var bran = new brand(this.productsForm.value.name, this.brandImageUrl);
    this.brand.Updatebrand(id,bran).subscribe(res => {

      alert("brand information updated successfully");
      let close = document.getElementById('close');
      close?.click();
      this.getAllbrandDetails();
      this.productsForm.reset();
      this.brandImageUrl='';
      this.productsModel = {};
    }, err => {
      alert("Error in updating brand information");
    })
 
}


  reset() {
    this.productsForm.reset();
    this.productsModel = {};
  }
  showConfirmAlert(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.brand.Deletebrand(id)
          .subscribe({
            next: (res) => {
              this.ngOnInit();
            },
            error: () => {
              console.log("Error", error)
            }
          })

        swalWithBootstrapButtons.fire({

          title: 'Deleted!',
          text: "You won't be able to revert this!",
          icon: 'success',
          showConfirmButton: false,
          timer: 1000

        })
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }
}
