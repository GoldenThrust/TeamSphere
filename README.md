# TeamSphere
> Note: This project is no longer maintained. For the latest updates and a more advanced video chat application, please visit [Sync](https://github.com/GoldenThrust/Sync).
Welcome to TeamSphere, your all-in-one solution for enhancing team collaboration in virtual environments. Whether you're conducting online teaching sessions or organizing important meetings, TeamSphere ensures a smooth and productive experience.

# Installation

### Prerequisites
- Node.js and npm installed
- MongoDB installed and running
- Redis installed and running

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/GoldenThrust/TeamSphere.git
   cd https://github.com/GoldenThrust/TeamSphere.git
   ```
2. **Install nodejs** \
    Visit [Node.js official website](https://nodejs.org/en/download/package-manager/) for installation instructions.
3. **Install Backend Dependencies**:
    ```bash
    cd backend
    npm install
    ```
4. **Setup MongoDB**: \
    Follow the [MongoDB installation documentation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#std-label-install-mdb-community-ubuntu) for installation instructions.
5. **Setup Redis**: \
    Refer to the [Redis installation documentation](https://redis.io/docs/connect/clients/nodejs/) for installation instructions.
6. **Start the Backend Server**:
    ```bash
    npm start
    ```
7. **Install Client Dependencies**:
    ```bash
    cd ../client
    npm install
    ```
8. **Start the Frontend Development Server**:
    ```bash
    npm start
    ```

# Project Structure
## Backend
- **src**: Contains backend source code.
- **config**: Configuration files.
- **controllers**: Request handling logic.
- **middleware**: Middleware functions.
- **models**: Database models.
- **routes**: Route definitions.
- **tests**: Backend tests.
    - **config**: Test configuration files.
    - **controllers**: Controller tests.
    - **middleware**: Middleware tests.
    - **models**: Model tests.
    - **routes**: Route tests.
- **node_modules**: Backend dependencies.

## Client
- **public**: Public assets.
- **src**: Frontend source code.
    - **assets**: Static assets like images, fonts, etc.
    - **components**: Reusable UI components.
    - **context**: React context providers.
    - **features**: Feature modules.
    - **hooks**: Custom React hooks.
    - **pages**: React components representing pages.
    - **services**: API service functions.
    - **styles**: CSS stylesheets.
    - **utils**: Utility functions.
- **node_modules**: Frontend dependencies.

# Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or create a pull request.

# License
The Team Sphere project is licensed under the MIT License, ensuring open-source availability and contributions from the community.
