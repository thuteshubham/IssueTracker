import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "../app.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  pageSize: number = 10;
  collectionSize: number = 100;
  page: number = 1;
  totalCount: number = 0;
  searchText: string = "";
  allIssues: any;
  sortQuery = {
    column: "reportedOn",
    order: "desc"
  };

  constructor(private router: Router, private appService: AppService) {}

  ngOnInit() {
    this.getIssues();
  }

  goToAddIssue() {
    this.router.navigate(["add-issue"]);
  }

  goToViewIssue(issueId) {
    this.router.navigate(["view-issue", issueId]);
  }

  sortIssues(columnName) {
    this.sortQuery = {
      column: columnName,
      order: this.sortQuery.order === "asc" ? "desc" : "asc"
    };
    this.getIssues();
  }

  getIssues() {
    this.appService
      .getIssues({
        pageSize: this.pageSize,
        page: this.page,
        searchText: this.searchText,
        sort: this.sortQuery
      })
      .subscribe((res: any) => {
        this.allIssues = res.data.issues;
        this.totalCount = res.data.totalCount;
      });
  }

  getSortableArrow(column) {
    if (column === this.sortQuery.column) {
      return this.sortQuery.order === "asc" ? "⮟" : "⮝";
    } else {
      return "";
    }
  }
  searchIssue() {
    //Will implement tommorow
  }
}
