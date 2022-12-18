import { Component, OnInit } from '@angular/core';
import { FormBuilder, MinLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { CommentsService } from 'src/app/services/comments.service';
import { ProductsService } from 'src/app/services/products.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { comments } from 'src/app/shares classes/comments';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review-products',
  templateUrl: './review-products.component.html',
  styleUrls: ['./review-products.component.scss']
})
export class ReviewProductsComponent implements OnInit {
  customerID:any;
  productID:any;
  currentProduct:any;
  createdAt:any=Date.now();
  currentcomment: any=[];
  // CommentForm:any;
  constructor(private userAuth:UserAuthService,private fb:FormBuilder,
    private commentservice:CommentsService,
    private activatedRoute:ActivatedRoute,
    private router:Router,private productService:ProductsService) { }
      CommentForm=this.fb.group(
      {
      rate:['',Validators.required],
      comment:['',[Validators.required,Validators.minLength(5)]],
      customerName:['',Validators.required], 
      
    });
   
  get rate()
  {
    return this.CommentForm.get('rate')
  }
  get comment()
  {
    return this.CommentForm.get('comment')
  }
  get customerName()
  {
    return this.CommentForm.get('customerName')
  }

  ngOnInit(): void {

    this.userAuth.getUserId().subscribe(res=>{
      this.customerID=res;
    });

    this.activatedRoute.paramMap.subscribe((params:ParamMap)=>{
      this.productID=params.get('id');
      this.productService.getaddProductById(this.productID).subscribe(res=>{
        this.currentProduct=res;
      })
    });

    this.commentservice.getCommentForSpecificCustomerAndSpecificProduct(this.customerID,this.productID).subscribe(result=>{
      this.currentcomment=result;

      console.log(this.currentcomment[0])

      if(this.currentcomment[0]){
        this.CommentForm=this.fb.group(
          {
          rate:[this.currentcomment[0]['rate'],Validators.required],
          comment:[this.currentcomment[0]['comment'],Validators.required],
          customerName:[this.currentcomment[0]['customerName'],Validators.required], 
          
        });
      }else{
        this.CommentForm=this.fb.group(
          {
          rate:['',Validators.required],
          comment:['',Validators.required],
          customerName:['',Validators.required], 
          
        });
      }
    })
   
  }
 
addcomment(){
  var comment=new comments(this.customerID,parseInt(this.productID),parseInt(this.rate?.value!),this.comment?.value!,this.customerName?.value!,this.createdAt);
  // console.log(this.currentcomment[0]?.length);
 if (!this.currentcomment[0]){
  this.commentservice.postComment(comment)
  .subscribe(data =>
    {
      Swal.fire({
        
        title: 'Added Successfully',
        icon:'success' ,
        showConfirmButton:false,
        timer:1000
        
       })
        this.router.navigate(["profile/tracking_Orders"])
        this.CommentForm.reset(); 
      },
   error =>{
      console.log("Error" , error)
    }
    
  )

 }
 else{
  this.commentservice.updateComment(this.currentcomment[0].id,comment)
  .subscribe(data =>
    {
      Swal.fire({
        
        title: 'Updated Successfully',
        icon:'success' ,
        showConfirmButton:false,
        timer:1000
        
       })
        this.router.navigate(["profile/tracking_Orders"])
        this.CommentForm.reset(); 
      },
   error =>{
      console.log("Error" , error)
    }
    
  )
 }
   
 
 
 }
}

