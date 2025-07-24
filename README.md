# CampusMap
Purdue Northwest Campus Map Web App

A responsive, interactive campus map application built with React, Leaflet, and Material-UI that provides comprehensive navigation and information services for Purdue University Northwest.

## 🌟 Features

### Core Functionality
- **Interactive Map**: High-resolution campus map with smooth zoom and pan controls
- **Building Information**: Detailed building descriptions, departments, and floor plans
- **Real-time Navigation**: GPS-powered directions to any campus location
- **Smart Search**: Intelligent building and location search with autocomplete

### Campus Services
- **Parking Information**: Live parking capacity data and optimized parking suggestions
- **Emergency Services**: Quick access to emergency service locations and contacts
- **Live Events**: Real-time campus events and activities display
- **Class Locator**: Personal class schedule integration with building locations

### User Experience
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Touch-Friendly**: Mobile-optimized interface with appropriate touch targets
- **Progressive Enhancement**: Works seamlessly across all screen sizes
- **Accessibility**: WCAG-compliant design with keyboard navigation support

## 🏗️ Project Structure

```
CampusMap/
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── store/        # Recoil state management
│   │   ├── utils/        # Utility functions & responsive helpers
│   │   └── utils.js      # Core utilities
│   ├── public/           # Static assets (images, 3D models)
│   └── package.json      # Frontend dependencies
├── server/           # Backend Node.js API
│   ├── routes/           # API route handlers
│   ├── middleware/       # Authentication & validation
│   ├── db/              # Database schemas
│   └── package.json      # Backend dependencies
└── common/           # Shared data and utilities
    ├── buildings.json    # Building information
    ├── parking.json      # Parking data
    ├── emergency.json    # Emergency services
    └── dept.json         # Department locations
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/CampusMap.git
   cd CampusMap
   ```

2. **Start the Backend Server**
   ```bash
   cd server
   npm install
   npm start
   ```
   The server will run on `http://localhost:3001`

3. **Start the Frontend Development Server**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```
   The client will run on `http://localhost:5173`

4. **Access the Application**
   Open your browser and navigate to `http://localhost:5173`

### Environment Configuration
Create a `.env` file in the client directory:
```env
VITE_CENTER_LAT=41.5847635
VITE_CENTER_LNG=-87.4732099
VITE_API_BASE_URL=http://localhost:3001
```

## 📱 Responsive Design Implementation

### 🎯 Responsive Breakpoints

```css
Mobile:     < 768px
Tablet:     768px - 1024px  
Desktop:    > 1024px
```

### 📋 Component-Specific Responsive Features

#### 1. **Responsive Navigation (Navbar)**
- **Desktop (1024px+)**: Traditional horizontal menu with full search bar
- **Mobile (<768px)**: Hamburger menu with drawer navigation
- **Search Enhancement**: 
  - Improved autocomplete with proper touch targets
  - Auto-close search on selection
  - Responsive search input sizing
  - Proper mobile keyboard handling (16px font to prevent zoom)

#### 2. **Adaptive Sideload Component**
- **Desktop**: 30% width sidebar
- **Tablet**: 50% width sidebar  
- **Mobile**: Full-width bottom sheet (50vh height)
- **Responsive Features**:
  - Adaptive image sizing with object-fit
  - Responsive typography scaling
  - Touch-friendly floor plan buttons (44px minimum)
  - Responsive navigation button placement
  - Overflow handling for long content

#### 3. **Mobile-Optimized Filter Controls**
- **Desktop/Tablet**: Traditional checkbox panel
- **Mobile**: Material-UI SpeedDial (floating action button)
- **Features**:
  - Touch-friendly filter selection
  - Improved accessibility
  - Space-efficient mobile layout

#### 4. **Responsive Map Container**
- **Adaptive Zoom Levels**:
  - Mobile: 15x zoom (wider view)
  - Desktop: 16x zoom (detailed view)
- **Responsive Popup Buttons**:
  - Mobile: 44px minimum height (touch-friendly)
  - Desktop: 32px height (mouse-optimized)
  - Responsive font sizing and padding
- **Position-Aware Controls**:
  - Adaptive positioning for 3D and Space Management buttons
  - Mobile-optimized button sizes and labels

#### 5. **Enhanced Modal Components**
- **Responsive Grid Layout**:
  - Small Mobile: 2 columns
  - Mobile: 3 columns  
  - Desktop: 4 columns
- **Adaptive Modal Sizing**:
  - Mobile: 95% viewport width
  - Desktop: Fixed 400px width
- **Touch-Optimized Elements**:
  - Larger buttons on mobile
  - Improved spacing and typography

