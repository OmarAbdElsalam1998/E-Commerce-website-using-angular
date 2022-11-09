import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  page:number=1;
  categories:any;
  copyCategories:any;
  subCategories:string[]=[];

  constructor() { }

  ngOnInit(): void {
    //  this.categoryService.getOrders().subscribe((response)=>{
  //   this.categories=response;
  //   this.copyCategories=response;
  //  })
  }
  search(event:any){

  }
  categoryImageUrl = '';
  onSelect(event:any) {
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.categoryImageUrl = event.target.result;
        console.log(this.categoryImageUrl)
      };
    } else {
      window.alert('Please select correct image format');
    }
  }
  //Add sub Category To Array When click Enter
  addSubCategory(event:any){
    if(event.which==13 && event.target.value.length>0){
      this.subCategories.push(event.target.value);
      event.target.value="";
    }
    console.log(event.target.value +" "+event.which);

     
  }
  //remove sub category from Array Of sub Categries
  removeSubCategory(index:number){
   this.subCategories.splice(index,1);

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
