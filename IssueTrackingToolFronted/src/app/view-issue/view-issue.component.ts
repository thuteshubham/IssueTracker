import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../app.service";
import { Cookie } from "ng2-cookies";

@Component({
  selector: "app-view-issue",
  templateUrl: "./view-issue.component.html",
  styleUrls: ["./view-issue.component.scss"]
})
export class ViewIssueComponent implements OnInit {
  issueId: string;
  issue: any = { assignee: {}, reporter: {} };
  commentText: string = "";
  comments: [];
  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private router: Router
  ) {}
  isEditMode = false;
  ngOnInit() {
    this.getIssue();
    this.getComments();
  }

  getIssue() {
    this.issueId = this.route.snapshot.params.id;
    if (!this.issueId) {
      return;
    }
    this.appService.getIssueById(this.issueId).subscribe((res: any) => {
      this.issue = res.data;
    });
  }

  getComments() {
    this.appService.getComments(this.issueId).subscribe((res: any) => {
      this.comments = res.data;
      console.log(this.comments);
    });
  }
  addComment() {
    const data = {
      issueId: this.issueId,
      user: Cookie.get("userId"),
      comment: this.commentText
    };
    this.appService.addComment(data).subscribe((res: any) => {
      this.commentText = "";
      this.getComments();
    });
  }

  editIssue() {
    this.router.navigate(["edit-issue", this.issueId]);
  }
}