#### 6. **3D Map Mobile Optimization**
- **Performance Optimizations**:
  - Reduced rotation speed on mobile (battery saving)
  - Disabled hover effects on mobile
  - Adaptive camera positioning and FOV
- **Touch Controls**:
  - Optimized OrbitControls for touch devices
  - Adjusted zoom and distance limits for mobile

### 🎨 Design Principles Applied

1. **Mobile-First Approach**: Built from mobile up, progressively enhancing for larger screens
2. **Touch-Friendly**: Minimum 44px touch targets, appropriate spacing
3. **Performance-Conscious**: Reduced animations and effects on mobile
4. **Accessibility**: Proper focus management, screen reader support
5. **Progressive Enhancement**: Core functionality works on all devices

### 🧪 Testing Recommendations

#### Mobile Testing (320px - 767px):
- iPhone SE, iPhone 12/13/14 series
- Android phones (Samsung Galaxy, Google Pixel)
- Test portrait and landscape orientations

#### Tablet Testing (768px - 1023px):
- iPad, iPad Air, iPad Pro
- Android tablets
- Test both orientations

#### Desktop Testing (1024px+):
- Standard laptop screens (1366x768, 1920x1080)
- Large monitors (2560x1440, 4K)
- Browser zoom levels (90%, 110%, 125%)

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **Material-UI (MUI)**: Google's Material Design components with responsive breakpoints
- **React Leaflet**: Interactive map components with mobile touch support
- **Recoil**: State management for complex app state
- **Vite**: Fast build tool and development server

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **JWT**: JSON Web Token authentication
- **MongoDB**: NoSQL database for user data

### Development Tools
- **ESLint**: Code linting and formatting
- **Vercel**: Deployment and hosting platform

## 🎯 Usage Guide

### Navigation
1. **Search**: Use the search bar to find specific buildings
2. **Filters**: Toggle different map layers (Buildings, Parking, Departments)
3. **3D View**: Click the 3D button for an immersive campus tour
4. **Navigation**: Click any marker to get GPS directions

### Device-Specific Experience

#### Mobile Experience
- **Tap and hold** markers for detailed information
- **Swipe** the bottom sheet to expand building details
- **Use the floating action button** to access filters
- **Pinch to zoom** for detailed map exploration
- **Hamburger menu** for navigation options

#### Tablet Experience
- **Touch-optimized** interface with larger touch targets
- **Balanced layout** with 50% sidebar for building details
- **Adaptive controls** that work well with both touch and mouse

#### Desktop Experience
- **Full sidebar** layout with complete building information
- **Traditional navigation** with horizontal menu
- **Mouse-optimized** controls and hover effects

## 🔧 Configuration

### Map Customization
- Center coordinates in `config.js`
- Map styles in Leaflet configuration
- Responsive breakpoints in `src/utils/responsive.js`

### Responsive Configuration
The application uses a centralized responsive configuration system:

**File: `client/src/utils/responsive.js`**
- Breakpoint definitions and helper functions
- Component-specific responsive settings
- Performance optimization flags
- Touch target specifications

### Data Management
- Building data: `common/buildings.json`
- Parking information: `common/parking.json`
- Emergency services: `common/emergency.json`

## 🚀 Performance Improvements

1. **Lazy Loading**: Images and components load as needed
2. **Efficient Rendering**: Conditional rendering based on screen size
3. **Touch Optimization**: Disabled unnecessary hover effects on mobile
4. **Bundle Optimization**: Responsive utilities separated for better tree-shaking
5. **Mobile Performance**: Reduced animations and optimized touch interactions

## 📋 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+, Samsung Internet 13+
- **Progressive Enhancement**: Basic functionality works on older browsers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices and hooks patterns
- Maintain responsive design principles
- Test on multiple devices and screen sizes
- Ensure accessibility compliance
- Use the centralized responsive utility system

### Responsive Development Guidelines
- Always test on mobile, tablet, and desktop
- Use touch-friendly minimum sizes (44px)
- Implement progressive enhancement
- Consider performance on mobile devices
- Test with real devices when possible

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🆘 Troubleshooting

### Common Issues

**EACCES Permission Errors**
```bash
sudo npm install  # Use with caution
# Or better: fix npm permissions globally
```

**Port Already in Use**
```bash
# Kill process on port 3001 or 5173
lsof -ti:3001 | xargs kill -9
```

**Build Failures**
- Ensure Node.js version compatibility (v16+)
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall dependencies

### Mobile Testing
- Use browser developer tools for responsive testing
- Test on actual devices when possible
- Verify touch interactions work properly
- Check performance on lower-end devices

