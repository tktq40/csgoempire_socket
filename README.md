# CSGOEmpire Socket

A simple Node.js example to initialize and interact with CSGOEMPIRE's WebSocket API.

## Getting Started

This guide will help you set up the CSGOEMPIRE socket connection in Node.js.

### Installation

1. **Clone the Repository:**

    ```bash
    git clone git@github.com:tktq40/csgoempire_socket.git
    ```

2. **Install Dependencies:**

    Copy the provided `package.json` into your project directory if you not going to clone it. Then, run the following command to install all required packages:

    ```bash
    npm install
    ```

3. **Install CSGOEMPIRE API Library (only when you don't clone the respository):**

    Use the following command to install the CSGOEMPIRE API library:

    ```bash
    npx api install "@csgoempire/v1.0#5cb1nnhm0htiqmn"
    ```

    > **Note**: The CSGOEMPIRE API library version might change. Please refer to the official [CSGOEmpire API documentation](https://docs.csgoempire.com) for the latest updates.

4. **Run the Socket Example:**

    After everything is set up, run the socket initialization example by executing, remember to add you own empire api key inside the file:

    ```bash
    node web_socket.js
    ```

    This will start the WebSocket connection and interact with CSGOEMPIRE's real-time trade platform.

## API Documentation

For detailed API references, including WebSocket events, request formats, and more, visit the official [CSGOEmpire API documentation](https://docs.csgoempire.com).
