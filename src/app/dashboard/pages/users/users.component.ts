import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AdminRoleService } from 'src/app/services/admin-role.service';
import { Address } from 'src/app/shares classes/address';
import { GeneralInfo } from 'src/app/shares classes/generalInfo';
import { UserRole } from 'src/app/shares classes/userRole';
import Swal from 'sweetalert2';
import { ConfirmPasswordValidator } from './confirmPassword';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  title="Users"
  userResponsipilities:string[]=[];
  constructor(private adminService: AdminRoleService , private activateRoute:ActivatedRoute, private fb:FormBuilder , private route:Router , private titleService : Title) { }

  // userRole :UserRole = new UserRole("","","","","","",{},"","",[]);
  userList:any;
  userId:any;
  count:any;
  currentUser:any;

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.loadData();
    // this.loadSpecificDataById();
  }

  addUserForm=this.fb.group(
    {
    userName:['',[Validators.required,Validators.maxLength(32),Validators.minLength(3)]],           //call simple validators
    lastName:['',[Validators.required,Validators.maxLength(32),Validators.minLength(3)]],           //call simple validators
    userEmail:['',[Validators.required,Validators.pattern("^([a-zA-Z0-9_-]+)@([a-zA-Z]+)\.(com|eg)$")]],
    phone:[,[Validators.required,Validators.maxLength(11),Validators.minLength(11)]],           //call simple validators
    Password:['',[Validators.required,Validators.pattern("^[a-zA-Z0-9_-]{6,32}$")]],        //call simple validators
    confirmPassword:[''],           //call simple validators
    role:[''], 
    image:[''],
    
  },
  {validator:[ConfirmPasswordValidator,Validators.required]}                    //call Cross field validators (on all form Group not only control)
  );


  loadData()
  {
    this.adminService.getAdmins().subscribe(
      data=>
      {
        this.userList=data;
        // this.count=this.userList.length;
        // console.log(this.count);
        console.log(this.userList);
      }
    )
  }

  UpdateUser(id:any)
  {
    var user =new UserRole(this.addUserForm.value.userName!,this.addUserForm.value.lastName!,this.addUserForm.value.userEmail!,
      this.addUserForm.value.phone!,this.addUserForm.value.Password!,"admin",[],"",this.userImageUrl!,this.userResponsipilities!)
  //   // get userDetails by id
    this.adminService.putUser(user,id)
    .subscribe(
        (data) =>{
          user=data;
          console.log(data);
          this.loadData();
          this.resetForm();
          let close = document.getElementById('close');
           close?.click();
          Swal.fire({
        
            title:"Updated Successfully",
            icon:'success' ,
            showConfirmButton:false,
            timer:1000
            
           })
        }
      )
    }
    editUser(id:any){
      this.resetForm();
      console.log("ddd")
      this.currentUser=id;
      this.adminService.getUserById(id).subscribe(result => {
        console.log(result);
        this.addUserForm.controls['userName']?.setValue(result['userName']);
        this.addUserForm.controls['lastName']?.setValue(result['lastName']);
        this.addUserForm.controls['userEmail']?.setValue(result['userEmail']);
        this.addUserForm.controls['phone']?.setValue(result['phone']);
        this.addUserForm.controls['Password']?.setValue(result['Password']);
        this.addUserForm.controls['confirmPassword']?.setValue(result['Password']);
        this.userImageUrl=result['image'];
        this.userResponsipilities=result['responsability'];
    });
    }
 
    resetForm()
    {
      this.addUserForm.reset();
      this.userImageUrl="";
      this.userResponsipilities=[];
    }  
    
  addUser()
  {
     var user =new UserRole(this.addUserForm.value.userName,this.addUserForm.value.lastName,this.addUserForm.value.userEmail,
      this.addUserForm.value.phone,this.addUserForm.value.Password,"admin",[],"",this.userImageUrl,this.userResponsipilities)
    this.adminService.postUser(user).subscribe(
      data =>{
        this.addUserForm.reset();
        this.resetForm();

        let close = document.getElementById('close');
        close?.click();
        Swal.fire({
        
          title:"User Added Successfully",
          icon:'success' ,
          showConfirmButton:false,
          timer:1000
          
         })
        // this.route.navigate(['/dashboard/users']);
        this.loadData();
        console.log(data);
      }
    )
  }

  search(event:any){

  }

  userImageUrl = '';
  onSelect(event:any) {
    let fileType = event.target.files[0].type;
    if (fileType.match(/image\/*/)) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.userImageUrl = event.target.result;
        console.log(this.userImageUrl)
      };
    } else {
      window.alert('Please select correct image format');
    }
  }
  addUserResponsibilities(event:any){
    if(event.target.value){
      this.userResponsipilities.push(event.target.value);
    }
    console.log(event.target.value +" "+event.which);

     
  }
  //remove role from Array Of User Responsability
  removeUserResponsibilities(index:number){
   this.userResponsipilities.splice(index,1);

  }


  showConfirmAlert(id:any){
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
        this.DeleteUser(id)
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
       
      }
    })
  }

  DeleteUser(id:any){
    this.adminService.deleteUser(id)
    .subscribe(
      data =>{
        console.log(id);
        this.loadData();
      }
    )
  }

    get userName()
    {
      return this.addUserForm.get('userName');
    }
    get lastName()
    {
      return this.addUserForm.get('lastName');
    }
    get userEmail()
    {
      return this.addUserForm.get('userEmail');
    }
    get phone()
    {
      return this.addUserForm.get('phone');
    }
    get Password()
    {
      return this.addUserForm.get('Password');
    }
    get confirmPassword()
    {
      return this.addUserForm.get('confirmPassword');
    }
    get role()
    {
      return this.addUserForm.get('role');
    }
    get image()
    {
      return this.addUserForm.get('image');
    }


  
}
