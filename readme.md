# 🎯 CrowdCube Server

A powerful backend API for crowdfunding platform built with Node.js, Express.js, and MongoDB. This server handles campaign management, donations, and provides a robust RESTful API for the CrowdCube crowdfunding application.

## 🚀 Features

- **Campaign Management**: Create, read, update, and delete crowdfunding campaigns
- **Donation Tracking**: Handle donation data and transactions
- **MongoDB Integration**: Secure and scalable database operations
- **RESTful API**: Clean and intuitive API endpoints
- **CORS Enabled**: Cross-origin resource sharing for frontend integration
- **Environment Configuration**: Secure environment variable management

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: MongoDB Native Driver
- **Environment**: dotenv
- **Middleware**: CORS

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn package manager

## ⚡ Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/MostafijurRuman/crowd-cube-server.git
cd crowd-cube-server
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
DB_USER=your_mongodb_username
DB_PASS=your_mongodb_password
PORT=5000
```

### 4. Run the server
```bash
npm start
```

The server will start running on `http://localhost:5000`

## 📚 API Documentation

### Base URL
**Local Development:**
```
http://localhost:5000
```

**Live Server:**
```
https://crowd-cube-server-zeta.vercel.app
```

### 🏆 Campaign Endpoints

#### Get All Campaigns
```http
GET /campaigns
```
**Response**: Array of all campaigns

#### Get Campaign by ID
```http
GET /campaigns/:id
```
**Parameters**: 
- `id` (string): Campaign ObjectId

#### Create New Campaign
```http
POST /campaigns
```
**Body**:
```json
{
    "image": "campaign_image_url",
    "title": "Campaign Title",
    "type": "Campaign Type",
    "description": "Campaign Description",
    "minDonation": 10,
    "deadline": "2024-12-31",
    "goalAmount": 5000,
    "creatorEmail": "creator@example.com",
    "creatorName": "Creator Name",
    "creatorPhoto": "creator_photo_url"
}
```

#### Update Campaign
```http
PUT /campaigns/:id
```
**Parameters**: 
- `id` (string): Campaign ObjectId
**Body**: Same as create campaign

#### Delete Campaign
```http
DELETE /campaigns/:id
```
**Parameters**: 
- `id` (string): Campaign ObjectId

### 💰 Donation Endpoints

#### Get All Donations
```http
GET /donations
```
**Response**: Array of all donations

#### Create New Donation
```http
POST /donations
```
**Body**:
```json
{
    "campaignId": "campaign_object_id",
    "donorName": "Donor Name",
    "donorEmail": "donor@example.com",
    "amount": 100,
    "message": "Optional donation message",
    "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🗄️ Database Schema

### Campaign Collection
```javascript
{
    _id: ObjectId,
    image: String,
    title: String,
    type: String,
    description: String,
    minDonation: Number,
    deadline: String,
    goalAmount: Number,
    creatorEmail: String,
    creatorName: String,
    creatorPhoto: String
}
```

### Donation Collection
```javascript
{
    _id: ObjectId,
    campaignId: String,
    donorName: String,
    donorEmail: String,
    amount: Number,
    message: String,
    timestamp: Date
}
```

## 🔧 Project Structure

```
crowd-cube-server/
├── index.js          # Main server file
├── package.json      # Dependencies and scripts
├── .env             # Environment variables (not tracked)
├── .gitignore       # Git ignore rules
└── README.md        # Project documentation
```

## 🚀 Deployment

✅ **Currently deployed on Vercel:** https://crowd-cube-server-zeta.vercel.app

The application is configured for easy deployment on platforms like:
- **Vercel** (Currently deployed)
- Heroku
- Railway
- DigitalOcean

### Vercel Deployment
This project includes Vercel configuration files:
- `vercel.json` - Deployment configuration
- Environment variables configured in Vercel dashboard

Make sure to set environment variables in your deployment platform.

## 🔒 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DB_USER` | MongoDB Atlas username | Yes |
| `DB_PASS` | MongoDB Atlas password | Yes |
| `PORT` | Server port (default: 5000) | No |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mostafijur Ruman**
- GitHub: [@MostafijurRuman](https://github.com/MostafijurRuman)

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Express.js community for the excellent framework
- All contributors who help improve this project

---

⭐ If you found this project helpful, please give it a star!