# Architecture

## Executive Summary

Вечір при блекауті is built as a browser-based 2D time-management game using React + TypeScript with DOM/CSS rendering. The architecture prioritizes simplicity and performance for a hackathon scope, using React Context for state management, requestAnimationFrame for the game loop, and localStorage for persistence. The system is designed to achieve 60 FPS gameplay with minimal dependencies.

## Project Initialization

First implementation story should execute:

```bash
npm create vite@latest hackathon-game -- --template react-ts
cd hackathon-game
npm install
```

This establishes the base architecture with:
- React 18+ with TypeScript
- Vite build tool and dev server
- Modern ES modules setup
- TypeScript strict mode configuration
- Basic project structure

**Note:** Verify current versions during setup:
- Vite: Latest stable (verify with `npm create vite@latest --help`)
- React: 18+ (provided by template)
- TypeScript: Latest stable (verify during install)

## Decision Summary

| Category | Decision | Version | Affects FR Categories | Rationale |
| -------- | -------- | ------- | --------------------- | --------- |
| Build Tool | Vite | Latest stable | All | Fast dev server, minimal config, modern tooling |
| Framework | React | 18+ | All | Component-based UI, good for game UI |
| Language | TypeScript | Latest stable | All | Type safety, better DX |
| Rendering | DOM + CSS | N/A | Core Gameplay, UI | PRD preference, simpler for hackathon |
| State Management | React Context + hooks | N/A | All | Simple, no extra dependencies, PRD suggests avoiding Redux |
| Game Loop | requestAnimationFrame | Native API | Core Gameplay | Standard for 60 FPS browser games |
| Styling | CSS Modules | N/A | UI | Good organization, scoped styles |
| Persistence | localStorage API | Native API | Data Persistence | PRD requirement, simple implementation |
| Event System | Custom EventManager class | N/A | Event System | Centralized, testable, handles spawning/timers |
| Testing | Vitest | Latest stable | All | Vite-native, fast unit tests |
| TypeScript Config | Strict mode | N/A | All | Better type safety, catches errors early |

## Project Structure

```
hackathon-game/
├── public/
│   └── (static assets: images, sounds if any)
├── src/
│   ├── components/
│   │   ├── game/
│   │   │   ├── GameCanvas.tsx          # Main game container
│   │   │   ├── Character.tsx           # Player character component
│   │   │   ├── EventIndicator.tsx      # Event icons with timers
│   │   │   └── Apartment.tsx           # Apartment layout/background
│   │   ├── ui/
│   │   │   ├── HUD.tsx                 # Top HUD bar (timer, coziness, XP)
│   │   │   ├── CozinessBar.tsx         # «Затишок» meter component
│   │   │   ├── Timer.tsx               # Evening timer display
│   │   │   ├── ResultsScreen.tsx       # End-of-evening results
│   │   │   ├── Shop.tsx                # Shop screen
│   │   │   └── Menu.tsx                # Main menu
│   │   └── common/
│   │       ├── Button.tsx              # Reusable button component
│   │       └── Modal.tsx               # Modal/dialog component
│   ├── core/
│   │   ├── GameLoop.ts                 # Main game loop (requestAnimationFrame)
│   │   ├── EventManager.ts             # Event spawning, timers, priorities
│   │   ├── GameState.ts                # Game state management
│   │   └── ProgressionSystem.ts        # XP, levels, currency, achievements
│   ├── hooks/
│   │   ├── useGameLoop.ts              # Game loop hook
│   │   ├── useGameState.ts             # Game state hook
│   │   └── useLocalStorage.ts          # localStorage persistence hook
│   ├── contexts/
│   │   ├── GameContext.tsx             # Game state context
│   │   └── ProgressionContext.tsx      # Progression state context
│   ├── types/
│   │   ├── game.ts                     # Game state types
│   │   ├── events.ts                   # Event types and definitions
│   │   └── progression.ts              # Progression types (XP, levels, etc.)
│   ├── utils/
│   │   ├── localStorage.ts             # localStorage utilities
│   │   ├── scoring.ts                  # Score calculation utilities
│   │   └── constants.ts               # Game constants (timers, values, etc.)
│   ├── styles/
│   │   ├── globals.css                 # Global styles, CSS variables
│   │   └── (component CSS modules)     # Component-specific styles
│   ├── App.tsx                         # Root component
│   └── main.tsx                        # Entry point
├── package.json
├── tsconfig.json                       # TypeScript config (strict mode)
├── vite.config.ts                      # Vite configuration
└── README.md
```

