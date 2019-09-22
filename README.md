# IssueTrackerTool

Issue Tracker Application
Angular is a platform that makes it easy to build applications with the web. Angular combines declarative templates, dependency injection, end to end tooling, and integrated best practices to solve development challenges. Angular empowers developers to build applications that live on the web, mobile, or the desktop
This is a MEAN stack based application which is used to Post the issue, Comment on issue.  There are two separate parts of the application 
1.IssueTrackerFrontend
2.IssueTracker Backend

Prerequisites

1.	To start with this, install node and npm
2.	Install git
3.	Use npm to install Angular CLI . Exceute this command
>npm install -g @angular/cli

Installing/ Running locally
1.	Create a folder named as Issue Tracker at any local drive
2.	change directory to 
>cd / Issue Tracker/
3.	Fetch the source code from my github library 
>git init

> git remote add origin https://github.com/thuteshubham/IssueTrackerTool.git

>git pull origin master

	Or 
Refer a bellow link
https://github.com/thuteshubham/IssueTrackerTool
4.	Install all the modules required to run the given application with following command in IssueTrackingToolFronted
>npm install



5.	Run the application by using following command in Client(Backend)
>ng serve 
   But in my package.json I have added in IssueTrackingToolFronted

"scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test",
    "lint": "ng lint",
    "e2e": "ng e2e"
  },

So you use can use > npm start 


6. Navigate to http://localhost:4200/ via browser . You will see the application is running on IssueTrackingToolFronted

7.	By considering Mongo dB and mongoose installation run the below command 
>mongod



8. Install all the modules required to run the given application with following command in issueTrackingToolBackend
>npm install

9. Run the application by using following command 
>npm start 
    Since in my package.json I have added below code 
{
  "name": "chat-backend",
  "version": "1.0.0",
  "description": "Issue tracker",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon app.js"
  }



Screenshots for your reference:

Login Page:
 

 Dashboard:

 


While clicking by User on any of the Issues it will show particular issue.
 


You may comment issue :
 









More about the application(IssueTrackerFronted:
1. User management System –
             a) Signup - User is able to sign up on the platform providing all details like                                  First Name, Last Name, Email.
b) Login - User is able to login using the credentials provided at signup.

2. Dashboard View
a) Upon Login it will show dashboard view, which will show all the issue list in paginated format.
b)Right side of navigation pane you can see logout button.
c) Immediate left side is for creating issue, and search box you can see. 

More about the application(IssueTrackerBackend):
1.	I have used Mongo Db as a database, used node.js as a platform to build backend server and Express.js is framework on node.js platform to build backend meeting planner application.
2.	Hashpassword method use for encryption by using bycrypt.
3.	Token Used: Jwt token
4.	Logger Library: Pino


Built With
•	Angular - The web framework used for Frontend Design
•	NPM - Most of the modules are used.
•	apiDoc - NPM module to create the apiDoc and eventDoc
Authors
•	Shubham S thute

Guided by:
•	Edwisor.com
 
Acknowledgments
•	Thanks Edwisor for helping to improve my skills ,many more to learn .



















