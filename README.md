# iBebe Questions

### `Description`

This project is Stackoverflow alike SPA application but it is themed to mother and babies. The frontend of the applicatin is written using Angular 12.1 framework. The application is an exam project for Softuni Angular course 7/2021. The project is using a backend written in Node/ Express (see the link to the repo in the backend section). The backend is using a MongoDB database in Atlas cloud. All images are stored in Cloudinary cloud storage.

To run the application you need to download the zip file or clone the repo to run the application.

- install dependencies

```
npm install --legacy-peer-deps
```

### `Functionalities`

- all users(unauthenticated and authenitcated) users can browse questions and their answer and/or comments
- all users can search questions and filter question by category or tag
- all user can see last 6 questions, 6 most viewed questions and 6 most voted questions on the home page
- authenticated users can post questions, answers and comments
- authenticated user can edit or deleted their questions and answers
- users can register, login and logout

### `Project Structure`

- user module - handles authentication and user profile
- question module - question list page, create a question
- answer module - list answers on question's page, create answer
- comment module - list and create comment on question or answer
- toaster module - handles success and error notifications
- home module - encapsulates home page components - search, navigation and lastest/ viewed/ voted questions
- core module - contains common components /header, footer, not found, all services, guards and inteceptors/
- shared module - contains all interfaces, pipes as well as components used in various modules like image-gallery, and form-validators

pages:

- '/' - home page
- '/register' - register page
- '/login' - login page
- '/questions' - questions listing page
- '/questions/questionId' - question detail page
- '/question/create - question create page
- '/question/questionId/edit - question edit page
- '/profile' - user profile and his/ her questions and answers
- '/profile/user' - display and update user profile information
- '/profile/questions' - list, update, delete user's questions
- '/profile/answers' - list, update, delete user's answers
- '/answers/answerId/edit - edit answer page
- '/about' - about page

### `Features`

- NgRX implemented for questions state
- animations - ngIf animate (question-list, image-gallery components), router animation
- images are uploaded and stored in Cloudinary cloud service
- social login with Google and Facebook
- Angular template(register, login, question, answer) and reactive (user profile update, commment) forms
- template and reactive form validation, including custom validators for username and passwords
- routing, forChild routing for questions and users; nested children routing for user profile page
- lazy loading of about page module
- guards for both authenticated users; guard for unsaved changes;
- http interceptors for authentication and errors
- pagination of question list

### `Backend`

- for backend code link to repo:
  [https://github.com/dkutelov/ibebe-backend](https://github.com/dkutelov/ibebe-backend)

- backend is deployed on Heroku:
  [https://warm-dusk-99357.herokuapp.com/api/](https://warm-dusk-99357.herokuapp.com/api/)

### `Project Demo`

- project deployed to Firebase hosting. Be patient with first page load for heroku backend to get out fo sleeping mode.
  [https://ngibebe.web.app/](demo)
