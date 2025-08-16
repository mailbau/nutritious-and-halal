
# Halal Guide App

A comprehensive web application for providing halal food information, education, and management tools.

## Features

- **Public Features:**
  - Homepage with hero section and featured articles
  - About page with team information
  - Education corner with articles and FAQs
  - Halal food ingredients checker
  - Interactive games for learning
  - Contact form and information

- **Admin Features:**
  - Secure admin login system
  - Article management (create, edit, delete)
  - Dashboard with statistics
  - Image upload functionality

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls

### Backend
- Node.js with Express
- PostgreSQL database
- JWT authentication
- Multer for file uploads
- bcryptjs for password hashing

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd halal-guide-app
```

### 2. Install dependencies
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 3. Database Setup

#### Create PostgreSQL Database
```sql
CREATE DATABASE halal_guide;
```

#### Environment Configuration
Create a `.env` file in the backend directory:
```env
# Database Configuration
DB_USER=postgres
DB_HOST=localhost
DB_NAME=halal_guide
DB_PASSWORD=your_password
DB_PORT=5432

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=4000

# File Upload Configuration
MAX_FILE_SIZE=5242880
```

### 4. Database Migration and Seeding

```bash
cd backend

# Run database migrations
npm run db:migrate

# Seed initial data
npm run db:seed
```

This will create:
- Database tables (articles, foods, faqs, admin)
- Admin user (username: `admin`, password: `admin123`)
- Sample articles and data

### 5. Start the Application

#### Start Backend Server
```bash
cd backend
npm run dev
```

The backend will be available at `http://localhost:4000`

#### Start Frontend Development Server
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `GET /api/articles` - Get published articles
- `GET /api/articles/:id` - Get specific article
- `GET /api/foods` - Get foods with filtering
- `GET /api/check` - Check halal status
- `GET /api/faqs` - Get FAQs

### Admin Endpoints (Protected)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/recent-articles` - Recent articles
- `POST /api/articles` - Create article
- `PUT /api/articles/:id` - Update article
- `DELETE /api/articles/:id` - Delete article
- `GET /api/articles/admin/all` - Get all articles (including unpublished)

## Admin Access

### Default Admin Credentials
- **Username:** `admin`
- **Password:** `admin123`

### Admin Routes
- `/admin/login` - Admin login page
- `/admin/dashboard` - Admin dashboard
- `/admin/articles/new` - Create new article
- `/admin/articles/:id/edit` - Edit article

## File Structure

```
halal-guide-app/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── styles/        # CSS styles
│   │   ├── App.tsx        # Main app component
│   │   └── main.tsx       # App entry point
│   ├── public/            # Static assets
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── database/      # Database configuration and migrations
│   │   ├── middleware/    # Authentication middleware
│   │   ├── routes/        # API routes
│   │   └── index.js       # Server entry point
│   ├── uploads/           # Uploaded images
│   ├── data/              # JSON data files
│   └── package.json
└── README.md
```

## Development

### Adding New Articles
1. Login to admin panel at `/admin/login`
2. Navigate to dashboard
3. Click "Add Article" or "Create your first article"
4. Fill in the form with article details
5. Upload an image (optional)
6. Save the article

### Customizing the Application
- **Styling:** Modify Tailwind classes in components
- **Database:** Add new tables in `backend/src/database/migrate.js`
- **API:** Add new routes in `backend/src/routes/`
- **Frontend:** Add new pages in `frontend/src/pages/`

## Security Notes

- Change the default admin password after first login
- Update JWT_SECRET in production
- Configure proper CORS settings for production
- Use environment variables for sensitive data
- Implement proper input validation and sanitization

## Production Deployment

### Backend
1. Set up PostgreSQL database
2. Configure environment variables
3. Run database migrations
4. Start the server with `npm start`

### Frontend
1. Build the application: `npm run build`
2. Serve the built files from a web server
3. Configure API endpoint in environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
