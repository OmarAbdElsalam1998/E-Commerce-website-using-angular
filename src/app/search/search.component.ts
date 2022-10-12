import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CartService } from '../services/cart.service';
import { ProductsApiService } from '../services/products-api.service';
import { Cart } from '../shares classes/cart';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public selectedInput :BehaviorSubject<any>

  constructor(
    private productService : ProductsApiService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private titleService:Title,
    private cart :CartService
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

 
  }

  addToCart(index:any){
    this.cart.getProductById(index).subscribe(res=>{
      this.cartItem=res;
      console.log(res);
      console.log(this.cartItem)
      var cart =new Cart(this.cartItem.id,this.cartItem.title,this.cartItem.price,this.cartItem.discountPercentage,this.cartItem.thumbnail,1);
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
  seeDetails(id:any){
     this.router.navigate(["products/",id]);
  }

  sort(event: any) {

    switch (event.target.value) {
      case "LowPrice":
        {
           console.log(this.productsList.products.sort((a:any, b:any) => parseFloat(a.price) - parseFloat(b.price)));
  
           //this.productList.products= this.productList?.products.sort((a:any, b:any) => parseFloat(a.price) - parseFloat(b.price));
           
          break;
        }
  
      case "HighPrice":
        {
             console.log(this.productsList.products.sort((a:any, b:any) => parseFloat(b.price) - parseFloat(a.price)));
            // this.productList?.products.sort((a:any, b:any) => parseFloat(b.price) - parseFloat(a.price));
           
           console.log(this.productsList.products);
          break;
        }
  
        case "LowRate":
          {
             console.log(this.productsList.products.sort((a:any, b:any) => parseFloat(a.rating) - parseFloat(b.rating)));
    
             //this.productList.products= this.productList?.products.sort((a:any, b:any) => parseFloat(a.price) - parseFloat(b.price));
             
            break;
          }
    
        case "HighRate":
          {
               console.log(this.productsList.products.sort((a:any, b:any) => parseFloat(b.rating) - parseFloat(a.rating)));
              // this.productList?.products.sort((a:any, b:any) => parseFloat(b.price) - parseFloat(a.price));
             
             console.log(this.productsList.products);
            break;
          }
  
    }
    
    return this.productsList;
  
    // this.productsList=this.categorieslist2;
  
  }
  // public searchInput: String = '';
  // public searchResult:any;
  // public productList: Array<any> = [
  //   {
  //        "name": "Prison Break",
  //        "description": "Structural Engineer Michael Scofield turns himself into the Fox River Penitentiary in order to break out his brother Lincoln Burrows, who is on death row for the murder of the Vice President's brother. But Lincoln was set up by some of the Company (an agency formed by corrupt government officials) guys, headed by General Jonathan Krantz. Michael breaks out from Fox River with his brother Lincoln and other convicts.",
  //        "genres": "Action, Crime, Drama, Mystery, Thriller",
  //        "releaseDate": "29 August 2005 (USA)"
  //    },
  //   {
  //        "name": "Vikings",
  //        "description": "The adventures of Ragnar Lothbrok: the greatest hero of his age. The series tells the saga of Ragnar's band of Viking brothers and his family as he rises to become King of the Viking tribes. As well as being a fearless warrior, Ragnar embodies the Norse traditions of devotion to the gods: legend has it that he was a direct descendant of Odin, the god of war and warriors.",
  //        "genres": "Action, Drama, History, War",
  //        "releaseDate": "3 March 2013 (USA)"
  //    },
  // {
  //        "name": "Person of Interest",
  //        "description": "A billionaire software-genius named Harold Finch creates a Machine for the government that is designed to detect acts of terror before they can happen, by monitoring the entire world through every cell-phone, email and surveillance camera. Finch discovered that the machine sees everything, potential terrorist acts and violent crimes that involve ordinary people.",
  //        "genres": "Action, Drama, Mystery, Sci-Fi, Thriller",
  //        "releaseDate": "22 September 2011 (USA)"
  //    },
  
  //   ]
  
  //   public toggle: Boolean = false;

  //   fetchProduct(event: any)
  //   {
  //     if(event.target.value === '') 
  //     {
  //       return this.searchResult = []
  //     }
  //    else 
  //    {
  //     this.searchResult = this.productList.filter((product) => {
  //       return product.name.toLowerCase().startsWith(event.target.value.toLowerCase());}
  //    ) }
  //     // this.toggle=false;
  //     return this.searchResult;

  //   }
  
  // showDetails(product :any) {
  //        this.selectedInput = product;
  //        this.toggle = true;
  //        this.searchInput = product.name;
  // }

  // searchData()
  // {

  // }
}
