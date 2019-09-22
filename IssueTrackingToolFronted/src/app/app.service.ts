import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";

import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AppService {
  public url = "http://127.0.0.1:3003/api/v1/users";
  public issueUrl = "http://127.0.0.1:3003/api/v1/issue";

  constructor(public http: HttpClient) {
    console.log("Service constructor");
  }

  public getUserInfoFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("userInfo"));
  };

  public setUserInfoFromLocalStorage = data => {
    localStorage.setItem("userInfo", JSON.stringify(data));
  };

  public signUpFunction(data): Observable<any> {
    return this.http.post(`${this.url}/signup`, data);
  }

  public signInFunction(data): Observable<any> {
    return this.http.post(`${this.url}/login`, data);
  }

  public logoutFunction(data): Observable<any> {
    return this.http.post(`${this.url}/logout`, data);
  }

  public resetPasswordLink(data): Observable<any> {
    return this.http.post(`${this.url}/resetPassword`, data);
  }

  public getUsers(): Observable<any> {
    return this.http.get(`${this.url}/getBasicDetails`);
  }

  public addIssue(data): Observable<any> {
    return this.http.post(`${this.issueUrl}/add`, data);
  }

  public updateIssue(id, data): Observable<any> {
    return this.http.put(`${this.issueUrl}/editIssue/${id}`, data);
  }

  public getIssues(data): Observable<any> {
    return this.http.post(`${this.issueUrl}/getAllIssue`, data);
  }

  public getIssueById(id): Observable<any> {
    return this.http.get(`${this.issueUrl}/getIssueById?issueId=${id}`);
  }

  public getComments(id): Observable<any> {
    return this.http.get(`${this.issueUrl}/getCommentById?issueId=${id}`);
  }

  public addComment(data): Observable<any> {
    return this.http.post(`${this.issueUrl}/addComment`, data);
  }
}
