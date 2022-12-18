import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../services/cart.service';
import { FavouriteService } from '../services/favourite.service';
import { ProductsApiService } from '../services/products-api.service';
import { ProductsService } from '../services/products.service';
import { UserAuthService } from '../services/user-auth.service';
import { Cart } from '../shares classes/cart';
import CustomerCart from '../shares classes/customerCart';
import { Favourite } from '../shares classes/favourite';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public selectedInput :BehaviorSubject<any>
  favouriteItem:any;
  page=1;
  currentCustomerId:any;
  CartItemsOfCurrentCustomer:any;
  constructor(
    private productService : ProductsService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private titleService:Title,
    private cart :CartService,
    private favouriteService:FavouriteService,
    private userAuth:UserAuthService
   ) 
    {
      this.selectedInput= new BehaviorSubject<any> ("")
    }
   

  title="Search Page";
  productsList:any;
  cartItem:any;

  keyword:any;
  ngOnInit(): void 
  {
    this.cart.getCartItemsForSpecificCustomer(this.currentCustomerId).subscribe(res=>{
      this.CartItemsOfCurrentCustomer=res;
      console.log(this.CartItemsOfCurrentCustomer[0]?.cartItems.length);
  });

    this.titleService.setTitle(this.title);
    // this.activateRoute.paramMap.subscribe((param:ParamMap)=>    //load all data with specific condition like in html line 8  with (id and it's data)
    // {
    //   this.selectedInput.next(param.get("keyword"));
    // })

      //  this.selectedInput.subscribe(data=>{this.keyword=data ;console.log(this.keyword)});
    this.productService.getsearchResultData().subscribe(data=>{
      this.productsList=data;
      console.log(data);
    });
    this.userAuth.getUserId().subscribe(id=>{
      this.currentCustomerId=id;
    })

 
  }
  addToCart(index:any){
    
    this.cart.getProductById(index).subscribe(res=>{
      this.cartItem=res;
      console.log(res);
      console.log(this.cartItem)
      var cart =new Cart(this.cartItem.id,this.cartItem.title,this.cartItem.price,this.cartItem.discound,this.cartItem.thumbnail,1);
    this.cart.saveproduct(cart).subscribe(data =>
      {
        // this.usersArr=data;
      },
      error =>
        {
        }
        );


    });

   
    

  }

  // addToCart(ProductId:any){
  //   //user not logged in
  //   if(!this.userAuth.getLoggedStatus().value){
  //     console.log("zeft"); 
  //     var product;
  //     var arr: Cart[]=[];
  //     //check if there is items saved in local storage
  //     if(localStorage.getItem("CartItems")){
  //       arr=JSON.parse(localStorage.getItem("CartItems")!);
  //       var indexOfProductAddedBefore=-1;
  //       arr.forEach((res,index)=>{
  //         if(res.productId==ProductId){
  //           indexOfProductAddedBefore=index;
  //         }
  //       });
  //     //get product from api by it's id  
  //     this.productService.getaddProductById(ProductId).subscribe(res=>{
  //       product=res;
  //         console.log(indexOfProductAddedBefore);

  //         //product  exists in localstorage===>CartItems
  //         if(indexOfProductAddedBefore>-1){
  //           var counter=arr[indexOfProductAddedBefore].count!;
  //           console.log(product);
  //           var cartItem=new Cart(product.id,product.title,product.price,product.discount,product.images[0],++counter)
  //           arr[indexOfProductAddedBefore]=cartItem;
  //          localStorage.setItem("CartItems",JSON.stringify(arr));
  //         }
  //         //product doesn't exists in localstorage===>CartItems
  //         else{
  //           var cartItem=new Cart(product.id,product.title,product.price,product.discount,product.images[0],1)
  //           arr.push(cartItem);
  //          localStorage.setItem("CartItems",JSON.stringify(arr));

  //         }
          
  //       });
  //     }
  //       // if there is no items saved in local storage
  //       else{
  //           var product;
  //           var arr2: Cart[]=[];
  //           this.productService.getaddProductById(ProductId).subscribe(res=>{
  //             product=res;
  //             var counter=1;
  //             var cartItem=new Cart(res.id,res.title,res.price,res.discount,res.images[0],counter)
  //             arr2.push(cartItem);
  //             localStorage.setItem("CartItems",JSON.stringify(arr2));

  //           });
        
  //     }

  //   }
  //   //user is logged in
  //   else{
  //     console.log("lofff")
  //     //if there is items in localStorage
  //     if(localStorage.getItem("CartItems")){
  //       var arr3: Cart[]=[];
  //       arr3=JSON.parse(localStorage.getItem("CartItems")!);
  //       var copyarr=[...arr3];
  //       var checkExists=arr3.filter(item=>item.productId==ProductId);
  //        if(checkExists){
  //         var cart=new Cart(checkExists[0].productId,checkExists[0].title,checkExists[0].price,checkExists[0].discount,checkExists[0].thumbnail,checkExists[0].count!+1);
  //         var customerCart=new CustomerCart(this.currentCustomerId,copyarr);
  //         console.log(customerCart);
  //        this.cart.saveproduct(customerCart).subscribe(res=>{
  //         alert("saved");
  //         this.ngOnInit();
  //        });
  //         localStorage.removeItem("CartItems");
  //       }

  //        }else if(this.CartItemsOfCurrentCustomer){
  //         console.log("?????????????????////////////////////????")

  //         var productInCart=false;
  //         if(this.CartItemsOfCurrentCustomer?.length>0){
  //            var  indexOfCurrentProduct=-1;
  //             let checkItem=this.CartItemsOfCurrentCustomer[0]?.cartItems!.filter((item:any)=>item.productId==ProductId);
                      
  //                 if(checkItem){
  //                   var cart=new Cart(checkItem.productId,checkItem.title,checkItem.price,checkItem.discount,checkItem.thumbnail,checkItem.count!+1);
                    
  //                   console.log("?????????????????////////////////////????")
                   
                   
  //                 }
  //                 else{
  //                   var arr4:Cart[]=[];
  //                   this.productService.getaddProductById(ProductId).subscribe(res=>{
  //                     var cart=new Cart(res.id,res.title,res.price,res.discound,res.images[0],1);
  //                     arr4.push(cart);
  //                     console.log(arr4);
            
  //                     var customerCart=new CustomerCart(this.currentCustomerId,arr4);
  //                     console.log(customerCart);
  //                     console.log(arr4);
            
  //                    this.cart.saveproduct(customerCart).subscribe(res=>{
  //                     alert("saved");
  //                    });
  //                   });
  //                 }
                     
              
  //           }
           
  //       }
  //       else{
  //         var arr4:Cart[]=[];
  //         this.productService.getaddProductById(ProductId).subscribe(res=>{
  //           var cart=new Cart(res.id,res.title,res.price,res.discound,res.images[0],1);
  //           arr4.push(cart);
  //           console.log(arr4);
  
  //           var customerCart=new CustomerCart(this.currentCustomerId,arr4);
  //           console.log(customerCart);
  //           console.log(arr4);
  
  //          this.cart.saveproduct(customerCart).subscribe(res=>{
  //           alert("saved");
  //          });
  //         });
  //       }
  //     }
  //   }

        
  //     updateCustomerCart(ProductId:any,CartItemsOfCurrentCustomer:any){
        
       
  //       }
       
      
    //add item to favourite
    addToFavorites(index:any){
      this.favouriteService.getProductById(index).subscribe(res=>{
        this.favouriteItem=res;
        console.log(res);
        console.log(this.favouriteItem)
        var favourites =new Favourite(this.favouriteItem.id,this.favouriteItem.title,this.favouriteItem.thumbnail)
      this.favouriteService.saveproduct(favourites).subscribe(data =>
        {
          // this.usersArr=data;
        },
        error =>
          {
          }
          );
  
  
      });
    }
  seeDetails(id:any){
     this.router.navigate(["product/",id]);
  }

  sort(event: any) {
    switch (event.target.value) {
      case "LowPrice":
        {
           this.productsList.sort((a:any, b:any) => parseFloat(a.price) - parseFloat(b.price));
             
          break;
        }
  
      case "HighPrice":
        {
            this.productsList.sort((a:any, b:any) => parseFloat(b.price) - parseFloat(a.price));           
          break;
        }
  
        case "LowRate":
          {
             this.productsList.sort((a:any, b:any) => parseFloat(a.rating) - parseFloat(b.rating));
                 
            break;
          }
    
        case "HighRate":
          {
               this.productsList.sort((a:any, b:any) => parseFloat(b.rating) - parseFloat(a.rating));
            break;
          }
  
    }
    
    return this.productsList;  
  }

}
