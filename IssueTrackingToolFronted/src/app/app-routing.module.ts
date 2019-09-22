import { NgModule, Injectable } from "@angular/core";
import {
  Routes,
  RouterModule,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanActivate
} from "@angular/router";
import { LoginComponent } from "./user/login/login.component";
import { SignupComponent } from "./user/signup/signup.component";
import { ForgotPasswordComponent } from "./user/forgot-password/forgot-password.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AddIssueComponent } from "./add-issue/add-issue.component";
import { ViewIssueComponent } from "./view-issue/view-issue.component";
import { Observable } from "rxjs";
import { Cookie } from "ng2-cookies";

@Injectable()
class CanActivateUser implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let actualRoute = route.url[0].path;
    let token = Cookie.get("authtoken");
    console.log(token);
    if (actualRoute === "sign-up" || actualRoute === "login") {
      if (token) {
        this.router.navigate(["/dashboard"]);
        return false;
      }
      return true;
    } else {
      if (!token) {
        this.router.navigate(["/login"]);
        return false;
      }
      return true;
    }
  }
}

const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [CanActivateUser] },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
    canActivate: [CanActivateUser]
  },
  {
    path: "sign-up",
    component: SignupComponent,
    canActivate: [CanActivateUser]
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [CanActivateUser]
  },
  {
    path: "add-issue",
    component: AddIssueComponent,
    canActivate: [CanActivateUser]
  },
  {
    path: "view-issue/:id",
    component: ViewIssueComponent,
    canActivate: [CanActivateUser]
  },
  {
    path: "edit-issue/:id",
    component: AddIssueComponent,
    canActivate: [CanActivateUser]
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent,
    canActivate: [CanActivateUser]
  },
  { path: "*", redirectTo: "dashboard" },
  { path: "**", redirectTo: "dashboard" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [CanActivateUser],
  exports: [RouterModule]
})
export class AppRoutingModule {}
