import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { error } from 'jquery';
import { CategoreisService } from 'src/app/services/categoreis.service';
import { Icategories } from 'src/app/shares classes/Icategories';
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
  categoryForm!:FormGroup;
  categoryModel:any;
  categoryDetails:any;
  showAddBtn:boolean=true;
  showUpdateBtn:boolean=false;
  categoryImageUrl:any = '';
  currentcategory:any;
  numOfCategories:number=0;

  constructor(private categoriesservice:CategoreisService,private fb:FormBuilder,private router:ActivatedRoute,private titleSevice:Title) { }
  data:any;
  errorMsg:any;
  ngOnInit(): void {
    this.titleSevice.setTitle("Categories");

    //  this.categoryService.getOrders().subscribe((response)=>{
  //   this.categories=response;
  //   this.copyCategories=response;
  //  })

  this.GetAll();
  this.createcategoryForm();

  // this.categoriesservice.getcurrunetcategory(this.router.snapshot.params['id']).subscribe((result:any) => {
  // (
  //   this.categoryForm.controls['Name'].setValue(result['Name']),
  //   this. categoryImageUrl=result['Img'],
  //   this. subCategories=result['subCategories']
  // )
    
  // })

  }

  
  //JSON SERVER FUNCTIONS 
  GetAll(){
    this.categoriesservice.getAllcategroies().subscribe(
      data=>{
         this.categories=data;
         this.copyCategories=data;
        console.log(data);
        },
        errorData=>{
          this.errorMsg=errorData;
        })
  }
  createcategoryForm(){
    this.categoryForm = this.fb.group({
      Name:['',Validators.required],
      Img:['',Validators.required],
      subCategories:[[]],
      
    });
  }

 onAddClick(){
  this.categoryForm.reset();
   this.subCategories=[];
   this.categoryImageUrl="";
    this.showAddBtn=true;
    this.showUpdateBtn=false;
  }
 
 
  addCategory(){

   var cat =new Icategories (this.categoryForm.value.Name,this.categoryImageUrl,this.subCategories);
    this.categoriesservice.addcategory(cat).subscribe(res=>{
      this.numOfCategories=this.numOfCategories+1;
      let close = document.getElementById('close');
      close?.click();
      Swal.fire({
        
        title:'Added Successfully',
        icon:'success' ,
        showConfirmButton:false,
        timer:1000
        
       })
     this.categoryForm.reset();
     this.subCategories=[];
      this.categoryImageUrl='';
      this.GetAll();
    }, err=>{
      alert("Error");
    })
  }

  deleteCategory(catid:number){
    
    this.categoriesservice.deletecategory(catid).subscribe(res=>{
     
      this.numOfCategories=this.numOfCategories-1;
      this.GetAll();
    }, err=>{
      alert("Failed to delete product information");
    })
  }
  editCategorybefore(catid:number){
    this.showAddBtn=false;
    this.showUpdateBtn=true;
    this.categoriesservice.getcurrunetcategory(catid).subscribe((result:any) => {
      
        this.categoryForm.controls['Name'].setValue(result['Name']),
        this. categoryImageUrl=result['Img'],
        this. subCategories=result['subCategories']
        this.currentcategory=result;
    }
    )
   
    // this.categoryForm.controls['Name'].setValue(category.Name);
    // this.categoryForm.controls['Img'].setValue(this.categoryImageUrl); 
    // this.categoryForm.controls['subCategories'].setValue(this.subCategories);
  }
  updateafterEditetaked(catid:any){
    // this.categoryModel= Object.assign({}, this.categoryForm.value);
    var cat =new Icategories ( this.categoryForm.value.Name,this.categoryImageUrl,this.subCategories);
    this.categoriesservice.updatecategroy(catid,cat).subscribe(res=>{
     
      this.GetAll();
      let close = document.getElementById('close');
      close?.click();
      Swal.fire({
        
        title:'Updated Successfully',
        icon:'success' ,
        showConfirmButton:false,
        timer:1000
        
       })
      this.categoryForm.reset();
      this.subCategories=[];
       this.categoryImageUrl='';
      this.categoryModel={};
    }, err=>{
      alert("Error in updating Category information");
    })
  }
  reset(){
    this.categoryModel={};
  }
  search(event:any){

  }

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
        this.categoriesservice.deletecategory(id)
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
          'Your imaginary file is safe 🙂',
          'error'
        )
      }
    })
  }


}
