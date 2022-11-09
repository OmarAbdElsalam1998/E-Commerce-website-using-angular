import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrls: ['./productslist.component.scss']
})
export class ProductslistComponent implements OnInit {
 displayGrid:boolean=true;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  search(event:any){

  }
  addProduct(){
    this.router.navigate(['/dashboard/addProduct']);
  }
  editProduct(){
    this.router.navigate(['dashboard/editProduct/',11])
  }
  displayMode(value:string){
    if(value=="grid"){
      this.displayGrid=true;
    }
    else{
      this.displayGrid=false;
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
