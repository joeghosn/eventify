# Eventify: Your Ultimate Event Management System

Eventify is a robust event management system that caters to both event planners and enthusiasts. Leveraging cutting-edge technologies, Eventify delivers a seamless experience for showcasing upcoming events and discovering exciting gatherings.

## Key Technologies Used

- **Node.js & Express.js:** Utilizing the speed and flexibility of Node.js for server-side development.
- **MySQL:** A powerful relational database ensuring efficient data storage and retrieval.
- **Sequelize:** An ORM (Object-Relational Mapping) simplifying database interactions and management.
- **Express Validator:** Ensuring data integrity through robust validation practices.
- **[Additional Advanced Technologies]:** [Feel free to mention any other technologies or frameworks you've incorporated.]

Explore the world of events with Eventify — where planning and discovering events becomes an effortless and enjoyable experience!

## Eventify API Usage

You can interact with the Eventify API to access its features:

<details>
  <summary><b>Authentication</b></summary>

- **Sign In:** `/api/v1/auth/sign-in`
- **Sign Up:** `/api/v1/auth/sign-up`

[Include any additional details or instructions related to the authentication process, such as required parameters, response formats, or usage guidelines.]

</details>

<details>
  <summary><b>Events</b></summary>

- **Create Event:** `/api/v1/events` (POST)
- **Update Event:** `/api/v1/events/:id` (PUT)
- **Get All Events:** `/api/v1/events` (GET)
- **Get Event by ID:** `/api/v1/events/:id` (GET)
- **Update Event Status:** `/api/v1/events/:id/status` (PUT)
- **Delete Event:** `/api/v1/events/:id` (DELETE)
</details>

<details>
  <summary><b>Event Booking</b></summary>

- **Book Event:** `/api/v1/bookings/:id/` (POST)
- **Unbook Event:** `/api/v1/bookings/:id/` (DELETE)
- **Get All Booked Events:** `/api/v1/bookings` (GET)
</details>

<details>
  <summary><b>Event Favorites</b></summary>

- **Favorite Event:** `/api/v1/favorites/:id` (POST)
- **Unfavorite Event:** `/api/v1/favorites/:id/` (DELETE)
- **Get All Favorites:** `/api/v1/favorites` (GET)
</details>

## Getting Started

To download and run the Eventify project on your local machine, follow these steps:

<details>
  <summary><b>Prerequisites</b></summary>

- Node.js and npm installed on your machine.
- MySQL installed and running.
</details>

<details>
  <summary><b>Installation</b></summary>

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/joe-ghosn/eventify.git
   ```

2. Navigate to the project directory:

   ```bash
   cd eventify
   ```

3. Install the project dependencies:
`bash
     npm install
     `
</details>

<details>
  <summary><b>Configuration</b></summary>

1. Create a `.env` file in the project root and configure your MySQL database connection:
`env
     MYSQL_DATABASE=your_database_name
     MYSQL_USER=your_database_user
     MYSQL_PASSWORD=your_database_password
     MYSQL_HOST=your_database_host
     MYSQL_DIALECT=mysql
     PORT=your_database_port
     `
</details>

<details>
  <summary><b>Database Setup</b></summary>

1. Create the necessary database tables by running Sequelize migrations:

   ```bash
   npx sequelize-cli db:migrate
   ```

2. Optionally, seed the database with initial data (if seeders are available):
`bash
     npx sequelize-cli db:seed:all
     `
</details>

<details>
  <summary><b>Running the Server</b></summary>

1. Start the server:

   ```bash
   npm start
   ```

2. The server will be running at `http://localhost:3000`.
</details>

Now you have Eventify up and running locally! Feel free to explore, use, or modify the project according to your specific needs.

Happy coding!
