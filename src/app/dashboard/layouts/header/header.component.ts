import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor( ) { }

  ngOnInit(): void {
 
  
   }
   toggleSidebar(){
    document.body.classList.toggle("toggle-sidebar");
   }
}
