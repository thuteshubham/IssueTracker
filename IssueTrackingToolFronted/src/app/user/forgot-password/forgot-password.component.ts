import { Component, OnInit } from '@angular/core';
import {AppService} from '../../app.service';
import {ToastrService} from 'ngx-toastr';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public email:any;

  constructor(
    public appService:AppService,
    private toastr:ToastrService,
    public _route:ActivatedRoute,
    public router:Router
  ) { }

  ngOnInit() {
  }

  public goToSignUp:any=()=>{
    this.router.navigate(['/sign-up']);
  }

  public resetPassword=()=>{

    if(!this.email){
      this.toastr.warning("Enter email Address")
    }
    else{
      this.appService.resetPasswordLink(this.email)
    .subscribe(
      response=>{
        console.log(response)
        this.toastr.success("reset link sent");
        setTimeout(()=>{
          this.router.navigate(['/login']);
        },1000);

      },
      error=>{
        console.log('some error occured');
        this.toastr.error("Error in reseting password!");

      }
    )

    }

    
  }




}
