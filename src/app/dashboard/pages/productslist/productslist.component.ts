import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, TitleStrategy } from '@angular/router';
import { error } from 'jquery';
import { ProductsApiService } from 'src/app/services/products-api.service';
import Swal from 'sweetalert2';
import { ProductsService } from 'src/app/services/products.service';
import { AnimateTimings } from '@angular/animations';
import { SortPipe } from 'src/app/pipes/sort.pipe';

@Component({
  selector: 'app-productslist',
  templateUrl: './productslist.component.html',
  styleUrls: ['./productslist.component.scss']
})
export class ProductslistComponent implements OnInit {
  displayGrid: boolean = true;
  productsList: any;
  copyProductList:any;
  page=1;
  
  constructor(private router: Router, private ProductService: ProductsService,private titleService:Title) { }
  productdata: any = [];
  ngOnInit(): void {
    this.titleService.setTitle("Products");
    this.ProductService.getProduct().subscribe((allData) => {
    this.productdata = allData;
      this.copyProductList=allData;
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
  deleteProduct(id: number) {

    this.ProductService.deleteProduct(id)
      .subscribe({
        next: (res) => {
          this.ngOnInit();
        },
        error: () => {
          console.log("Error", error)
        }
      })

  }
  sort(event: any) {
    // switch (event.target.value) {
    //   case "LowPrice":
    //     {
    //       this.SortDirection = 'asc';
    //       break;
    //     }
  
    //   case "HighPrice":
    //     {
    //       this.SortDirection = 'desc';
    //       break;
    //     }
    // if (this.SortDirection === 'desc') {
    //   this.SortDirection = 'asc';
    // } else {
    //   this.SortDirection = 'desc';
    // }
  //     }
  //     return this.productdata;
  }
  search(event:any){
    this.page=1;
    console.log(event.keyCode);
    this.productsList = [...this.copyProductList];
    if (event.target.value == "") {
       this.ngOnInit();
    }
    else {

      this.productdata = this.copyProductList.filter((res: any) => {
        return res.title.toLocaleLowerCase().match(event.target.value.toLocaleLowerCase());
      });
    }
  }
}

