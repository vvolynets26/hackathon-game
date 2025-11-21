# Вечір при блекауті (Evening in Blackout)

A browser-based 2D time-management game built with React + TypeScript + Vite.

## Overview

Вечір при блекауті transforms the familiar Ukrainian experience of an evening without electricity into a fun, cozy, and replayable gaming experience. Players manage an apartment during a blackout, keeping a «Затишок» (coziness) meter from dropping to zero while handling multiple time-pressured tasks.

## Project Status

**Current Phase:** Foundation (Epic 1) - Project Setup ✅

**MVP Progress:** Story 1.1/28 MVP stories completed

## Tech Stack

- **React** 19+ - UI framework
- **TypeScript** - Type safety
- **Vite** 5.4.11 - Build tool and dev server
- **CSS Modules** - Component styling

## Project Structure

```
src/
├── components/      # React components
│   ├── game/       # Game-specific components
│   ├── ui/         # UI components (HUD, screens)
│   └── common/     # Reusable components
├── core/           # Game logic
├── hooks/          # Custom React hooks
├── contexts/       # React Context providers
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── styles/         # CSS files
```

## Getting Started

### Prerequisites

- Node.js 18+ (20+ recommended)
- npm 9+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens dev server at `http://localhost:5173` with HMR enabled.

### Build

```bash
npm run build
```

Produces optimized production build in `dist/` directory.

### Preview

```bash
npm run preview
```

Preview the production build locally.

## MVP Implementation Plan

See `docs/sprint-artifacts/mvp-implementation-plan.md` for detailed implementation phases.

**MVP Stories:** 28 stories to complete working game  
**Current Focus:** Epic 1 - Foundation (5 stories)

## Documentation

- **PRD:** `docs/prd.md` - Product Requirements Document
- **Architecture:** `docs/architecture.md` - System architecture
- **Epics & Stories:** `docs/epics.md` - Epic and story breakdown
- **Sprint Status:** `docs/sprint-artifacts/sprint-status.yaml` - Development progress tracking

## License

MIT
