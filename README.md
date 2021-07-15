# Interview Scheduler
Interview Scheduler is a single page application (SPA), built using React. Data persists on the API server using a PostgreSQL database. The client side talks with an API server over HTTP, using the JSON format. Both servers run concurrently. Requests are proxied from the Webpack development server to the API server.The whole project has been tested by Jest. 

The tech stacks I have applied are APIs, Express, React, Axios, WebSockets, Storybook, Jest, and Cypress.

## Screenshot
### Main page: display with data fetched with Axios from Postgre database
!["main page"](https://github.com/ysycecilia/scheduler/blob/master/docs/main-page.png?raw=true)

### Book a new appointment which takes in a user's name and an interviewer selected from the list
!["book new"](https://github.com/ysycecilia/scheduler/blob/master/docs/book-new.png?raw=true)

### Fill in info
!["book input"](https://github.com/ysycecilia/scheduler/blob/master/docs/book-input.png?raw=true)

### Save the appointment with updated remaining spots number
!["book save"](https://github.com/ysycecilia/scheduler/blob/master/docs/book-save.png?raw=true)

### Delete an existing appointment with reminder msg
!["delete"](https://github.com/ysycecilia/scheduler/blob/master/docs/delete.png?raw=true)

### Result: appointment deleted and remaining spots number updated 
!["main page"](https://github.com/ysycecilia/scheduler/blob/master/docs/main-page.png?raw=true)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
