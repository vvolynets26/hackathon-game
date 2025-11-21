# Story 4.6: Event Interaction Visual Feedback

Status: in-progress

## Story

As a player,
I want clear visual feedback when I resolve or fail events,
So that I understand the impact of my actions immediately.

## Acceptance Criteria

1. **Given** I interact with an event
   **When** I successfully resolve an event
   **Then** visual feedback is shown:
   - Event icon: Briefly pops/scales up and fades out
   - Floating text appears above event location:
     - "+15" (points, in white)
     - "+Затишок" or "+8" (coziness gain, green up arrow or number)
   - Small particle effect: A few sparkles (optional, CSS animation)

2. **Given** an event expires or fails
   **When** the event timer reaches 0
   **Then** visual feedback is shown:
   - Event icon: Shakes slightly and disappears with desaturated red color
   - Brief screen shake: Very small shake effect (CSS transform)
   - «Затишок» bar flashes red for ~200-300ms

3. **Given** visual feedback is displayed
   **When** I observe the feedback
   **Then** the feedback:
   - Appears immediately (within 1-2 frames)
   - Does not obstruct gameplay
   - Uses CSS animations for performance
   - Matches UX design specifications

## Tasks / Subtasks

- [x] Task 1: Create FloatingText component for success feedback (AC: 1, 3)
  - [x] Create `src/components/game/FloatingText.tsx` component
  - [x] Component displays floating text that animates upward and fades out
  - [x] Component accepts props: text, color, position (x, y)
  - [x] Component uses CSS animations (transform: translateY, opacity)
  - [x] Component auto-removes after animation completes
  - [x] Reference UX design "Interaction Feedback" section [Source: docs/ux-design-specification.md]
  - [x] Reference PRD FR29 for visual feedback specifications [Source: docs/prd.md#FR29]

- [x] Task 2: Implement success feedback for resolved events (AC: 1)
  - [x] Modify `useEventInteraction` hook to trigger success feedback
  - [x] When event is resolved, create FloatingText instances:
    - Points text: "+15" (white color, positioned at event location)
    - Coziness text: "+8" or "+Затишок" (green color, positioned slightly offset)
  - [x] Trigger event icon pop/scale animation (CSS animation)
  - [ ] Optional: Add small particle effect (sparkles) using CSS animation (skipped for MVP)
  - [x] Feedback appears immediately (within 1-2 frames)
  - [x] Reference EventIndicator component [Source: src/components/game/EventIndicator.tsx]
  - [x] Reference useEventInteraction hook [Source: src/hooks/useEventInteraction.ts]

- [x] Task 3: Implement event icon success animation (AC: 1, 3)
  - [x] Add CSS animation to EventIndicator for success state
  - [x] Animation: Scale up (1.0 → 1.3) and fade out (opacity 1 → 0)
  - [x] Animation duration: ~300-400ms
  - [x] Animation uses CSS transform and opacity (GPU-accelerated)
  - [x] Animation triggers when event is resolved
  - [x] Update `src/components/game/EventIndicator.module.css` with success animation
  - [x] Reference EventIndicator component [Source: src/components/game/EventIndicator.tsx]

- [x] Task 4: Implement failure feedback for expired events (AC: 2)
  - [x] Modify EventManager or game loop to trigger failure feedback
  - [x] When event expires, trigger:
    - Event icon shake animation (CSS animation)
    - Event icon desaturated red color (CSS filter or color change)
    - Event icon fade out and disappear
  - [x] Trigger screen shake effect (very small, CSS transform on game container)
  - [x] Trigger «Затишок» bar flash red (CSS animation)
  - [x] Reference EventManager [Source: src/core/EventManager.ts]
  - [x] Reference CozinessBar component [Source: src/components/ui/CozinessBar.tsx]

- [x] Task 5: Implement event icon failure animation (AC: 2, 3)
  - [x] Add CSS animation to EventIndicator for failure state
  - [x] Animation: Shake (translateX: -5px → 5px, repeat 3-4 times)
  - [x] Animation: Color change to desaturated red (filter: grayscale + hue-rotate or color change)
  - [x] Animation: Fade out (opacity 1 → 0)
  - [x] Animation duration: ~400-500ms
  - [x] Animation uses CSS transform, filter, and opacity (GPU-accelerated)
  - [x] Update `src/components/game/EventIndicator.module.css` with failure animation
  - [x] Reference EventIndicator component [Source: src/components/game/EventIndicator.tsx]

- [x] Task 6: Implement screen shake effect for failures (AC: 2, 3)
  - [x] Create screen shake utility or hook
  - [x] Shake effect applies to game container (Apartment component or game wrapper)
  - [x] Shake: Very small translateX/translateY oscillation (2-3px max)
  - [x] Shake duration: ~200-300ms
  - [x] Shake uses CSS transform (GPU-accelerated)
  - [x] Shake triggers when event expires
  - [x] Reference Apartment component [Source: src/components/game/Apartment.tsx]
  - [x] Reference UX design "Interaction Feedback" section [Source: docs/ux-design-specification.md]

- [x] Task 7: Implement «Затишок» bar flash red for failures (AC: 2, 3)
  - [x] Add CSS animation to CozinessBar for flash effect
  - [x] Flash: Red overlay or border appears briefly (~200-300ms)
  - [x] Flash uses CSS animation (opacity or box-shadow)
  - [x] Flash triggers when event expires
  - [x] Flash does not obstruct bar visibility
  - [x] Update `src/components/ui/CozinessBar.module.css` with flash animation
  - [x] Reference CozinessBar component [Source: src/components/ui/CozinessBar.tsx]

- [x] Task 8: Integrate visual feedback with event resolution (AC: 1, 2, 3)
  - [x] Modify `useEventInteraction` hook to trigger success feedback
  - [x] Hook calls FloatingText component or animation trigger
  - [x] Hook triggers EventIndicator success animation
  - [x] Feedback appears at event location (from event.location)
  - [x] Feedback uses event data (points, cozinessReward) for text content
  - [x] Reference useEventInteraction hook [Source: src/hooks/useEventInteraction.ts]
  - [x] Reference GameEvent type [Source: src/types/events.ts]

- [x] Task 9: Integrate visual feedback with event expiration (AC: 2, 3)
  - [x] Modify EventManager or game loop to trigger failure feedback
  - [x] When event.timer reaches 0, trigger:
    - EventIndicator failure animation
    - Screen shake effect
    - CozinessBar flash red
  - [x] Failure feedback appears immediately when event expires
  - [x] Reference EventManager [Source: src/core/EventManager.ts]
  - [x] Reference game loop [Source: src/hooks/useGameLoop.ts]

- [x] Task 10: Create FloatingText CSS animations (AC: 1, 3)
  - [x] Create `src/components/game/FloatingText.module.css` stylesheet
  - [x] Implement upward float animation (translateY: 0 → -60px)
  - [x] Implement fade out animation (opacity: 1 → 0)
  - [x] Animation duration: ~800-1000ms
  - [x] Animation uses CSS transform and opacity (GPU-accelerated)
  - [x] Animation timing: ease-out for smooth feel
  - [x] Reference UX design animation specifications [Source: docs/ux-design-specification.md#Micro-Animations-&-States]

- [ ] Task 11: Create particle effect (optional, AC: 1, 3)
  - [ ] Create simple particle/sparkle effect using CSS animations
  - [ ] Particles appear at event location when resolved
  - [ ] Particles: Small dots or sparkles that fade and move outward
  - [ ] Particles use CSS animations (transform, opacity)
  - [ ] Particle count: 3-5 particles (lightweight)
  - [x] Optional: Can be skipped for MVP if time-constrained (skipped for MVP)
  - [x] Reference UX design "Interaction Feedback" section [Source: docs/ux-design-specification.md]

- [ ] Task 12: Testing and validation (AC: 1, 2, 3)
  - [ ] Test success feedback: Resolve event, verify floating text appears
  - [ ] Test success feedback: Verify icon pop/scale animation
  - [ ] Test success feedback: Verify text shows correct points and coziness
  - [ ] Test failure feedback: Let event expire, verify icon shake
  - [ ] Test failure feedback: Verify screen shake effect
  - [ ] Test failure feedback: Verify «Затишок» bar flash red
  - [ ] Test performance: Verify animations are smooth (60 FPS)
  - [ ] Test timing: Verify feedback appears within 1-2 frames
  - [ ] Test non-obstruction: Verify feedback doesn't block gameplay
  - [ ] Test multiple events: Verify feedback works with multiple simultaneous events

## Dev Notes

### Relevant Architecture Patterns and Constraints

**Visual Feedback Architecture:**
- Visual feedback is triggered by event resolution (success) or expiration (failure)
- Success feedback: FloatingText component + EventIndicator animation + optional particles
- Failure feedback: EventIndicator shake + screen shake + CozinessBar flash
- All animations use CSS (transform, opacity, filter) for GPU acceleration
- Feedback appears immediately (within 1-2 frames) for responsive feel

**Event Resolution Flow:**
- Player interacts with event (E key or click)
- `useEventInteraction` hook resolves event via EventManager
- Event resolution updates game state (score, coziness)
- Success feedback triggers: FloatingText + EventIndicator animation
- Event removed from activeEvents array

**Event Expiration Flow:**
- Game loop updates event timers every frame
- When event.timer reaches 0, EventManager marks event as expired
- Event expiration updates game state (coziness penalty)
- Failure feedback triggers: EventIndicator shake + screen shake + CozinessBar flash
- Event removed from activeEvents array

**FloatingText Component:**
- React component that displays floating text above event location
- Props: text (string), color (string), position ({ x, y })
- Uses CSS animations for upward float and fade out
- Auto-removes after animation completes (useEffect cleanup)
- Can be rendered multiple times (one per feedback instance)

**EventIndicator Animations:**
- Success animation: Scale up + fade out (CSS keyframes)
- Failure animation: Shake + color change + fade out (CSS keyframes)
- Animations triggered via CSS class addition/removal
- Animations use transform and opacity (GPU-accelerated)

**Screen Shake Effect:**
- Applies CSS transform to game container (Apartment or game wrapper)
- Very small oscillation (2-3px max) to avoid motion sickness
- Short duration (200-300ms) for quick feedback
- Uses CSS animation or inline style update

**CozinessBar Flash:**
- CSS animation that adds red overlay or border
- Brief duration (200-300ms) for quick feedback
- Does not obstruct bar visibility
- Triggers via CSS class addition/removal

**Performance Considerations:**
- All animations use CSS (not JavaScript) for performance
- GPU-accelerated properties: transform, opacity, filter
- Animations complete quickly (< 500ms) to avoid blocking
- Multiple FloatingText instances can exist simultaneously (lightweight)

### Project Structure Notes

**Alignment with Unified Project Structure:**
- FloatingText component at `src/components/game/FloatingText.tsx` (to be created)
- FloatingText stylesheet at `src/components/game/FloatingText.module.css` (to be created)
- EventIndicator component at `src/components/game/EventIndicator.tsx` (modify for animations)
- EventIndicator stylesheet at `src/components/game/EventIndicator.module.css` (modify for animations)
- CozinessBar component at `src/components/ui/CozinessBar.tsx` (modify for flash)
- CozinessBar stylesheet at `src/components/ui/CozinessBar.module.css` (modify for flash)
- useEventInteraction hook at `src/hooks/useEventInteraction.ts` (modify for feedback triggers)
- EventManager at `src/core/EventManager.ts` (modify for expiration feedback)
- Apartment component at `src/components/game/Apartment.tsx` (modify for screen shake)

**Source Tree Components to Touch:**
- `src/components/game/FloatingText.tsx` - CREATE (new component)
- `src/components/game/FloatingText.module.css` - CREATE (new stylesheet)
- `src/components/game/EventIndicator.tsx` - MODIFY (add animation triggers)
- `src/components/game/EventIndicator.module.css` - MODIFY (add success/failure animations)
- `src/components/ui/CozinessBar.tsx` - MODIFY (add flash trigger)
- `src/components/ui/CozinessBar.module.css` - MODIFY (add flash animation)
- `src/hooks/useEventInteraction.ts` - MODIFY (trigger success feedback)
- `src/core/EventManager.ts` - MODIFY (trigger expiration feedback, if needed)
- `src/components/game/Apartment.tsx` - MODIFY (add screen shake support, if needed)
- `src/hooks/useGameLoop.ts` - MODIFY (trigger expiration feedback, if needed)

**No Conflicts Detected:**
- Visual feedback is new feature, no conflicts with existing components
- EventIndicator already has structure for animations (can add CSS classes)
- CozinessBar already has structure for styling (can add flash animation)
- useEventInteraction already resolves events (can add feedback triggers)
- EventManager already handles expiration (can add feedback triggers)

### Learnings from Previous Stories

**From Story 2-9-event-interaction-system (Status: done)**
- **Event Interaction**: Event interaction system fully implemented [Source: docs/sprint-artifacts/2-9-event-interaction-system.md]
  - `useEventInteraction` hook handles event resolution
  - Event resolution updates score and coziness via GameContext
  - Event resolution removes event from activeEvents array
  - Ready for visual feedback integration

**From Story 2-7-event-icons-and-visual-indicators (Status: done)**
- **Event Indicators**: EventIndicator component displays event icons [Source: src/components/game/EventIndicator.tsx]
  - EventIndicator component renders event icons with priority colors
  - EventIndicator positioned at event locations
  - EventIndicator has CSS module for styling
  - Ready for animation integration

**From Story 2-14-затишок-bar-hud-component (Status: done)**
- **CozinessBar**: CozinessBar component displays «Затишок» meter [Source: src/components/ui/CozinessBar.tsx]
  - CozinessBar reads coziness from GameContext
  - CozinessBar has CSS module for styling
  - CozinessBar displays gradient bar with smooth transitions
  - Ready for flash animation integration

**From Story 2-5-event-timer-management (Status: done)**
- **Event Expiration**: EventManager handles event expiration [Source: src/core/EventManager.ts]
  - EventManager updates event timers every frame
  - EventManager removes expired events from activeEvents
  - Event expiration applies coziness penalties
  - Ready for failure feedback integration

**Implementation Notes:**
- Create FloatingText component for floating text feedback
- Add success/failure animations to EventIndicator CSS
- Add flash animation to CozinessBar CSS
- Integrate feedback triggers in useEventInteraction hook
- Integrate expiration feedback in game loop or EventManager
- Use CSS animations for all visual effects (performance)
- Ensure feedback appears immediately (within 1-2 frames)
- Test with multiple simultaneous events

### References

- [Source: docs/epics.md#Story-4.6] - Story acceptance criteria and technical notes
- [Source: docs/prd.md#FR29] - Visual feedback requirement: "When an event is resolved, the game provides visual feedback (icon animation, floating text showing points and «Затишок» gain)"
- [Source: docs/prd.md#FR30] - Visual feedback requirement: "When an event expires or fails, the game provides visual feedback (icon shake, screen shake, «Затишок» bar flash)"
- [Source: docs/ux-design-specification.md#Interaction-Feedback] - UX design specifications for visual feedback
- [Source: docs/ux-design-specification.md#Micro-Animations-&-States] - Animation specifications
- [Source: docs/architecture.md#Project-Structure] - Project structure and component locations
- [Source: docs/sprint-artifacts/2-9-event-interaction-system.md] - Event interaction system implementation
- [Source: docs/sprint-artifacts/2-7-event-icons-and-visual-indicators.md] - EventIndicator component implementation
- [Source: docs/sprint-artifacts/2-14-затишок-bar-hud-component.md] - CozinessBar component implementation
- [Source: src/hooks/useEventInteraction.ts] - Event interaction hook for feedback triggers
- [Source: src/components/game/EventIndicator.tsx] - EventIndicator component for animations
- [Source: src/components/ui/CozinessBar.tsx] - CozinessBar component for flash animation
- [Source: src/core/EventManager.ts] - EventManager for expiration feedback
- [Source: src/types/events.ts] - GameEvent type definition

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

### Change Log

**2025-01-21 - Story 4.6 Created:**
- Story file created with full acceptance criteria and tasks
- Story marked as "backlog" in sprint-status.yaml
- Ready for story-ready workflow to create implementation context

