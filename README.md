# CSA Solution Accelerators Landing Page

A modern, responsive React-based landing page showcasing Microsoft's AI Solution Accelerators. Built with React 18, TypeScript, Vite, and Tailwind CSS, this application provides an intuitive interface for exploring and discovering AI accelerators, solution areas, and implementation resources.

## Features

- **Modern UI/UX**: Clean, professional design using Fluent UI components and Tailwind CSS
- **Deep Linking**: Advanced navigation system with URL synchronization and smooth scrolling
- **Search & Filtering**: Real-time search with multi-category filtering capabilities
- **Responsive Design**: Mobile-first approach with touch-friendly interactions
- **Performance Optimized**: Fast loading with code splitting and lazy loading
- **Accessibility**: WCAG 2.1 AA compliant with keyboard navigation support

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Fluent UI React Components
- **Icons**: Fluent UI React Icons
- **Deployment**: GitHub Pages
- **Data**: Static JSON with dynamic filtering

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/csa-sas-ext-landingpage.git
cd csa-sas-ext-landingpage
```

2. Install dependencies:
```bash
npm install
```

### Development

To run the project locally in development mode:

```bash
npm run dev
```

This will start the development server, typically at `http://localhost:5173`. The page will automatically reload when you make changes to the code.

### Building

To build the project for production:

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Build

To preview the production build locally:

```bash
npm run preview
```

## Live Demo

Access the live version of the application at:
**[https://cuddly-adventure-3j22l89.pages.github.io/](https://cuddly-adventure-3j22l89.pages.github.io/)**

## Project Structure

```
src/
├── components/          # React components
│   ├── Header/         # Navigation and header components
│   ├── HeroSection/    # Main hero section
│   ├── FeaturedSection/ # Featured accelerators showcase
│   ├── DifferentiatorSection/ # Solution differentiators
│   ├── HowItWorksSection/ # Process explanation
│   ├── SuccessStoriesSection/ # Customer success stories
│   ├── Footer/         # Site footer
│   └── shared/         # Reusable component utilities
├── data/               # Static data and generated content
│   ├── cards/          # Individual accelerator JSON files
│   └── generated/      # Build-time generated data
├── hooks/              # Custom React hooks
├── utils/              # Utility functions and helpers
├── types/              # TypeScript type definitions
└── assets/             # Images, icons, and static assets
```

## Key Components

- **GsaCard**: Accelerator card component with hover effects and responsive design
- **Navigation**: Sticky navigation with smooth scrolling and deep linking
- **Search & Filters**: Advanced filtering by categories, solution areas, and technologies
- **Responsive Grid**: Adaptive layout system for different screen sizes

## Development Workflow

1. **Feature Development**: Create feature branches from main
2. **Testing**: Ensure all functionality works across browsers and devices
3. **Code Quality**: Follow TypeScript best practices and component architecture
4. **Performance**: Monitor bundle size and loading performance
5. **Accessibility**: Maintain WCAG compliance standards

## Contributing



For major changes, please open an issue first to discuss the proposed changes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For questions or support, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation in the `/docs` folder

---

**Built with ❤️ by the Microsoft AI Solution Accelerators team**
