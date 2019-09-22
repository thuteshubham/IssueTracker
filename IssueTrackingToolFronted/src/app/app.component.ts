import { Component, OnInit } from "@angular/core";
import { Cookie } from "ng2-cookies";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "Client2";
  isLogin = Cookie.get("authtoken") ? true : false;
  constructor(private router: Router) {}
  ngOnInit() {
    setInterval(() => {
      this.isLogin = Cookie.get("authtoken") ? true : false;
    }, 500);
    let receiverName=Cookie.get('receiverName');
    console.log(receiverName);
  }

  signOut() {
    Cookie.delete("authtoken");
    Cookie.delete("userId");
    this.isLogin = false;
    this.router.navigate(["/login"]);
  }
}
