# 🩸 AeroAid - Aviation Blood Donation Network

> **Making a life-saving difference in the aviation community of Bangladesh**

AeroAid is a specialized blood donation platform that connects aviation students and airline professionals across Bangladesh. Our mission is to ensure that no one in our aviation community is left in need during medical emergencies.


## 🎯 Project Overview

AeroAid serves as a comprehensive blood donation network specifically designed for:
- **Aviation Students** from various training institutes
- **Airline Professionals** working in the aviation industry
- **Community Members** supporting the aviation sector

The platform facilitates quick and efficient blood donor searches, helping save lives within our tight-knit aviation community in Dhaka and beyond.

## ✨ Key Features

### 🔍 **Smart Donor Search**
- Search donors by blood group
- Filter by geographical area for quick local matches
- Real-time availability status

### 👤 **User Management**
- Secure user authentication and registration
- Comprehensive donor profiles with contact information
- Profile picture upload and management
- Personal donation history tracking

### 🛡️ **Protected Dashboard**
- Personalized user dashboard
- Donation request management
- Invitation system for new donors
- Account settings and preferences

### 📱 **Modern Interface**
- Responsive design for all devices
- Dark theme with aviation-inspired aesthetics
- Intuitive user experience
- Fast loading and smooth navigation

## 🛠️ Tech Stack

### **Frontend**
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Hook Form** - Form management
- **Zustand** - State management
- **Lucide React** - Icon library

### **Backend & Database**
- **Supabase** - Backend-as-a-Service
- **PostgreSQL** - Database
- **Row Level Security** - Data protection
- **Real-time subscriptions** - Live updates

### **Additional Tools**
- **TanStack Query** - Data fetching and caching
- **Zod** - Schema validation
- **Image Compression** - Optimized file uploads
- **Upstash Redis** - Caching layer

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/aeroaid.git
   cd aeroaid
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   UPSTASH_REDIS_REST_URL=your_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_redis_token
   ```

4. **Database Setup**
   - Set up your Supabase project
   - Run the provided SQL migrations
   - Configure Row Level Security policies

5. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth-pages)/      # Authentication pages
│   ├── (protected-pages)/ # Protected user areas
│   ├── api/               # API routes
│   └── search/            # Donor search functionality
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configurations
│   ├── supabase/         # Database queries and client
│   ├── stores/           # State management
│   └── utils/            # Helper functions
├── types/                 # TypeScript type definitions
└── data/                  # Static data and constants
```

## 🧩 Component Architecture

### **Core Components**

#### **🏠 Layout & Navigation**
- **`Navbar.tsx`** - Main navigation bar with blood group search functionality and user menu
- **`MenuDropdown.tsx`** - User menu dropdown with authentication status and navigation links

#### **👤 User Interface Components**
- **`DonorCard.tsx`** - Displays donor information cards with profile picture, blood group, location, and availability status
- **`RequestCard.tsx`** - Shows blood donation requests with patient details, hospital info, and donor information
- **`HistoryCard.tsx`** - Displays donation history records with patient and hospital details

#### **📝 Form Components**
- **`InputField.tsx`** - Reusable input field component with validation styling
- **`SelectField.tsx`** - Dropdown selection component for blood groups and other options
- **`AreaDropdown.tsx`** - Specialized dropdown for geographical area selection
- **`ImageUpload.tsx`** - Profile picture upload component with image compression and preview

#### **🔐 Authentication Components**
- **`auth/login-form.tsx`** - User login form with email/password authentication
- **`auth/register-form.tsx`** - User registration form with profile setup
- **`auth/password-reset-form.tsx`** - Password reset functionality

#### **🎨 UI Enhancement Components**
- **`HighlightedText.tsx`** - Text highlighting component for search results
- **`LoadingSpinner.tsx`** - Loading animation component
- **`MechanicalDate.tsx`** - Stylized date display component
- **`MechanicalFont.tsx`** - Custom font styling component

#### **📦 UI Library Components (`ui/` directory)**
- **`button.tsx`** - Reusable button component with variants
- **`card.tsx`** - Card layout components for content organization
- **`dropdown-menu.tsx`** - Advanced dropdown menu functionality
- **`input.tsx`** - Base input component
- **`label.tsx`** - Form label component
- **`toast.tsx`** - Notification toast component
- **`toaster.tsx`** - Toast notification manager

### **Component Responsibilities**

#### **Data Display**
- `DonorCard` - Shows donor profiles in search results
- `RequestCard` - Displays active blood requests
- `HistoryCard` - Shows past donation records

#### **User Interaction**
- `Navbar` - Primary navigation and search interface
- `MenuDropdown` - User account management
- Form components - Data input and validation

#### **Authentication Flow**
- Login/Register forms handle user authentication
- Protected route components ensure security
- Profile management through various form components

## 🔐 Authentication & Security

- **Secure Authentication** via Supabase Auth
- **Row Level Security** protecting user data
- **Protected Routes** for authenticated users only
- **Input Validation** using Zod schemas
- **Image Upload Security** with compression and validation

## 🌟 Core Functionality

### For Donors
- **Register** as a blood donor
- **Update** availability status
- **Manage** personal information
- **Track** donation history

### For Recipients
- **Search** for compatible donors
- **Contact** donors directly
- **Create** donation requests
- **Manage** request history

### For Administrators
- **Monitor** platform activity
- **Manage** user accounts
- **Oversee** donation requests
- **Generate** reports

## 🤝 Contributing

We welcome contributions from the aviation community! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📋 Development Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint

# Database
pnpm db:generate  # Generate database types
pnpm db:push      # Push schema changes
```

## 🐛 Known Issues & Roadmap

### Current Issues
- Mobile optimization for team section
- Avatar placeholder images need updating

### Upcoming Features
- [ ] SMS notifications for urgent requests
- [ ] Blood bank integration
- [ ] Mobile app development
- [ ] Multi-language support (Bengali/English)
- [ ] Advanced analytics dashboard




Made with ❤️  by **[Youth Notion](https://youthnotion.org/)** - Empowering Youth Through Civic Awareness and Technology


---
