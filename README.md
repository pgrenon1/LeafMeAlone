# LeafMeAlone

## Project Overview
LeafMeAlone is a smart plant monitoring and interaction system.

## Input Data

### Environmental Sensors
- **Humidity**
  - Air humidity percentage
  - Soil moisture percentage
- **Water**
  - Water reservoir level
- **Light**
  - Sunshine duration
  - Light intensity
- **Soil Chemistry**
  - pH level
  - NPK nutrient levels
- **Temperature**

### External Data
- **Current Events**
  - Stock market updates
  - Political news
  - Scientific discoveries
  - Miscellaneous news
- **Weather**
  - Precipitation
  - Temperature
  - Weather alerts
  - Cloud cover
  - Air quality
  - Moon phases
- **Images**
  - Webcam photos

## Database
- **MongoDB Atlas** - Cloud-based NoSQL database for storing plant monitoring data

## MongoDB Atlas Setup Instructions

1. **Create a MongoDB Atlas account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
   - Sign up for a free account

2. **Create a new cluster**
   - After logging in, click "Build a Database"
   - Choose the free tier option (M0)
   - Select your preferred cloud provider and region
   - Click "Create Cluster" (this may take a few minutes)

3. **Set up database access**
   - In the left sidebar, click "Database Access" under Security
   - Click "Add New Database User"
   - Create a username and password (store these securely) gwRXBM5bLw36hJrw
   - Set privileges to "Read and Write to Any Database"
   - Click "Add User"

4. **Set up network access**
   - In the left sidebar, click "Network Access" under Security
   - Click "Add IP Address"
   - To allow access from anywhere (not recommended for production), click "Allow Access from Anywhere"
   - For more security, add your specific IP address
   - Click "Confirm"

5. **Get your connection string**
   - In the left sidebar, click "Database" under Deployments
   - Click "Connect" on your cluster
   - Select "Connect your application"
   - Copy the connection string

6. **Configure your application**
   - Create a `.env` file based on the `.env.example` template
   - Replace the placeholder values in the connection string with your actual values:
     - `<username>`: Your database username
     - `<password>`: Your database password
     - `<cluster-address>`: Your cluster address
     - `<database-name>`: Name your database (e.g., "muddy_buddy")

## Using the Database Connection

1. **Install dependencies**
   ```
   npm install
   ```

2. **Run the sample application**
   ```
   npm start
   ```

This will connect to your MongoDB Atlas database, save the template data, and retrieve it to verify the connection works.

## Database Structure

The application uses a MongoDB collection called `plantdata` with a schema that matches the template.json structure. The database functionality is implemented in `plantMonitorDB.js`.

## Output
- LLM with personality (Monday?)
- Speaker for audio feedback
- Printer capabilities

