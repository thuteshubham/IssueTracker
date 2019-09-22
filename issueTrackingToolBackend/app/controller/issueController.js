const mongoose = require("mongoose");
const shortid = require("short-id");
const time = require("./../libs/timeLib");
const response = require("./../libs/responseLib");
const logger = require("./../libs/loggerLib");
const validateInput = require("../libs/paramsValidationLib");
const check = require("../libs/checkLib");
const passwordLib = require("./../libs/generatePasswordLib");
const token = require("../libs/tokenLib");
const nodeMailer = require("../libs/mailTriggered");
const setRouter = require("./../routes/user");
const express = require("express");
const app = express();

const IssueModel = mongoose.model("Issue");
const CommentModel = mongoose.model("Comment");

let complaintIssue = (req, res) => {
  let validateIssueParams = () => {
    return new Promise((resolve, reject) => {
      if (
        check.isEmpty(req.body.title) ||
        check.isEmpty(req.body.reporter._id) ||
        check.isEmpty(req.body.status)
      ) {
        logger.error(
          "Parameters Missing",
          "registerIssue:Validate Params()",
          5
        );
        let apiResponse = response.generateResponse(
          true,
          "parameters missing.",
          403,
          null
        );
        reject(apiResponse);
      } else {
        resolve();
      }
    });
  }; //end validate params

  let saveIssue = () => {
    return new Promise((resolve, reject) => {
      let newIssue = new IssueModel({
        issueId: shortid.generate(),
        title: req.body.title,
        reporter: req.body.reporter._id,
        status: req.body.status,
        flag: req.body.flag,
        description: req.body.description,
        assignee: req.body.assignee._id || " "
      });

      newIssue.save((err, result) => {
        if (err) {
          console.log(err);
          logger.error(`Error occured : ${err}`, "Database", 10);
          let apiResponse = response.generate(
            true,
            "Failed to register issue",
            500,
            null
          );
          res.send(apiResponse);
        } else {
          console.log(result);
          resolve(result);
        }
      });
    });
  };

  validateIssueParams()
    .then(saveIssue)
    .then(resolve => {
      let apiResponse = response.generate(
        false,
        "Issue registered successfully",
        200,
        resolve
      );
      res.send(apiResponse);
    })
    .catch(err => {
      res.send({ error: err, status: true });
    });
};

let getAllIssues = async (req, res) => {
  try {
    const { page, pageSize, searchText, sort } = req.body;

    const columnsToBeSearched = ["status", "title"];
    const queryOptions = createSearchQuery(columnsToBeSearched, searchText);

    const totalIssues = await IssueModel.countDocuments(queryOptions);
    const sortQuery = {};
    sortQuery[sort["column"]] = sort.order === "asc" ? 1 : -1;

    const allIssues = await IssueModel.find(queryOptions)
      .select("-__v -_id")
      .populate("reporter", "firstName lastName")
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .sort(sortQuery)
      .lean();

    if (allIssues) {
      logger.info("All Issue Found", "Issues Controller : getAllIssues");
      let apiResponse = response.generate(false, "All Issue Found", 200, {
        totalCount: totalIssues,
        issues: allIssues
      });
      res.send(apiResponse);
    } else {
      logger.info("No Isse Found", "Issues Controller : getAllIssues");
      let apiResponse = response.generate(false, "No issue Found", 200, []);
      res.send(apiResponse);
    }
  } catch (err) {
    console.log(err);
    logger.error(err, "Database", 10);
    let apiResponse = response.generate(
      true,
      "Failed to find issues details",
      500,
      null
    );
    res.send(apiResponse);
  }
}; // end get all Issues

const createSearchQuery = (columns, searchKey) => {
  const queryOptions = columns.reduce((acc, column) => {
    const query = {};
    query[column] = {
      $regex: ".*" + searchKey + ".*",
      $options: "i"
    };
    acc.push(query);
    return acc;
  }, []);
  return {
    $or: queryOptions
  };
};

let deleteIssue = (req, res) => {
  IssueModel.remove({ issueId: req.params.issueId }, (err, result) => {
    if (err) {
      logger.error(err, "issueController:deleteIssue()", 10);
      let apiResponse = response.generate(true, "Error Occured", 500, null);
      res.send(apiResponse);
    } else if (check.isEmpty(result)) {
      logger.info("No Issue Found", "Issues Controller : deleteIssue");
      let apiResponse = response.generate(true, "No Issue Found", 404, null);
      res.send(apiResponse);
    } else {
      let apiResponse = response.generate(false, "Issue Deleted", 200, result);
      res.send(apiResponse);
    }
  });
};

