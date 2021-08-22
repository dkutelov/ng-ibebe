# iBebe Questions

## Description

This project is Stackoverflow alike SPA application but it is themed to babies. It is build with Angular 12.1.

## Functionalities

- unauthenticated users can browse questions and their answer and/or comments
- authenticated users can post questions, answers and comments
- users can register, login and logout

## Project Structure

- user module - handles authentication and user profile
- question module - question list page, create a question
- answer module - list answers on question's page, create answer
- comment module - list and create comment on question or answer
- toaster module - handles success and error notifications
- home module - encapsulates home page components
- core module - contains common components /header, footer, not found, all services, guards and inteceptors/
- shared module - contains all interfaces, pipes as well as components used in various modules like image-gallery, and form-validators

pages:

- '/' - home page
- '/questions' - questions listing page
- '/questions/questionId' - question detail page

## Additional features

- animations - ngIf animate in the navigation of Question module;
- images are uploaded and stored in Cloudinary
