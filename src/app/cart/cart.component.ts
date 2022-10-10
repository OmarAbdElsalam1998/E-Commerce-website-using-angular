import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  title="Market Cart";
  constructor(private titleService:Title,private router:Router) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

  }









  
  goToPaymentPage(){
    this.router.navigate(['/payment']);
  }

}
