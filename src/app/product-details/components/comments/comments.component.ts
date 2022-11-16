import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DashboardMainComponent } from 'src/app/dashboard/pages/dashboard-main/dashboard-main.component';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
 
  constructor(private commentservice:CommentsService, private activatedRoute:ActivatedRoute,public router:Router) { }
  data:any;
  errorMsg:any;
  commentat:any;
  selectedId:any;
  currentDateTime=Date.now();

  ngOnInit(): void {
    this.getcommentsbyid();
    // this.activatedRoute.paramMap.subscribe((params:ParamMap)=>{
    // this.selectedId=params.get("id");
    // console.log("HI ID "+parseInt());
      
    // })
  //  this.selectedId= this.activatedRoute.snapshot.params['id'];
  //  console.log("HI ID "+this.selectedId);

    
  }
 getcommentsbyid(){
  console.log("HI ID IEJFIRIGERGHOEIRIO "+this.router.url.toString()[9]);
  this.commentservice.getCommentForSpecificProduct(parseInt(this.router.url.toString()[9])).subscribe(
    
    data=>{
       this.commentat=data;
      console.log(data);
      },
      errorData=>{
        this.errorMsg=errorData;
      })

     
 }



}
