import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, TitleStrategy } from '@angular/router';
import { error } from 'jquery';
import { ProductsApiService } from 'src/app/services/products-api.service';
import Swal from 'sweetalert2';
import { ProductsService } from 'src/app/services/products.service';
import { AnimateTimings } from '@angular/animations';

@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrls: ['./productslist.component.scss']
})
export class ProductslistComponent implements OnInit {
  displayGrid: boolean = true;
  productsList: any;

  constructor(private router: Router, private ProductService: ProductsService,private titleService:Title) { }
  productdata: any = [];
  searchText:any;
  ngOnInit(): void {
    this.titleService.setTitle("Products");
    this.ProductService.getProduct().subscribe((allData) => {
    this.ProductService.getProduct().subscribe((allData) => {
      console.log(allData);
      this.productdata = allData;
    });
  });
}
 
  addProduct() {
    this.router.navigate(['/dashboard/productslist/addProduct']);
  }

  displayMode(value: string) {
    if (value == "grid") {
      this.displayGrid = true;
    }
    else {
      this.displayGrid = false;
    }

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
       
        this.deleteProduct(id);

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
  deleteProduct(id:number){
   
    this.ProductService.deleteProduct(id)
    .subscribe({
      next:(res)=>{
        this.ngOnInit();
      },
      error:()=>{
        console.log("Error",error)
      }
    })
  
  }
  sort(event: any) {

   
  
  }
  search(event:any){
    
  }
}