## FR Category to Architecture Mapping

| FR Category | Architecture Component | Implementation Location |
|------------|------------------------|-------------------------|
| Core Gameplay | Game loop, character movement, interactions | `core/GameLoop.ts`, `core/EventManager.ts`, `components/game/Character.tsx` |
| Progression System | XP, levels, currency, shop, achievements | `core/ProgressionSystem.ts`, `contexts/ProgressionContext.tsx`, `components/ui/Shop.tsx` |
| Event System | Event spawning, timers, priorities, resolution | `core/EventManager.ts`, `types/events.ts`, `components/game/EventIndicator.tsx` |
| User Interface | HUD, menus, results, shop screens | `components/ui/`, `components/common/` |
| Data Persistence | localStorage save/load | `utils/localStorage.ts`, `hooks/useLocalStorage.ts` |
| Technical Functionality | Performance, browser compatibility, input handling | `core/GameLoop.ts`, `hooks/useGameLoop.ts`, event handlers |

## Technology Stack Details

### Core Technologies

**Build Tool:**
- **Vite** (latest stable) - Fast development server, optimized builds
- **Configuration:** `vite.config.ts` with React plugin

**Frontend Framework:**
- **React** (18+) - Component-based UI framework
- **TypeScript** (latest stable, strict mode) - Type safety

**Rendering:**
- **DOM + CSS** - Native browser rendering (no canvas)
- **CSS Modules** - Scoped component styles

**State Management:**
- **React Context API** - Global state (game, progression)
- **useState/useReducer** - Local component state

**Game Loop:**
- **requestAnimationFrame** - Native browser API for 60 FPS

**Persistence:**
- **localStorage API** - Browser native storage
- **Custom TypeScript wrapper** - Type-safe localStorage utilities

**Testing:**
- **Vitest** (latest stable) - Vite-native testing framework

### Integration Points

**Game Loop → Game State:**
- `GameLoop.ts` updates game state via `GameContext`
- State changes trigger React re-renders

**Event Manager → Game Components:**
- `EventManager.ts` manages event lifecycle
- Events rendered via `EventIndicator.tsx` components
- Event resolution updates game state

**Progression System → UI:**
- `ProgressionSystem.ts` calculates XP, levels, currency
- `ProgressionContext.tsx` provides state to UI components
- Shop and results screens consume progression state

**localStorage → State:**
- `useLocalStorage.ts` hook syncs state with localStorage
- Debounced saves (every 2-3 seconds) prevent performance issues
- Load on app initialization

## Novel Pattern Designs

### Game Event System Pattern

**Pattern Name:** Time-Pressured Event Spawning System

**Purpose:** Manages dynamic event spawning with countdown timers, priorities, and simultaneous event handling.

**Components:**
- **EventManager** (`core/EventManager.ts`): Central event lifecycle manager
- **Event Types** (`types/events.ts`): Event definitions (phone, kettle, cat, candle)
- **Event Indicators** (`components/game/EventIndicator.tsx`): Visual representation

**Data Flow:**
1. Game loop calls `EventManager.spawnEvent()` every 3-4 seconds
2. EventManager checks max simultaneous events (based on level)
3. Creates event with timer, priority, location
4. Event added to active events array
5. EventIndicator components render for each active event
6. Timer counts down, updates every frame
7. On resolution: Remove event, update score/coziness
8. On expiration: Remove event, apply penalty

