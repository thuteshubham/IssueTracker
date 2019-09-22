const express = require("express");
const router = express.Router();
const issueController = require("./../controller/issueController");
const appConfig = require("./../../config/appConfig");

setRouter = app => {
  let baseUrl = `${appConfig.apiVersion}/issue`;

  app.post(`${baseUrl}/add`, issueController.complaintIssue);

   /**
     * @apiGroup Issues
     * @apiVersion  1.0.0
     * @api {post} /api/v1/issues/registerIssue To register issue.
     *
     * @apiParam {string} issueId issueId of issue. (body params)
     * @apiParam {string} issueTitle Title of the issue. (body params)
     * @apiParam {string} reporterId ID of the reporter. (body params)
     * @apiParam {string} reporterName Name of the Reporter. (body params)
     * @apiParam {string} status Status of the issue. (body params)
     * @apiParam {string} description Breif Description of the issue. (body params)
     * @apiParam {string} attachments Array to store related attachments of issue. (body params)
     * @apiParam {string} assignee Assignee to whom reporter will assign his/her issue to fix. (body params)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
                    {
                        "error": false,
                        "message": "Issue registered successfully",
                        "status": 200,
                        "data": {
                            "issueId": "CcvsI9xtn"
                            "issueTitle": "Performance of System"
                            "reporterId": "eKOTSdkn7"
                            "reporterName": "Shubham Thute"
                            "status": "in-progress"
                            "description": "This is Test Description"
                            "attachments": [
                                "https://s3.ap-south-1.amazonaws.com/issue-bucket/rla4BtiEsScreenshot.png"
                            ]
                            "assignee": "Akshay Kumar"
                            "comments": [],
                            "watchers": [],
                            "reportedOn": "2018-09-23T11:50:23.820Z"
                        }
                    }
        * @apiErrorExample {json} Error-Response:
        *
            {
                "error": true,
                "message": "Failed to register issue",
                "status": 500,
                "data": null
            }
    */

  app.post(`${baseUrl}/getAllIssue`, issueController.getAllIssues);

  /**
         * @apiGroup Issues
         * @apiVersion  1.0.0
         * @api {get} /api/v1/issues/allIssues To get all Issues
         *
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
  
            {
                "error": false,
                "message": "All Issue Found",
                "status": 200,
                "data": [
                    {
                        "issueId": "pYd3NsrdB",
                        "issueTitle": "Demo Issue",
                        "reporterId": "0uDHZaVDK",
                        "reporterName": "Shubham Thute",
                        "status": "in-test",
                        "description": "Dummy Description",
                        "attachments": [
                            "https://issue-bucket.s3.amazonaws.com/jquery1.png"
                        ],
                        "comments": [],
                        "watchers": [],
                        "reportedOn": "2018-10-11T12:55:09.161Z",
                        "assignee": "Akshay Kumar"
                    },
                    {
                        "issueId": "Wl7Gfp2Ad",
                        "issueTitle": "Test Issue",
                        "reporterId": "0uDHZaVDK",
                        "reporterName": "Shubham Thute",
                        "status": "in-progress",
                        "description": "Des-test",
                        "attachments": [
                            "https://issue-bucket.s3.amazonaws.com/jquery_icon.png"
                        ],
                        "comments": [],
                        "watchers": [],
                        "reportedOn": "2018-10-11T12:55:09.161Z",
                        "assignee": "Akshay Kumar"
                    }
                ]
            }
    */    


  app.get(`${baseUrl}/getIssueById`, issueController.getIssueByIssueId);
  /**
         * @apiGroup Issues
         * @apiVersion  1.0.0
         * @api {get} /api/v1/issues/:issueId/getIssue To get single issue details.
         *
         * @apiParam {string} issueId Issue ID of the issue. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Issue details found",
                "status": 200,
                "data": {
                    "issueId": "Wl7Gfp2Ad",
                    "issueTitle": "Test Issue",
                    "reporterId": "0uDHZaVDK",
                    "reporterName": "Shubham Thute",
                    "status": "in-progress",
                    "description": "Description-edited",
                    "attachments": [
                        "https://issue-bucket.s3.amazonaws.com/jquery_icon.png"
                    ],
                    "comments": [],
                    "watchers": [],
                    "reportedOn": "2018-10-11T12:55:09.161Z",
                    "_id": "5bbfa299495b8a177cf4bc34",
                    "assignee": "Akshay Kumar",
                    "__v": 0
                }
            }
         * @apiErrorExample {json} Error-Response:
         *
            {
                "error": true,
                "message": "No Issue Found",
                "status": 404,
                "data": null
            }
    */

  app.post(`${baseUrl}/deleteIssue`, issueController.deleteIssue);
   /**
         * @apiGroup Issues
         * @apiVersion  1.0.0
         * @api {post} /api/v1/issues/:issueId/deleteIssue To delete single issue.
         *
         * @apiParam {string} issueId Issue ID of the issue. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Issue Deleted",
                "status": 200,
                "data": {
                    "n": 1,
                    "ok": 1
                }
            }
         * @apiErrorExample {json} Error-Response:
         *
            {
                "error": true,
                "message": "No Issue Found",
                "status": 404,
                "data": null
            }
    */

  app.post(`${baseUrl}/addComment`, issueController.addComment);
   /**
     * @apiGroup Comments
     * @apiVersion  1.0.0
     * @api {post} /api/v1/comments/addComment To add comment.
     *
     * @apiParam {string} issueId issueId of issue. (body params)
     * @apiParam {string} userId ID of user. (body params)
     * @apiParam {string} userName Name of the User. (body params)
     * @apiParam {string} comment Comment of user. (body params)
     * 
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
                    {
                        "error": false,
                        "message": "Comment added",
                        "status": 200,
                        "data": {
                            "issueId": "CcvsI9xtn"
                            "userId": "eKOTSdkn7"
                            "userName": "Shubham Thute"
                            "comment": "Dummy text comment"
                            "commentedOn": "2018-09-23T11:50:23.820Z"
                        }
                    }
        * @apiErrorExample {json} Error-Response:
        *
            {
                "error": true,
                "message": "Failed to add comment",
                "status": 500,
                "data": null
            }
    */


  app.get(`${baseUrl}/getCommentById`, issueController.getCommentsByIssueId);

  /**
         * @apiGroup Comments
         * @apiVersion  1.0.0
         * @api {get} /api/v1/comments/:issueId/getCommentsOnIssue To get all comments on issue.
         *
         * @apiParam {string} issueId Issue ID of the issue. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Comment details found",
                "status": 200,
                "data": [
                    {
                        "commentId": "cMeUUHJZs",
                        "issueId": "Wl7Gfp2Ad",
                        "userId": "0uDHZaVDK",
                        "userName": "Shubham Thute",
                        "comment": "Text Comment1",
                        "commentedOn": "2018-10-11T12:55:09.137Z",
                        "_id": "5bbfa969495b8a177cf4bc35",
                        "__v": 0
                    },
                    {
                        "commentId": "rkT0BbzSM",
                        "issueId": "Wl7Gfp2Ad",
                        "userId": "0uDHZaVDK",
                        "userName": "Shubham Thute",
                        "comment": "Text Comment2",
                        "commentedOn": "2018-10-11T12:55:09.137Z",
                        "_id": "5bbfa978495b8a177cf4bc36",
                        "__v": 0
                    }
                ]
            }
         * @apiErrorExample {json} Error-Response:
         *
            {
                "error": true,
                "message": "No comment details Found",
                "status": 500,
                "data": null
            }
    */


  app.put(`${baseUrl}/editIssue/:issueId`, issueController.editIssue);
   /**
         * @apiGroup Issues
         * @apiVersion  1.0.0
         * @api {put} /api/v1/issues/:issueId/editIssue To edit single issue.
         *
         * @apiParam {string} issueId Issue ID of the issue. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Issue details edited/updated successfully",
                "status": 200,
                "data": {
                    "n": 1,
                    "nModified": 1,
                    "ok": 1
                }
            }
         * @apiErrorExample {json} Error-Response:
         *
            {
                "error": true,
                "message": "No Issue Found",
                "status": 404,
                "data": null
            }
    */
};

module.exports = {
  setRouter: setRouter
};
