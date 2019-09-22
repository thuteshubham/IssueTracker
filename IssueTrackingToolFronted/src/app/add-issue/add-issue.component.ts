import { Component, OnInit } from "@angular/core";
import { AppService } from "../app.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Cookie } from 'ng2-cookies';

@Component({
  selector: "app-add-issue",
  templateUrl: "./add-issue.component.html",
  styleUrls: ["./add-issue.component.scss"]
})
export class AddIssueComponent implements OnInit {
  allUsers: any;
  issueDetails: any;
  issueId: string;
  isEditMode = false;
  attachments = [];
  toolbar = [
    ["bold", "italic", "underline", "strikeThrough"],
    ["fontName", "fontSize", "color"],
    [
      "justifyLeft",
      "justifyCenter",
      "justifyRight",
      "justifyFull",
      "indent",
      "outdent"
    ],
    ["removeFormat", "undo", "redo"],
    [
      "paragraph",
      "blockquote",
      "removeBlockquote",
      "horizontalLine",
      "orderedList",
      "unorderedList"
    ],
    ["link", "unlink", "image"]
  ];
  constructor(
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getUsers();
    this.initializeIssueDetails();
    this.issueId = this.route.snapshot.params.id;
    if (this.issueId) {
      this.isEditMode = true;
      this.getIssue();
    }
  }

  initializeIssueDetails() {
    this.issueDetails = {
      title: "",
      status: "NOT_ASSIGNED",
      description: "",
      flag: "",
      assignee: { _id: "" },
      reporter: { _id: Cookie.get("userId") }
    };
  }

  addIssue() {
    let isValid = true;
    if (this.issueDetails.title == "") {
      isValid = false;
      this.toastr.error("Please enter the Title");
    }
    if (this.issueDetails.description == "") {
      isValid = false;
      this.toastr.error("Please enter the Description");
    }
    if (this.issueDetails.assignee._id == "") {
      isValid = false;
      this.toastr.error("Please select the Assignee Name");
    }
    if (isValid) {
      this.appService.addIssue(this.issueDetails).subscribe((res: any) => {
        if (res.error) {
          this.toastr.error("Something Went wrong");
        } else {
          this.toastr.success("Issue added successfully");
          this.router.navigate(["view-issue", res.data.issueId]);
        }
      });
    }
  }

  getUsers() {
    this.appService.getUsers().subscribe(res => {
      this.allUsers = res;
    });
  }

  getIssue() {
    if (!this.issueId) {
      return;
    }
    this.appService.getIssueById(this.issueId).subscribe((res: any) => {
      this.issueDetails = res.data;
      console.log(this.issueDetails);
    });
  }

  updateIssue() {
    this.appService
      .updateIssue(this.issueId, this.issueDetails)
      .subscribe((res: any) => {
        this.toastr.success("Issue updated successfully");
        this.router.navigate(["view-issue", this.issueId]);
      });
  }

  handleFileInput(files: FileList) {
    if (files) {
      var filesAmount = files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          console.log(event.target.result);
          this.attachments.push(event.target.result);
        };

        reader.readAsDataURL(files[i]);
      }
      this.issueDetails["attachments"] = this.attachments;
    }
  }
}