let editIssue = (req, res) => {
  let options = req.body;
  console.log(req.params.issueId);
  IssueModel.update({ issueId: req.params.issueId }, options, {
    multi: true
  }).exec((err, result) => {
    if (err) {
      logger.error(err, "issueController:editUser()", 10);
      let apiResponse = response.generate(
        true,
        "Failed to edit issue details",
        500,
        null
      );
      res.send(apiResponse);
    } else if (check.isEmpty(result)) {
      logger.info("No issue details Found", "Issues Controller : editIssue");
      let apiResponse = response.generate(true, "No Issue Found", 404, null);
      res.send(apiResponse);
    } else {
      let apiResponse = response.generate(
        false,
        "Issue details edited/updated successfully",
        200,
        result
      );
      res.send(apiResponse);
    }
  });
};

let getIssueByIssueId = (req, res) => {
  console.log(req.query.issueId);
  if (check.isEmpty(req.query.issueId)) {
    logger.error(
      "issueId is missing",
      "Issues Controller: getIssueByIssueId",
      10
    );
    let apiResponse = response.generate(true, "issueId is missing", 500, null);
    reject(apiResponse);
  } else {
    IssueModel.findOne({ issueId: req.query.issueId })
      .populate("reporter", "firstName lastName")
      .populate("assignee", "firstName lastName")
      .exec((err, issueDetails) => {
        if (err) {
          logger.error(
            "Failed to find issue",
            "Issues Controller: getIssueByIssueId",
            10
          );
          let apiResponse = response.generate(
            true,
            "failed to find the issue details",
            500,
            null
          );
          res.send(apiResponse);
        } else if (check.isEmpty(issueDetails)) {
          logger.error(
            "No Item Found",
            "Issues Controller: getIssueByIssueId",
            10
          );
          let apiResponse = response.generate(
            true,
            "No Issue details Found",
            500,
            null
          );
          res.send(apiResponse);
        } else {
          let apiResponse = response.generate(
            false,
            "Issue details found",
            200,
            issueDetails
          );
          res.send(apiResponse);
        }
      });
  }
}; //end getListByListId

let addComment = (req, res) => {
  if (
    check.isEmpty(req.body.issueId) ||
    check.isEmpty(req.body.user) ||
    check.isEmpty(req.body.comment)
  ) {
    logger.error("Parameters Missing", "registerIssue:Validate Params()", 5);
    let apiResponse = response.generate(true, "parameters missing.", 403, null);
    send(apiResponse);
  } else {
    let newComment = new CommentModel({
      commentId: shortid.generate(),
      issueId: req.body.issueId,
      user: req.body.user,
      comment: req.body.comment
    });
    newComment.save((err, result) => {
      if (err) {
        console.log(err);
        logger.error(err, "issueController:addComment()", 10);
        let apiResponse = response.generate(
          true,
          "Failed to add comment",
          500,
          null
        );
        res.send(apiResponse);
      } else {
        let apiResponse = response.generate(
          false,
          "Comment added",
          200,
          result
        );
        res.send(apiResponse);
      }
    });
  }
};

let getCommentsByIssueId = (req, res) => {
  if (check.isEmpty(req.query.issueId)) {
    logger.error(
      "issueId is missing",
      "Comment Controller: getCommentsByIssueId",
      10
    );
    let apiResponse = response.generate(true, "issueId is missing", 500, null);
    reject(apiResponse);
  } else {
    CommentModel.find({ issueId: req.query.issueId })
      .populate("user", "firstName lastName")
      .sort({ _id: -1 })
      .exec((err, commentDetails) => {
        /* handle the error if the user is not found */
        if (err) {
          logger.error(
            "Failed to find comments",
            "Comment Controller: getCommentsByIssueId",
            10
          );
          let apiResponse = response.generate(
            true,
            "failed to find the comment details",
            500,
            null
          );
          res.send(apiResponse);
        } /* if company details is not found */ else if (
          check.isEmpty(commentDetails)
        ) {
          logger.error(
            "No Comment Found",
            "Comment Controller: getCommentsByIssueId",
            10
          );
          let apiResponse = response.generate(
            true,
            "No comment details Found",
            500,
            null
          );
          res.send(apiResponse);
        } else {
          logger.info(
            "Comments found",
            "Comment Controller: getCommentsByIssueId",
            10
          );
          let apiResponse = response.generate(
            false,
            "Comment details found",
            200,
            commentDetails
          );
          res.send(apiResponse);
        }
      });
  }
}; //end getListByListId

module.exports = {
  complaintIssue,
  getAllIssues,
  editIssue,
  getIssueByIssueId,
  deleteIssue,
  addComment,
  getCommentsByIssueId
};
