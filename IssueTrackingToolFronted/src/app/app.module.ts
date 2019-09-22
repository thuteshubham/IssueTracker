import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserModule } from "./user/user.module";
import { HttpClientModule } from "@angular/common/http";

import { FormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { NgbModule, NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";
import { AddIssueComponent } from './add-issue/add-issue.component';
import { ViewIssueComponent } from './view-issue/view-issue.component';
import { NgxEditorModule } from 'ngx-editor';

@NgModule({
  declarations: [AppComponent, DashboardComponent, AddIssueComponent, ViewIssueComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgbPaginationModule,
    NgxEditorModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
