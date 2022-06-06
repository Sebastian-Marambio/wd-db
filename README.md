# IDDB

## Description

A public database for various kinds of dev tools. Users can rate tools and add new ones to the database.
 
## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see the ratings and login and signup. I want to be able to filter by category. 
- **sign up** - As a user I want to sign up on the webpage so that I can add tools and rate them
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **add tool** - As a user I want to add a tool with name, description, categories and image so that it can be rated
- **see all my tools** - As a user I want to see all tools I added
- **update any of my tools** - As a user I want to update a tool created by me
- **delete any of my tools** - As a user I want to delete a tool created by me
- **tool detail** - As a user I want to see the tool details so that I can rate, update my rating, save as a favorite and download
- **see all my favorite tools** - As a user I want to see all tools I favorited in one place
- **delete a tool from my favorites** - As a user I want to delete a tool from my favorites

## Backlog

List of other features outside of the MVPs scope

- ?


## ROUTES:

- GET / 
  - renders the homepage, including the table of the tools (top ten only)
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)

- GET /tool/detail/:id
  - renders the tool details page, shows links to update and delete if tool was created by this user
- GET /tool/detail/add
  - renders the form to create a tool
- POST /tool/detail/add
  - creates the tool in the db
  - redirects to the /tool/details/:id (of newly created tool)
- GET /tool/detail/:id/edit
  - renders the form to edit the tool
  - guarded so it can only be accessed by creator of this tool
- POST /tool/detail/:id/edit
  - redirects to /tool/details/edit
  - updates tool
  - guarded so it can only be accessed by creator of this tool
- POST /tool/detail/:id/delete
  - deletes tool
  - redirects 
  - guarded so it can only be accessed by creator of this tool

- GET /user
  - shows tools created by user (limited to ten)
  - shows favorites of this user (limited to ten)
- POST /user/favorite/delete
  - deletes favorite
  - redirects to /user

- GET /events
  - renders the event list + the create form
- POST /events/create 
  - redirects to / if user is anonymous
  - body: 
    - name
    - date
    - location
    - description
- GET /events/:id
  - renders the event detail page
  - includes the list of attendees
  - attend button if user not attending yet
- POST /events/:id/attend 
  - redirects to / if user is anonymous
  - body: (empty - the user is already stored in the session)


## Models

User model
 
```
username: String required
password: String required
email: String required
favorites: Array of ObjectId<Tool>
ratings: Array of Objects(ObjectId<Tool>,Number)
```

Tool model

```
creator: ObjectId<User>
name: String required
description: String required
category: Enum required
rating: Number
downloads: Number
timesFavorited: Number
image: String
``` 

## Links

### Trello

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
