# twitter-bot-automation


This project aims to automate interactions on Twitter, such as liking tweets, retweeting, and replying to tweets. It uses Node.js, Express, MongoDB, and the Twitter API to perform these actions through predefined tasks.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Example Requests](#example-requests)
- [Error Handling](#error-handling)
- [License](#license)

## Project Overview

The Twitter Bot Automation system allows for the creation, management, and execution of automated Twitter tasks, including liking tweets, retweeting, and replying to tweets. These tasks can be scheduled and executed using multiple Twitter accounts.

## Features

- **Task Management**: Create, read, update, and delete Twitter tasks.
- **Account Management**: Store and manage multiple Twitter accounts.
- **Automated Actions**: Execute tasks to like, retweet, and reply to tweets.
- **Logging**: Detailed logs for task execution results.

## Requirements

- Node.js (v20.14.0 or later)
- MongoDB
- Twitter Developer Account

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/twitter-bot-automation.git
    cd twitter-bot-automation
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add the following:

    ```env
    TWITTER_CONSUMER_KEY=your_consumer_key
    TWITTER_CONSUMER_SECRET=your_consumer_secret
    TWITTER_ACCESS_TOKEN_KEY=your_access_token_key
    TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret
    MONGO_URI=mongodb://localhost:27017/twitter-bot
    PORT=3000
    ```

4. **Start MongoDB**:
    Ensure MongoDB is running on your local machine or change the `MONGO_URI` to point to your MongoDB instance.

5. **Run the server**:
    ```bash
    node server.js
    ```

## Usage

- **Access the API**: Once the server is running, you can access the API at `http://localhost:3000`.
- **Use Postman**: Use Postman or any other API client to interact with the endpoints.

## API Endpoints

### Task Endpoints

- **GET /tasks**: Retrieve all tasks.
- **POST /tasks**: Create a new task.
    - Body parameters: `tweetId`, `action`, `message` (optional for 'reply').
- **PUT /tasks/:id**: Update an existing task.
    - Body parameters: `tweetId`, `action`, `message` (optional for 'reply').
- **DELETE /tasks/:id**: Delete a task by ID.

### Account Endpoints

- **GET /accounts**: Retrieve all Twitter accounts.
- **POST /accounts**: Register a new Twitter account.
    - Body parameters: `username`, `password`.
- **PUT /accounts/:id**: Update an existing account.
    - Body parameters: `username`, `password`.
- **DELETE /accounts/:id**: Delete an account by ID.

### Execution Endpoints

- **POST /twitter/execute**: Execute all tasks.
- **POST /twitter/execute/:id**: Execute a single task by task ID.

## Example Requests

### Retrieve All Tasks

- **Request**: 
    ```http
    GET /tasks
    ```
- **Response**:
    ```json
    [
      {
        "_id": "66897524b9b882720523d145",
        "tweetId": "123456789",
        "action": "like",
        "message": null
      },
      {
        "_id": "66897542b9b882720523d148",
        "tweetId": "987654321",
        "action": "retweet",
        "message": null
      }
    ]
    ```

### Create a New Task

- **Request**:
    ```http
    POST /tasks
    Content-Type: application/json

    {
      "tweetId": "987654321",
      "action": "like"
    }
    ```
- **Response**:
    ```json
    {
      "_id": "66897542b9b882720523d148",
      "tweetId": "987654321",
      "action": "like",
      "message": null
    }
    ```

### Execute All Tasks

- **Request**:
    ```http
    POST /twitter/execute
    ```
- **Response**:
    ```json
    {
      "message": "All tasks executed successfully."
    }
    ```

### Execute a Single Task

- **Request**:
    ```http
    POST /twitter/execute/66897542b9b882720523d148
    ```
- **Response**:
    ```json
    {
      "message": "Task executed successfully."
    }
    ```

## Error Handling

- **400 Bad Request**: Indicates invalid input or missing parameters.
- **401 Unauthorized**: Indicates invalid or missing authentication credentials.
- **404 Not Found**: Indicates the requested resource was not found.
- **500 Internal Server Error**: Indicates a server-side error during task execution or other operations.