### Responsive Issues
- Verify viewport meta tag is present
- Check Material-UI breakpoints are being used correctly
- Test with different screen orientations
- Validate touch target sizes meet accessibility standards

## ✅ Validation Checklist

- [x] Mobile navigation works smoothly
- [x] Touch targets are minimum 44px
- [x] Text is readable without zooming
- [x] Images scale appropriately
- [x] Maps are usable on small screens
- [x] Modals fit within viewport
- [x] Performance is acceptable on mobile
- [x] Accessibility standards met
- [x] Cross-browser compatibility verified

## 🔮 Future Enhancements

- **Progressive Web App (PWA)** capabilities
- **Offline map caching** for improved performance
- **Real-time event updates** via WebSocket
- **Augmented Reality (AR)** campus navigation
- **Multi-language support** for international students
- **Advanced Touch Gestures**: Pinch-to-zoom improvements
- **Dynamic Imports**: Further reduce initial bundle size
- **WebP Images**: Optimize image loading for modern browsers
- **Service Worker**: Cache map tiles for offline viewing

---

The Campus Map application now provides an excellent user experience across all devices, from smartphones to desktop computers, with appropriate optimizations for each screen size and interaction method.

For questions or support, please open an issue on GitHub or contact the development team.

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/CampusMap.git
   cd CampusMap
   ```

2. **Start the Backend Server**
   ```bash
   cd server
   npm install
   npm start
   ```
   The server will run on `http://localhost:3001`

3. **Start the Frontend Development Server**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```
   The client will run on `http://localhost:5173`

4. **Access the Application**
   Open your browser and navigate to `http://localhost:5173`

### Environment Configuration
Create a `.env` file in the client directory:
```env
VITE_CENTER_LAT=41.5847635
VITE_CENTER_LNG=-87.4732099
VITE_API_BASE_URL=http://localhost:3001
```

## 📱 Responsive Design

### Desktop (1024px+)
- Full sidebar layout with detailed building information
- Complete filter controls with traditional checkboxes
- Optimized for mouse and keyboard interaction

### Tablet (768px - 1024px)
- Adapted sidebar width (50% of screen)
- Touch-optimized controls
- Simplified navigation elements

### Mobile (< 768px)
- Collapsible bottom sheet for building details
- Speed dial for filter controls
- Mobile-first navigation drawer
- Touch-friendly button sizes (minimum 44px)
- Optimized map zoom levels

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **Material-UI (MUI)**: Google's Material Design components
- **React Leaflet**: Interactive map components
- **Recoil**: State management for complex app state
- **Vite**: Fast build tool and development server

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **JWT**: JSON Web Token authentication
- **MongoDB**: NoSQL database for user data

### Development Tools
- **ESLint**: Code linting and formatting
- **Vercel**: Deployment and hosting platform

## 🎯 Usage Guide

### Navigation
1. **Search**: Use the search bar to find specific buildings
2. **Filters**: Toggle different map layers (Buildings, Parking, Departments)
3. **3D View**: Click the 3D button for an immersive campus tour
4. **Navigation**: Click any marker to get GPS directions

### Mobile Experience
- **Tap and hold** markers for detailed information
- **Swipe** the bottom sheet to expand building details
- **Use the floating action button** to access filters
- **Pinch to zoom** for detailed map exploration

## 🔧 Configuration

### Map Customization
- Center coordinates in `config.js`
- Map styles in Leaflet configuration
- Responsive breakpoints in theme configuration

### Data Management
- Building data: `common/buildings.json`
- Parking information: `common/parking.json`
- Emergency services: `common/emergency.json`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices and hooks patterns
- Maintain responsive design principles
- Test on multiple devices and screen sizes
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## 🆘 Troubleshooting

### Common Issues

**EACCES Permission Errors**
```bash
sudo npm install  # Use with caution
# Or better: fix npm permissions globally
```

**Port Already in Use**
```bash
# Kill process on port 3001 or 5173
lsof -ti:3001 | xargs kill -9
```

**Build Failures**
- Ensure Node.js version compatibility (v16+)
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall dependencies

### Mobile Testing
- Use browser developer tools for responsive testing
- Test on actual devices when possible
- Verify touch interactions work properly

## 🔮 Future Enhancements

- **Progressive Web App (PWA)** capabilities
- **Offline map caching** for improved performance
- **Real-time event updates** via WebSocket
- **Augmented Reality (AR)** campus navigation
- **Multi-language support** for international students

---

For questions or support, please open an issue on GitHub or contact the development team.

