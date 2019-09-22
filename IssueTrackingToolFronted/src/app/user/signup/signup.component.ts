import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service';
import {ToastrService} from 'ngx-toastr';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public firstName:any;
    public lastName:any;
    public mobile:any;
    public email:any;
    public password:any;
   

  constructor(public appService:AppService,
    private toastr:ToastrService,
    public _route:ActivatedRoute,
    public router:Router) { 
      console.log("constructor in sign-up component");
    }

    

  ngOnInit() {
  }

  public goToSignIn:any=()=>{
    this.router.navigate(['/']);
  }

  public signupFunction:any=()=>{
    
    if(!this.firstName){
      this.toastr.warning('Enter First Name');
    }
    else if(!this.lastName){
      this.toastr.warning('Enter last Name');
    }
    else if(!this.email){
      this.toastr.warning('Enter Email');
    }
    else if(!this.password){
      this.toastr.warning('Enter password');
    }
    else{
      var data={
        firstName:this.firstName,
        lastName:this.lastName,
        email:this.email,
        password:this.password,
    
      }
      console.log(data);
    }
    

    this.appService.signUpFunction(data)
    .subscribe(
      response=>{
        console.log(response);
        if(response.status===200){
          this.toastr.success('SignUp successfull');
          setTimeout(()=>{
            this.router.navigate(['/']);},3000);
        }
        else{
          this.toastr.error(response.message)

        }
        },
        error=>{
          this.toastr.error('Some error occured')
        }
      
    );
  }




}
