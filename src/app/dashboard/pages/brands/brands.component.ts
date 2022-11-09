import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  page:number=1;
  brands:any;
  copyBrands:any=[];
  constructor() { }

  ngOnInit(): void {
    
  //  this.brandService.getOrders().subscribe((response)=>{
  //   this.brands=response;
  //   this.brands=response;
  //  })
  }
  search(e:any){
    console.log(e.keyCode);
    this.copyBrands=[...this.brands];
    if(e.target.value==""){
      // this.ngOnInit();
    }
    else{

      this.copyBrands=this.brands.filter((res:any)=>{
        return res.name.toLocaleLowerCase().match(e.target.value.toLocaleLowerCase());
      });
    }
  }
 
  brandImageUrl = '';
  onSelect(event:any) {
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
  showConfirmAlert(){
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
        swalWithBootstrapButtons.fire({
        
          title:  'Deleted!',
          text: "You won't be able to revert this!",
          icon:'success' ,
          showConfirmButton:false,
          timer:1000
          
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
