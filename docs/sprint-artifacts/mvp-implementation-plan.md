# MVP Implementation Plan

**Project:** hackathon-game  
**Goal:** Working MVP playable game with core loop, progression, and basic UI  
**Strategy:** Focus on MVP-critical stories first, then add enhancements and polish

---

## MVP Scope Summary

### MVP Core Features (Must Have)

**Foundation (Epic 1)** - ALL stories MVP-critical
- Project setup with React + TypeScript + Vite
- Type definitions for game state, events, progression
- React Context for game state management
- localStorage utilities for persistence
- Game constants and configuration

**Core Gameplay (Epic 2)** - 14 of 16 stories MVP-critical
- ✅ Game loop and state management
- ✅ Apartment layout and background
- ✅ Character movement (WASD/arrow keys)
- ✅ Event spawning system (3-4 event types)
- ✅ Event timers and management
- ✅ Event types (phone, kettle, cat, candle)
- ✅ Event visual indicators
- ✅ Player interaction system
- ✅ «Затишок» meter system
- ✅ Evening timer and win/lose conditions
- ✅ Scoring system
- ✅ Timer and Coziness HUD components
- ⏳ Ukrainian text (can be simplified for MVP)
- ⏳ Visual polish (can be simplified for MVP)

**Progression System (Epic 3)** - 4 of 5 stories MVP-critical
- ✅ XP and level system
- ✅ «Світлячки» currency system
- ✅ Level-up bonuses
- ✅ Shop system (3 items: skin, cosmetic, buff)
- ⏳ Achievement system (at least 1 achievement for MVP)

**User Interface (Epic 4)** - 8 of 14 stories MVP-critical
- ✅ XP and Level HUD display
- ✅ «Світлячки» HUD display
- ✅ Results screen
- ✅ Shop screen
- ✅ Event interaction visual feedback
- ✅ Cosmetic item display
- ✅ Main menu system
- ✅ First-run onboarding (simplified)
- ⏳ Full Ukrainian localization (can be simplified)
- ⏳ Achievements screen (can be simplified)
- ⏳ UI styling polish

**Final Integration (Epic 5)** - 1 of 3 stories MVP-critical
- ✅ Final integration and testing
- ⏳ Visual polish
- ⏳ Accessibility improvements

---

## Story Count by Priority

| Priority | Count | Stories |
|----------|-------|---------|
| **[MVP]** MVP-Critical | **28** | Must implement for working game |
| **[ENH]** Enhancement | **10** | Add after MVP is working |
| **[POL]** Polish | **5** | Nice-to-have improvements |
| **Total** | **43** | All stories |

---

## MVP Implementation Phases

### Phase 1: Foundation (Epic 1) - 5 stories [MVP]
**Goal:** Set up project infrastructure  
**Estimated Time:** Foundation for everything

1. ✅ Project Setup and Initialization
2. ✅ Core Type Definitions
3. ✅ React Context Setup for Game State
4. ✅ localStorage Utilities
5. ✅ Game Constants and Configuration

**Outcome:** Project is set up and ready for game development

---

### Phase 2: Core Gameplay Loop (Epic 2, Part 1) - 12 stories [MVP]
**Goal:** Playable game loop with events and mechanics  
**Estimated Time:** Core gameplay functionality

1. ✅ Game State Management and Game Loop
2. ✅ Apartment Layout and Background
3. ✅ Character Visual and Movement System
4. ✅ Event Spawning System
5. ✅ Event Timer Management
6. ✅ Event Types and Interaction Requirements
7. ✅ Event Icons and Visual Indicators
8. ✅ Event Timer Display
9. ✅ Event Interaction System
10. ✅ «Затишок» Meter System
11. ✅ Evening Timer and Win/Lose Conditions
12. ✅ Scoring System

**Outcome:** Working game loop - player can move, interact with events, play evenings

---

### Phase 3: Core HUD (Epic 2, Part 2) - 2 stories [MVP]
**Goal:** Essential UI components for gameplay  
**Estimated Time:** HUD visibility

1. ✅ Evening Timer HUD Component
2. ✅ «Затишок» Bar HUD Component

**Outcome:** Players can see game state during gameplay

---

