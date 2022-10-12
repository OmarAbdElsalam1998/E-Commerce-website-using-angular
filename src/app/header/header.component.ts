import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { FavouriteService } from '../services/favourite.service';
import { ProductsApiService } from '../services/products-api.service';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn:any;
  username:any;
  isAdmin:any;
  favouriteCounter:any;
  cartCounter:any;

  constructor(private userauth:UserAuthService,private router:Router,
    private userAuth:UserAuthService,private productApi:ProductsApiService,
    private cartService:CartService,private favouriteService:FavouriteService) { 
    this.isLoggedIn=this.userAuth.getLoggedStatus();
    console.log(this.username)
   
  }
    
  ngOnInit(): void {
    this.userauth.getLoggedStatus().subscribe(status=>{
      this.isLoggedIn=status;
    })
    this.userauth.getUsername().subscribe(status=>{
      this.username=status;
    })
   this.userAuth.getIsAdminStatus().subscribe(status=>{ this.isAdmin=status});
   this.cartService.getCartProductsCounter().subscribe(res=>{
    this.cartCounter=res;
   })
   this.favouriteService.getfavouriteProductesCounter().subscribe(res=>{
    this.favouriteCounter=res;
   })

   
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    
  }

  logOut(){
    this.userauth.logOut();
    this.router.navigate([""]);

  }
  public searchInput: String = '';
  public searchResult:any;
  public seriesList: Array<any> = [
    {
         "name": "Prison Break",
         "description": "Structural Engineer Michael Scofield turns himself into the Fox River Penitentiary in order to break out his brother Lincoln Burrows, who is on death row for the murder of the Vice President's brother. But Lincoln was set up by some of the Company (an agency formed by corrupt government officials) guys, headed by General Jonathan Krantz. Michael breaks out from Fox River with his brother Lincoln and other convicts.",
         "genres": "Action, Crime, Drama, Mystery, Thriller",
         "releaseDate": "29 August 2005 (USA)"
     },
    {
         "name": "Vikings",
         "description": "The adventures of Ragnar Lothbrok: the greatest hero of his age. The series tells the saga of Ragnar's band of Viking brothers and his family as he rises to become King of the Viking tribes. As well as being a fearless warrior, Ragnar embodies the Norse traditions of devotion to the gods: legend has it that he was a direct descendant of Odin, the god of war and warriors.",
         "genres": "Action, Drama, History, War",
         "releaseDate": "3 March 2013 (USA)"
     },
  {
         "name": "Person of Interest",
         "description": "A billionaire software-genius named Harold Finch creates a Machine for the government that is designed to detect acts of terror before they can happen, by monitoring the entire world through every cell-phone, email and surveillance camera. Finch discovered that the machine sees everything, potential terrorist acts and violent crimes that involve ordinary people.",
         "genres": "Action, Drama, Mystery, Sci-Fi, Thriller",
         "releaseDate": "22 September 2011 (USA)"
     },
  
    ]

  search (keyword: any) 
  { this.productApi.searchData(keyword.value);
    this.router.navigate(["search/" + keyword.value]);
  }

  // fetchSeries (event: any) 
  // {
  //     if (event.target.value === '') 
  //     {
  //       return this.searchResult = [];
  //     }
  //     else
  //   {   this.searchResult = this.seriesList.filter((series) => {
  //       return series.name.toLowerCase().startsWith(event.target.value.toLowerCase());}
  //    ) }

  //     return this.searchResult;
  //   }
  

}
