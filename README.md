# Legalmate - Lawyer-Client Communication Platform

Legalmate is a platform designed to facilitate seamless communication between lawyers and clients. The platform allows clients to post legal cases, browse lawyer profiles, and connect with lawyers after payment. Lawyers can find relevant cases, connect with clients post-payment, and manage their profiles. Admins have access to manage all aspects of the platform, including lawyers, clients, cases, reviews, and transaction history.

## Live Link
- [https://grand-centaur-e1b3c6.netlify.app/](#)

## Project Overview

- **Clients:** 
  - Post cases and browse lawyer profiles.
  - Contact lawyers after making a payment.
  - Manage their profiles.

- **Lawyers:** 
  - Find cases posted by clients.
  - Connect with clients after payment.
  - Manage their profiles.

- **Admins:**
  - Manage lawyers, clients, cases, and reviews.
  - Track transaction history.

## Technology Stack

- **Frontend:** React.js, DaisyUI
- **Backend:** Mongoose, Axios, Socket.io, Bcrypt
- **Database:** Firebase
- **Payment Integration:** SSLCommerz

## Features

- **Real-time Communication:** Socket.io is used to enable real-time messaging between clients and lawyers.
- **Profile Management:** Clients and lawyers can manage their profiles, ensuring they keep their information up to date.
- **Payment System:** SSLCommerz integration allows clients to make secure payments to connect with lawyers.
- **Admin Dashboard:** Admins can easily manage and track the platform’s operations through a powerful dashboard.

## Roles

- **Team Lead (Oct 2023 - Dec 2023):** Led the development and integration of key features, ensuring effective communication between the front-end and back-end teams, and overseeing the project’s completion.

## Screenshots

### Client Side
![Client Dashboard](public/Client%20Side.png)

### Lawyer Side
![Lawyer Dashboard](public/Lawyer%20Side.png)

### Admin Side
![Admin Dashboard](public/Admin%20Side.png)

## Installation

### Client Code

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/legalmate-client.git
    ```
2. Install dependencies:
    ```bash
    cd legalmate-client
    npm install
    ```
3. Run the client:
    ```bash
    npm start
    ```

### Server Code

1. Clone the server repository:
    ```bash
    git clone https://github.com/Bakhtiar2000/Legalmate-Server.git
    ```
2. Install dependencies:
    ```bash
    cd legalmate-server
    npm install
    ```
3. Run the server:
    ```bash
    npm start
    ```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.