### Phase 4: Progression System (Epic 3) - 4 stories [MVP]
**Goal:** XP, levels, currency, and shop  
**Estimated Time:** Progression mechanics

1. ✅ XP and Level System
2. ✅ «Світлячки» Currency System
3. ✅ Level-Up Bonuses
4. ✅ Shop System (3 items minimum)

**Outcome:** Players can earn XP, level up, earn currency, and purchase items

---

### Phase 5: Essential UI Screens (Epic 4, Part 1) - 6 stories [MVP]
**Goal:** Core screens for game navigation  
**Estimated Time:** Essential UI screens

1. ✅ XP and Level HUD Display
2. ✅ «Світлячки» HUD Display
3. ✅ Results Screen
4. ✅ Shop Screen
5. ✅ Event Interaction Visual Feedback
6. ✅ Cosmetic Item Display

**Outcome:** Players can navigate game, see results, use shop, see cosmetics

---

### Phase 6: Navigation and Onboarding (Epic 4, Part 2) - 2 stories [MVP]
**Goal:** Menu and tutorial  
**Estimated Time:** Navigation and onboarding

1. ✅ Main Menu System
2. ✅ First-Run Onboarding Overlay (simplified)

**Outcome:** Players can navigate menus and understand how to play

---

### Phase 7: Final Integration (Epic 5) - 1 story [MVP]
**Goal:** Test and integrate everything  
**Estimated Time:** Integration and testing

1. ✅ Final Integration and Testing

**Outcome:** Working MVP game ready for demo

---

## Additional Features (Post-MVP)

### Enhancement Features [ENH] - 10 stories
Add these after MVP is working and tested:

**Localization Enhancements:**
- 2-15: Ukrainian Text for Core Gameplay
- 4-5: Ukrainian Text for Shop and Results
- 4-10: Ukrainian Text for Achievements
- 4-11: Ukrainian Text for Menu and Navigation
- 4-13: Ukrainian Text for Onboarding

**Feature Enhancements:**
- 3-5: Achievement System (full system with multiple achievements)
- 4-8: Achievements Screen (full UI)
- 5-2: Accessibility and Input Handling

**Other:**
- (Additional enhancements can be added based on feedback)

---

### Polish Features [POL] - 5 stories
Add these last for improved experience:

**Visual Polish:**
- 2-16: Visual Polish for Gameplay
- 4-14: Button and UI Component Styling
- 5-1: Visual Polish for UI Screens

**Other:**
- (Additional polish can be added based on time)

---

## MVP Success Criteria

✅ **Core Functionality:**
- Game is playable end-to-end: start → play evening → earn rewards → spend currency → unlock content
- All core mechanics work: movement, events, «Затишок» meter, progression

✅ **Progression System:**
- Progression system functional: XP, levels, currency, shop
- At least 1-2 real unlocks visible (character skin, cat, or buff)
- XP and «Світлячки» counters clearly visible

✅ **Polish & Stability:**
- No critical bugs that prevent gameplay
- Runs smoothly in latest Chrome
- Smooth controls, readable UI, clear feedback
- Basic Ukrainian language (can be simplified)

✅ **Scope:**
- 1 polished apartment layout
- 4 solid event types working well
- 1 simple shop with functional purchases
- Can be completed within hackathon timeframe

---

## Implementation Strategy

1. **Start with MVP stories** - Focus on [MVP] marked stories first
2. **Build incrementally** - Complete each phase before moving to next
3. **Test frequently** - Test after each phase completion
4. **Add enhancements** - After MVP works, add [ENH] features
5. **Polish last** - Add [POL] features when time allows

---

## Quick Reference

- **Total Stories:** 43
- **MVP Stories:** 28 (65%)
- **Enhancement Stories:** 10 (23%)
- **Polish Stories:** 5 (12%)

**MVP Stories by Epic:**
- Epic 1: 5/5 (100%)
- Epic 2: 14/16 (88%)
- Epic 3: 4/5 (80%)
- Epic 4: 8/14 (57%)
- Epic 5: 1/3 (33%)

---

_This plan helps focus on MVP first, then add additional features incrementally. Use sprint-status.yaml to track progress through implementation phases._