**Implementation Guide:**
```typescript
// EventManager maintains active events array
// Each event has: id, type, priority, location, timer, points, cozinessReward/Penalty
// Game loop checks timers, updates UI
// Character interaction resolves events
// Failed events expire and apply penalties
```

**Affects FR Categories:**
- Event System (FR24-FR31)
- Core Gameplay (FR1-FR10)

**Edge Cases:**
- Max simultaneous events reached → Queue or skip spawn
- Multiple events at same location → Offset visual indicators
- Event expires during interaction → Cancel interaction, apply penalty
- Tab inactive → Pause timers (use Page Visibility API)

## Implementation Patterns

These patterns ensure consistent implementation across all AI agents:

### Naming Conventions

**Components:**
- PascalCase for component files: `GameCanvas.tsx`, `EventIndicator.tsx`
- PascalCase for component names: `GameCanvas`, `EventIndicator`
- Match file name to component name

**Functions:**
- camelCase: `spawnEvent()`, `resolveEvent()`, `calculateXP()`
- Event handlers: `handleEventClick`, `handleKeyPress`

**Types/Interfaces:**
- PascalCase: `GameState`, `EventType`, `ProgressionData`
- Suffix types with descriptive names: `EventType`, `EventPriority`

**Files:**
- Match component name: `GameCanvas.tsx` contains `GameCanvas`
- Utilities: `localStorage.ts`, `scoring.ts`, `constants.ts`

**CSS Modules:**
- Match component: `GameCanvas.module.css` for `GameCanvas.tsx`
- Class names: camelCase: `.eventIndicator`, `.cozinessBar`

### Structure Patterns

**Component Organization:**
- By feature/domain: `components/game/`, `components/ui/`
- Shared components in `components/common/`

**Test Organization:**
- Co-located: `GameLoop.test.ts` next to `GameLoop.ts`
- Test files: `*.test.ts` or `*.spec.ts`

**Utility Organization:**
- Domain-specific utilities in `utils/`
- Constants in `utils/constants.ts`
- Type definitions in `types/`

**Import Organization:**
1. React imports
2. Third-party imports
3. Internal imports (components, hooks, utils)
4. Type imports
5. CSS imports (at end)

### Format Patterns

**TypeScript Types:**
```typescript
// Use interfaces for object shapes
interface GameState {
  coziness: number;
  timeRemaining: number;
  score: number;
}

// Use type aliases for unions/primitives
type EventType = 'phone' | 'kettle' | 'cat' | 'candle';
type EventPriority = 'minor' | 'standard' | 'critical';
```

**Event Data Structure:**
```typescript
interface GameEvent {
  id: string;
  type: EventType;
  priority: EventPriority;
  location: { x: number; y: number };
  timer: number; // seconds remaining
  points: number;
  cozinessReward: number;
  cozinessPenalty: number;
}
```

**localStorage Keys:**
- Prefix with app name: `hackathon-game:level`, `hackathon-game:xp`
- Use kebab-case: `hackathon-game:svitlyachky`, `hackathon-game:purchased-items`

### Communication Patterns

**Context Updates:**
- Use `useContext()` to read state
- Use context provider's update functions to modify state
- Avoid direct state mutations

**Component Props:**
- Explicit prop types (no `any`)
- Optional props with `?`: `onClick?: () => void`
- Use TypeScript interfaces for prop types

**Event Handling:**
- Keyboard: `onKeyDown`, `onKeyUp` handlers
- Mouse: `onClick`, `onMouseEnter` handlers
- Prevent default where needed: `e.preventDefault()`

### Lifecycle Patterns

**Loading States:**
- Use boolean flags: `isLoading`, `isInitializing`
- Show loading UI during initialization
- Handle localStorage load errors gracefully

**Error Recovery:**
- Try-catch around localStorage operations
- Fallback to default values on load failure
- User-friendly error messages (Ukrainian)

**Game Loop Lifecycle:**
- Start: `requestAnimationFrame` in `useEffect`
- Update: Game state updates trigger re-renders
- Cleanup: Cancel animation frame in `useEffect` cleanup

