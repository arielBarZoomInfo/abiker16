# Abike16
ng generate module lang-keyb --route lang-keyb --module app.module
ng generate module keyboard --module app.module

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.7
.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# FIREBASE - biker16 users
const firebaseConfig = {
  apiKey: "AIzaSyC6LXDZz3KTnzxBJMye4CjjgOC28HZcjiM",
  authDomain: "biker16-a7653.firebaseapp.com",
  projectId: "biker16-a7653",
  storageBucket: "biker16-a7653.appspot.com",
  messagingSenderId: "1008785288285",
  appId: "1:1008785288285:web:0e13d525f9c5fdd50bf1b4"
};



# FIREBASE - bikebox202 users

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCG2ZvGHgPFgf8xehvTmdscMv0k3HF1M9I",
  authDomain: "bikebox2023.firebaseapp.com",
  projectId: "bikebox2023",
  storageBucket: "bikebox2023.appspot.com",
  messagingSenderId: "128992210775",
  appId: "1:128992210775:web:6f600ca4cc33cf6bfa5812",
  measurementId: "G-S10ZFQCE6S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);