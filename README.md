# AI Image Generator

A full-stack web application that generates images using AI and allows users to share them with the community. Built with React, Node.js, Express, and MongoDB.

## Features

- Generate AI images using Stability AI's API
- Share generated images with the community
- View and search community posts
- Download generated images
- Responsive design for all devices

## Tech Stack

### Frontend
- React.js
- Styled Components
- Axios
- Material UI Icons
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- Cloudinary (for image storage)
- Stability AI API (for image generation)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Cloudinary account
- Stability AI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-image-generator.git
cd ai-image-generator
```

2. Install dependencies for both client and server:
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in the server directory
   - Fill in your environment variables:
     - MongoDB connection string
     - Cloudinary credentials
     - Stability AI API key

4. Start the development servers:
```bash
# Start the backend server (from server directory)
npm run dev

# Start the frontend server (from client directory)
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Environment Variables

Create a `.env` file in the server directory with the following variables:

```env
MONGODB_URL=your_mongodb_connection_string
STABILITY_API_KEY=your_stability_api_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
NODE_ENV=development
```

## API Endpoints

- `POST /api/generateImage` - Generate an AI image
- `GET /api/posts` - Get all community posts
- `POST /api/posts` - Create a new post

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Stability AI](https://stability.ai/) for the image generation API
- [Cloudinary](https://cloudinary.com/) for image storage
- [MongoDB](https://www.mongodb.com/) for the database 