### Location Patterns

**API Routes:**
- N/A (no backend for MVP)

**Static Assets:**
- Images: `public/images/` or `src/assets/images/`
- Sounds (if any): `public/sounds/` or `src/assets/sounds/`

**Config Files:**
- Root level: `vite.config.ts`, `tsconfig.json`, `package.json`
- Environment: `.env.local` (if needed)

### Consistency Patterns

**Date/Time Formatting:**
- Display: Ukrainian locale format (use `toLocaleString('uk-UA')`)
- Storage: ISO strings or timestamps

**Logging:**
- Development: `console.log`, `console.error`
- Production: Minimal logging (errors only)

**User-Facing Errors:**
- Ukrainian language
- Friendly, non-technical messages
- Actionable guidance when possible

## Data Architecture

### State Structure

**Game State:**
```typescript
interface GameState {
  // Current evening state
  coziness: number;           // 0-100
  timeRemaining: number;      // seconds
  score: number;              // points
  activeEvents: GameEvent[];  // currently active events
  
  // Game status
  isPlaying: boolean;
  isPaused: boolean;
  gameOver: boolean;
}
```

**Progression State:**
```typescript
interface ProgressionState {
  level: number;
  xp: number;
  svitlyachky: number;        // «Світлячки» currency
  purchasedItems: string[];  // Item IDs
  equippedItems: {
    characterSkin?: string;
    cat?: string;
    candle?: string;
  };
  achievements: string[];    // Achievement IDs
}
```

**localStorage Schema:**
```typescript
{
  'hackathon-game:level': number;
  'hackathon-game:xp': number;
  'hackathon-game:svitlyachky': number;
  'hackathon-game:purchased-items': string[];
  'hackathon-game:equipped-items': object;
  'hackathon-game:achievements': string[];
}
```

### Data Flow

1. **Game Start:** Load progression from localStorage → Initialize game state
2. **During Gameplay:** Update game state → React re-renders → Update UI
3. **Event Resolution:** Update score/coziness → Check win/lose conditions
4. **Game End:** Calculate rewards → Update progression → Save to localStorage
5. **Shop Purchase:** Update progression → Save to localStorage → Update UI

## API Contracts

**N/A for MVP** - No backend API required. All data stored in localStorage.

**Future API Considerations:**
- If adding online features: REST API with JSON responses
- Error format: `{ error: { message: string, code: string } }`
- Success format: Direct data or `{ data: T }` wrapper

## Security Architecture

**Client-Side Only:**
- No authentication required (single-player game)
- No sensitive data (all game state is local)
- localStorage is domain-scoped (basic security)

**Input Validation:**
- Validate user input in shop (currency checks)
- Sanitize localStorage data on load
- Type checking via TypeScript

**XSS Prevention:**
- React automatically escapes content
- No `dangerouslySetInnerHTML` usage
- Sanitize any user-generated content (if added later)

## Performance Considerations

**Game Loop Optimization:**
- Use `requestAnimationFrame` for smooth 60 FPS
- Batch state updates to minimize re-renders
- Use `React.memo` for expensive components

**Rendering Optimization:**
- CSS transforms for animations (GPU-accelerated)
- Avoid layout thrashing (use `transform` not `top/left`)
- Debounce localStorage writes (every 2-3 seconds)

**Asset Optimization:**
- Optimize images (WebP format if possible)
- Lazy load non-critical assets
- Minimize bundle size (tree-shaking via Vite)

**Memory Management:**
- Clean up event listeners on unmount
- Cancel animation frames on cleanup
- Clear intervals/timeouts

## Deployment Architecture

**Target:** Static hosting (no server required)

**Options:**
- **Vercel** - Easy deployment, automatic builds
- **Netlify** - Similar to Vercel, good for static sites
- **GitHub Pages** - Free, simple hosting
- **Any static host** - Works with Vite build output

**Build Command:**
```bash
npm run build
```

