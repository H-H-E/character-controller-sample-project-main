# R3F Capstone City Hub

A React Three Fiber (R3F) capstone project featuring a city hub with portal-based navigation to multiple interactive building scenes.

## Features

- **City Hub**: Central navigation area with 5 building portals
- **Portal System**: Interactive transitions between scenes
- **Building Scenes**: 
  - Innovation Lab
  - Socialization Sphere  
  - Educational Journey
  - Prom Experience
  - Community Contributor
- **Character Controller**: Smooth WASD movement with physics
- **Mobile Support**: Touch controls for mobile devices

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Controls

- **WASD** - Move character
- **SPACE** - Jump
- **SHIFT** - Sprint
- **Click portals** - Navigate between scenes

## Tech Stack

- React Three Fiber
- React Three Drei
- React Three Rapier (Physics)
- React Three PostProcessing
- Vite
- TypeScript
- Tailwind CSS

## Project Structure

```
src/
├── components/           # Reusable 3D components
├── scenes/              # Individual scene components
├── hooks/               # Custom React hooks
├── contexts/            # React contexts
└── utils/               # Utility functions
```

## License

This project is released under the MIT License. See the LICENSE file for details.

## Acknowledgements

- Built with [React Three Fiber](https://github.com/pmndrs/react-three-fiber)
- Physics by [React Three Rapier](https://github.com/pmndrs/react-three-rapier)
- Post-processing from [React Three Postprocessing](https://github.com/pmndrs/react-postprocessing)