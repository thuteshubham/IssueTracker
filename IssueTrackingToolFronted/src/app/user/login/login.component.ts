import { Component, OnInit } from "@angular/core";
import { AppService } from "src/app/app.service";
import { ToastrService } from "ngx-toastr";
import { ActivatedRoute, Router } from "@angular/router";
import { Cookie } from "ng2-cookies";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public email: any;
  public password: any;

  constructor(
    public appService: AppService,
    private toastr: ToastrService,
    public _route: ActivatedRoute,
    public router: Router
  ) {
    console.log("constructor in Login component");
  }

  ngOnInit() {}

  public goToSignUp: any = () => {
    this.router.navigate(["/sign-up"]);
  };

  public signinFunction: any = () => {
    if (!this.email) {
      this.toastr.warning("Enter Email");
      return;
    } else if (!this.password) {
      this.toastr.warning("Enter password");
      return;
    } else {
      var data = {
        email: this.email,
        password: this.password
      };
    }

    this.appService.signInFunction(data).subscribe(
      response => {
        console.log(response);
        if (response.status === 200) {
          this.toastr.success("Login successfull");
          Cookie.set("authtoken", response.data.authToken);
          Cookie.set("userId", response.data.userDetails._id);
          Cookie.set(
            "receiverName",
            response.data.userDetails.firstName +
              "" +
              response.data.userDetails.lastName
          );
          this.appService.setUserInfoFromLocalStorage(
            response.data.userDetails
          );
          setTimeout(() => {
            this.router.navigate(["/dashboard"]);
          }, 1000);
        } else {
          this.toastr.error(response.message);
        }
      },
      error => {
        this.toastr.warning("Incorrect Email or Password");
      }
    );
  };
}