**Output:** `dist/` directory with static files

**Environment:**
- No environment variables needed for MVP
- If adding analytics later: `.env` for API keys

## Development Environment

### Prerequisites

- **Node.js:** 20 LTS (verify: `node --version`)
- **npm:** Comes with Node.js (verify: `npm --version`)
- **Git:** For version control (optional for hackathon)

### Setup Commands

```bash
# Create project
npm create vite@latest hackathon-game -- --template react-ts
cd hackathon-game

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests (when implemented)
npm run test
```

### Development Workflow

1. **Start dev server:** `npm run dev`
2. **Open browser:** Usually `http://localhost:5173`
3. **Make changes:** Hot module replacement (HMR) updates automatically
4. **Test in Chrome:** Primary target browser
5. **Check localStorage:** Use DevTools → Application → Local Storage

### TypeScript Configuration

**tsconfig.json** should include:
- `"strict": true` - Enable strict type checking
- `"target": "ES2020"` - Modern JavaScript features
- `"module": "ESNext"` - ES modules
- `"jsx": "react-jsx"` - React JSX transform

## Architecture Decision Records (ADRs)

### ADR-001: DOM + CSS Rendering

**Decision:** Use DOM + CSS instead of Canvas for rendering.

**Rationale:**
- PRD explicitly prefers DOM + CSS approach
- Simpler implementation for hackathon scope
- React-friendly (components map to DOM elements)
- Sufficient performance for 60 FPS with this game's complexity
- Easier styling and animations with CSS

**Alternatives Considered:**
- Canvas: Better performance but more complex, requires custom rendering
- WebGL: Overkill for 2D game, adds complexity

**Consequences:**
- Easier to implement UI overlays and HUD
- CSS animations available
- May need optimization for many simultaneous elements
- Less control over rendering pipeline

### ADR-002: React Context for State Management

**Decision:** Use React Context API + hooks instead of Redux or Zustand.

**Rationale:**
- PRD suggests avoiding Redux for MVP
- Simple state management needs (game state, progression)
- No extra dependencies
- Sufficient for hackathon scope

**Alternatives Considered:**
- Redux: Overkill, adds complexity
- Zustand: Lightweight but unnecessary dependency

**Consequences:**
- Simple to implement and understand
- May need optimization if state updates frequently
- Context re-renders all consumers (manage with care)

### ADR-003: Custom EventManager Class

**Decision:** Create custom EventManager class for game event system.

**Rationale:**
- Centralized event lifecycle management
- Testable (pure logic, no React dependencies)
- Handles complex spawning/timer logic
- Clear separation of concerns

**Alternatives Considered:**
- React state only: Simpler but less organized
- Third-party library: Unnecessary dependency

**Consequences:**
- Clean architecture, testable
- Requires careful integration with React state
- More code to maintain

### ADR-004: localStorage for Persistence

**Decision:** Use browser localStorage API for data persistence.

**Rationale:**
- PRD requirement (explicitly specified)
- No backend needed for MVP
- Simple implementation
- Works offline

**Alternatives Considered:**
- IndexedDB: More complex, overkill for simple data
- Backend database: Adds complexity, not needed for MVP

**Consequences:**
- Simple, fast implementation
- Limited storage (~5-10MB)
- Client-side only (no sync across devices)
- Data can be cleared by user

### ADR-005: CSS Modules for Styling

**Decision:** Use CSS Modules for component styling.

**Rationale:**
- Scoped styles prevent conflicts
- Good organization (styles co-located with components)
- No runtime overhead (unlike CSS-in-JS)
- Standard approach with Vite

**Alternatives Considered:**
- Styled Components: Runtime overhead, extra dependency
- Plain CSS: Global namespace, potential conflicts

**Consequences:**
- Scoped styles, no conflicts
- Requires import statements
- TypeScript support for class names

---

_Generated by BMAD Decision Architecture Workflow v1.0_
_Date: 2025-11-20_
_For: Vitalii_

