# System-Level Test Design

**Date:** 2025-11-20
**Author:** Vitalii
**Status:** Draft
**Project:** hackathon-game
**Phase:** Solutioning (Phase 3)

---

## Executive Summary

This document provides a system-level testability assessment for **Вечір при блекауті**, a browser-based 2D time-management game built with React + TypeScript. The architecture prioritizes simplicity and performance for a hackathon scope, using React Context for state management, requestAnimationFrame for the game loop, and localStorage for persistence.

**Testability Assessment Result:** **PASS with CONCERNS**

The architecture is generally testable with good separation of concerns, but several areas require attention before implementation begins:
- Game loop timing requires careful testability design
- localStorage operations need test isolation strategies
- Performance testing infrastructure needs setup
- Browser-specific behavior requires test environment considerations

---

## Testability Assessment

### Controllability: **PASS**

**Assessment:** The architecture provides good controllability for testing.

**Strengths:**
- ✅ **Pure logic separation**: `EventManager`, `ProgressionSystem`, and utility functions (`scoring.ts`, `constants.ts`) are pure classes/functions that can be tested in isolation without React dependencies
- ✅ **State management**: React Context API allows injecting test state via providers, enabling controlled state scenarios
- ✅ **Event system**: `EventManager` class provides programmatic control over event spawning, timers, and resolution
- ✅ **No external dependencies**: No backend API, database, or external services to mock (localStorage is the only external dependency)
- ✅ **Game loop control**: `requestAnimationFrame` can be mocked or controlled in test environments

**Testability Patterns:**
- Pure functions in `utils/` can be unit tested with standard test frameworks
- `EventManager` class can be instantiated and tested independently
- React components can be tested with React Testing Library
- Game state can be initialized with specific values for test scenarios

**Recommendations:**
- Create test utilities for common game state setups (e.g., `createGameState()`, `createEvent()`)
- Mock `requestAnimationFrame` in unit tests for game loop logic
- Provide test helpers for localStorage operations (mock or in-memory implementation)

### Observability: **PASS with CONCERNS**

**Assessment:** Observability is adequate for most testing needs, but some areas need attention.

**Strengths:**
- ✅ **React DevTools**: Standard React debugging tools available
- ✅ **Browser DevTools**: Full access to localStorage, console, network (minimal), and performance profiling
- ✅ **State visibility**: React Context state is inspectable via DevTools
- ✅ **Visual feedback**: Game state changes are reflected in UI (HUD, event indicators, animations)

**Concerns:**
- ⚠️ **Game loop timing**: `requestAnimationFrame` timing is non-deterministic in tests; need test utilities to control frame timing
- ⚠️ **Performance metrics**: No built-in performance monitoring; need to add performance test infrastructure (FPS measurement, frame time tracking)
- ⚠️ **localStorage validation**: Need test utilities to verify localStorage writes/reads correctly

**NFR Validation:**
- **Performance (NFR1-NFR5)**: Requires custom performance test infrastructure (FPS monitoring, input latency measurement)
- **Browser compatibility (NFR10-NFR12)**: Requires test environment setup for Chrome-specific behavior

**Recommendations:**
- Add performance monitoring utilities for FPS tracking in tests
- Create test helpers for frame timing control (mock `requestAnimationFrame` with controlled timing)
- Add logging utilities for game state transitions (development mode only)

### Reliability: **PASS with CONCERNS**

**Assessment:** Architecture supports test isolation, but some patterns need attention.

**Strengths:**
- ✅ **Stateless components**: Most React components are stateless or use controlled state, enabling parallel test execution
- ✅ **Pure game logic**: Core game logic (`EventManager`, `ProgressionSystem`) is stateless and can run in parallel
- ✅ **localStorage isolation**: Each test can use unique localStorage keys or mock localStorage entirely
- ✅ **No shared state**: No global state that would cause test interference

**Concerns:**
- ⚠️ **Game loop cleanup**: Need to ensure `requestAnimationFrame` is properly cancelled in test cleanup to prevent leaks
- ⚠️ **localStorage cleanup**: Tests must clean up localStorage between runs to prevent state pollution
- ⚠️ **Timer isolation**: Event timers need to be controllable in tests (mock `setTimeout`/`setInterval`)

**Recommendations:**
- Create test setup/teardown utilities for localStorage cleanup
- Ensure all `requestAnimationFrame` calls are cancelled in component cleanup
- Use test utilities to control timers (Vitest's `vi.useFakeTimers()`)

---

## Architecturally Significant Requirements (ASRs)

These quality requirements drive architecture decisions and pose testability challenges:

### ASR-001: 60 FPS Gameplay Performance (NFR1, NFR48)

**Requirement:** Game must maintain 60 FPS during active gameplay (PRD NFR1, NFR48).

**Architecture Impact:**
- Drives use of `requestAnimationFrame` for game loop
- Requires efficient rendering (DOM + CSS, not Canvas)
- Influences state update batching strategy

**Testability Challenge:**
- Need performance test infrastructure to measure FPS
- Frame timing is non-deterministic in tests
- Performance degradation hard to detect without monitoring

**Risk Score:** Probability: 2 (Possible), Impact: 3 (Critical) = **Score 6** (HIGH)

**Mitigation:**
- Add FPS monitoring utility for performance tests
- Create performance test suite that measures frame times
- Set up CI performance regression detection
- **Owner:** Dev team
- **Timeline:** Before Epic 2 (Core Gameplay) implementation

### ASR-002: localStorage Persistence Reliability (NFR13-NFR15)

**Requirement:** Game must reliably save/load player progress via localStorage (PRD NFR13-NFR15, FR43-FR45).

**Architecture Impact:**
- Drives localStorage wrapper utilities (`utils/localStorage.ts`)
- Influences debounced save strategy (every 2-3 seconds)
- Requires data validation on load

**Testability Challenge:**
- localStorage is browser-specific and may behave differently in test environments
- Need to test quota limits, corrupted data, missing data scenarios
- Debounced writes make timing-dependent tests difficult

**Risk Score:** Probability: 2 (Possible), Impact: 2 (Degraded) = **Score 4** (MEDIUM)

**Mitigation:**
- Create localStorage mock/test utilities
- Add data validation tests for corrupted/missing data
- Test quota limit handling
- **Owner:** Dev team
- **Timeline:** Before Epic 1 (Foundation) completion

### ASR-003: Input Responsiveness (NFR3, NFR50)

**Requirement:** Game must respond to input within 16ms (PRD NFR3, NFR50).

**Architecture Impact:**
- Requires efficient event handling
- Influences game loop update frequency
- Drives keyboard/mouse input processing

**Testability Challenge:**
- Input latency is hard to measure in automated tests
- Browser event timing varies
- Need test utilities to simulate and measure input latency

**Risk Score:** Probability: 1 (Unlikely), Impact: 2 (Degraded) = **Score 2** (LOW)

**Mitigation:**
- Add input latency measurement in performance tests
- Test with realistic input patterns
- **Owner:** Dev team
- **Timeline:** During Epic 2 (Core Gameplay) implementation

### ASR-004: Browser Compatibility (NFR10-NFR12)

**Requirement:** Game must work reliably in latest Chrome and handle tab visibility changes (PRD NFR10-NFR12).

**Architecture Impact:**
- Drives use of Page Visibility API for pause/resume
- Influences browser-specific feature usage
- Requires graceful degradation for unsupported features

**Testability Challenge:**
- Need to test in actual Chrome browser (not just headless)
- Tab visibility behavior requires browser automation
- Browser-specific APIs need test coverage

**Risk Score:** Probability: 1 (Unlikely), Impact: 2 (Degraded) = **Score 2** (LOW)

**Mitigation:**
- Use Playwright for E2E tests in Chrome
- Test Page Visibility API behavior
- **Owner:** QA team
- **Timeline:** During Epic 4 (UI/UX) implementation

---

## Test Levels Strategy

Based on architecture analysis, recommended test level distribution:

### Recommended Split: **40% Unit / 30% Component / 30% E2E**

**Rationale:**
- **40% Unit**: High percentage due to pure logic classes (`EventManager`, `ProgressionSystem`, utilities) that are easily unit testable
- **30% Component**: React components need interaction testing, but many are simple presentational components
- **30% E2E**: Critical user journeys (complete evening, shop purchase, progression) require full browser validation

### Unit Tests (40%)

**Target Components:**
- `core/EventManager.ts` - Event spawning, timer logic, priority handling
- `core/ProgressionSystem.ts` - XP calculation, level thresholds, currency rewards
- `utils/scoring.ts` - Score calculation logic
- `utils/constants.ts` - Constant validation
- `utils/localStorage.ts` - Data serialization/deserialization, validation

**Test Framework:** Vitest (Vite-native, fast)

**Example Scenarios:**
- EventManager spawns events at correct intervals
- EventManager handles max simultaneous events based on level
- ProgressionSystem calculates XP correctly (floor(score / 10))
- ProgressionSystem applies level-up bonuses correctly
- localStorage utilities handle corrupted data gracefully

**Estimated Count:** ~50-60 unit tests

### Component Tests (30%)

**Target Components:**
- `components/game/Character.tsx` - Movement, interaction
- `components/game/EventIndicator.tsx` - Timer display, priority colors
- `components/ui/HUD.tsx` - State display, updates
- `components/ui/Shop.tsx` - Purchase flow, currency validation
- `components/ui/ResultsScreen.tsx` - Reward calculation display

**Test Framework:** Vitest + React Testing Library

**Example Scenarios:**
- Character moves correctly with keyboard input
- EventIndicator displays correct timer and priority color
- HUD updates when game state changes
- Shop prevents purchase with insufficient currency
- ResultsScreen displays correct rewards

**Estimated Count:** ~30-40 component tests

### E2E Tests (30%)

**Target Journeys:**
- Complete evening: Start → Play → Win/Lose → View results
- Progression: Complete evening → Earn XP → Level up → See bonuses
- Shop: Earn currency → Purchase item → Equip item → Verify effect
- Persistence: Play → Close browser → Reopen → Verify progress saved

**Test Framework:** Playwright (Chrome-focused)

**Example Scenarios:**
- User completes evening successfully (timer reaches 0)
- User loses evening (Затишок reaches 0)
- User earns XP and levels up
- User purchases and equips shop item
- User progress persists across sessions

**Estimated Count:** ~15-20 E2E tests

---

## NFR Testing Approach

### Performance Testing (NFR1-NFR5)

**Approach:**
- **FPS Monitoring**: Custom utility to measure frame times during gameplay
- **Load Testing**: Simulate maximum simultaneous events (4 events) and measure performance
- **Input Latency**: Measure time from keypress to visual feedback

**Tools:**
- Playwright performance API for frame timing
- Custom FPS monitoring utility
- Browser Performance API for profiling

**Test Scenarios:**
- Game maintains 60 FPS with 4 simultaneous events
- Game maintains 60 FPS during rapid character movement
- Input latency < 16ms (NFR3)
- Game loads within 3 seconds (NFR2)

**Priority:** P0 (blocks core functionality)

### Security Testing (NFR6-NFR9)

**Approach:**
- **Input Validation**: Test localStorage data validation (prevent XSS via corrupted data)
- **XSS Prevention**: Verify React's automatic escaping (no `dangerouslySetInnerHTML`)
- **Data Sanitization**: Test localStorage load with malicious data

**Tools:**
- Playwright for E2E security validation
- Unit tests for data validation logic

**Test Scenarios:**
- localStorage data validation rejects corrupted data
- XSS attempts in localStorage data are escaped
- No sensitive data exposed in console/logs

**Priority:** P1 (important but not blocking for MVP)

**Note:** This is a single-player game with no authentication, so security testing is minimal.

### Reliability Testing (NFR13-NFR15, NFR19)

**Approach:**
- **localStorage Reliability**: Test quota limits, corrupted data, missing data
- **Error Recovery**: Test graceful handling of localStorage failures
- **Game State Recovery**: Test recovery from corrupted game state

**Tools:**
- Vitest for unit tests with localStorage mocks
- Playwright for E2E localStorage scenarios

**Test Scenarios:**
- Game handles localStorage quota exceeded gracefully
- Game recovers from corrupted localStorage data
- Game handles missing localStorage data (first run)
- Game prevents blocking bugs (character stuck, timer stops)

**Priority:** P0 (data loss is critical)

### Browser Compatibility Testing (NFR10-NFR12)

**Approach:**
- **Chrome Testing**: Primary target browser (E2E tests in Chrome)
- **Tab Visibility**: Test pause/resume behavior with Page Visibility API
- **Window Resize**: Test layout handling on window resize

**Tools:**
- Playwright with Chrome browser
- Page Visibility API testing

**Test Scenarios:**
- Game pauses when tab becomes inactive
- Game resumes when tab becomes active
- Game handles window resize without breaking layout

**Priority:** P1 (Chrome is primary target, other browsers nice-to-have)

### Accessibility Testing (NFR6-NFR9)

**Approach:**
- **Keyboard Navigation**: Test keyboard-only navigation (WASD, arrow keys, E for interaction)
- **Visual Indicators**: Test that all interactive elements have clear visual indicators
- **Color Contrast**: Verify sufficient contrast for text/UI elements

**Tools:**
- Playwright accessibility testing
- axe-core for automated accessibility checks

**Test Scenarios:**
- All interactions work with keyboard only
- All interactive elements have visible indicators
- Color contrast meets WCAG AA standards

**Priority:** P1 (accessibility important but not blocking for hackathon MVP)

---

## Test Environment Requirements

### Local Development

**Requirements:**
- Node.js 20 LTS
- npm (comes with Node.js)
- Chrome browser (latest stable)
- Vitest for unit/component tests
- Playwright for E2E tests

**Setup:**
```bash
npm install
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D @playwright/test
npx playwright install chromium
```

### CI/CD Environment

**Requirements:**
- Node.js 20 LTS
- Chrome/Chromium for E2E tests
- Sufficient resources for 60 FPS performance tests

**Test Execution:**
- Unit tests: Fast feedback (< 30 seconds)
- Component tests: Moderate speed (< 2 minutes)
- E2E tests: Slower but critical (< 5 minutes)
- Performance tests: Run on dedicated performance test suite

### Test Data Management

**Factories:**
- `createGameState()` - Create test game state
- `createEvent()` - Create test event
- `createProgressionState()` - Create test progression state

**Fixtures:**
- `gameStateFixture` - Common game state setups
- `localStorageFixture` - localStorage test data
- `eventFixture` - Event test scenarios

**Cleanup:**
- Auto-cleanup localStorage between tests
- Cancel `requestAnimationFrame` in test teardown
- Reset timers between tests

---

## Testability Concerns

### CONCERN-001: Game Loop Timing in Tests

**Issue:** `requestAnimationFrame` timing is non-deterministic in test environments, making game loop logic hard to test.

**Impact:** Medium - May cause flaky tests or incomplete coverage of game loop logic.

**Mitigation:**
- Mock `requestAnimationFrame` in unit tests with controlled timing
- Use Vitest's `vi.useFakeTimers()` for timer-dependent tests
- Create test utilities for frame timing control

**Owner:** Dev team
**Timeline:** Before Epic 2 (Core Gameplay) implementation

### CONCERN-002: Performance Test Infrastructure

**Issue:** No built-in performance monitoring; need custom infrastructure for FPS measurement and performance regression detection.

**Impact:** High - Performance requirements (60 FPS) cannot be validated without test infrastructure.

**Mitigation:**
- Create FPS monitoring utility using Browser Performance API
- Set up performance test suite with baseline measurements
- Integrate performance tests into CI pipeline

**Owner:** Dev team
**Timeline:** Before Epic 2 (Core Gameplay) implementation

### CONCERN-003: localStorage Test Isolation

**Issue:** localStorage is shared across tests, requiring careful cleanup to prevent state pollution.

**Impact:** Medium - May cause test flakiness if cleanup is incomplete.

**Mitigation:**
- Create localStorage mock/test utilities
- Implement auto-cleanup in test setup/teardown
- Use unique keys per test or mock localStorage entirely

**Owner:** Dev team
**Timeline:** Before Epic 1 (Foundation) completion

### CONCERN-004: Browser-Specific Behavior Testing

**Issue:** Some features (Page Visibility API, localStorage quirks) are browser-specific and may behave differently in test environments.

**Impact:** Low - Chrome is primary target, but need to ensure test environment matches production.

**Mitigation:**
- Use Playwright with real Chrome browser (not headless for visibility tests)
- Test Page Visibility API behavior explicitly
- Verify localStorage behavior matches production

**Owner:** QA team
**Timeline:** During Epic 4 (UI/UX) implementation

---

## Recommendations for Sprint 0

### Framework Setup (`*framework` workflow)

**Actions:**
1. Set up Vitest configuration for unit/component tests
2. Set up Playwright configuration for E2E tests
3. Create test utilities directory structure:
   - `tests/utils/game-state.ts` - Game state factories
   - `tests/utils/events.ts` - Event factories
   - `tests/utils/localStorage.ts` - localStorage mocks
   - `tests/utils/performance.ts` - FPS monitoring utilities
4. Create test fixtures for common scenarios
5. Set up test data factories with faker

**Priority:** P0 (required before implementation)

### CI Setup (`*ci` workflow)

**Actions:**
1. Configure CI pipeline with test stages:
   - Unit tests (fast, run on every commit)
   - Component tests (moderate, run on PR)
   - E2E tests (slower, run on PR to main)
   - Performance tests (dedicated suite, run nightly)
2. Set up test result reporting
3. Configure test coverage reporting (target: ≥80% for critical paths)
4. Set up performance regression detection

**Priority:** P0 (required before Epic 2)

### Test Infrastructure Development

**Actions:**
1. Create FPS monitoring utility
2. Create game loop timing control utilities
3. Create localStorage test utilities (mock + cleanup)
4. Create performance test baseline measurements

**Priority:** P0 (required for NFR validation)

---

## Quality Gate Criteria

### Testability Gate (Before Implementation)

**Pass Criteria:**
- ✅ All testability concerns have mitigation plans
- ✅ Test infrastructure utilities created
- ✅ Test framework setup complete
- ✅ Performance test infrastructure ready

**Fail Criteria:**
- ❌ Critical testability concerns (CONCERN-002) unmitigated
- ❌ Test framework not configured
- ❌ No performance monitoring capability

### Implementation Readiness Gate

**Integration with `implementation-readiness` workflow:**
- This testability assessment informs the solutioning gate check
- High-priority risks (ASR-001) must have mitigation plans
- Test infrastructure must be ready before Epic 2 implementation

---

## Risk Summary

| Risk ID | Category | Description | Probability | Impact | Score | Status |
| ------- | -------- | ----------- | ----------- | ------ | ----- | ------ |
| ASR-001 | PERF | 60 FPS performance requirement | 2 | 3 | 6 | HIGH |
| ASR-002 | DATA | localStorage persistence reliability | 2 | 2 | 4 | MEDIUM |
| ASR-003 | PERF | Input responsiveness < 16ms | 1 | 2 | 2 | LOW |
| ASR-004 | OPS | Browser compatibility (Chrome) | 1 | 2 | 2 | LOW |

**High-Priority Risks (≥6):** 1
**Medium-Priority Risks (3-4):** 1
**Low-Priority Risks (1-2):** 2

---

## Next Steps

1. **Review with team**: Present testability assessment and get feedback
2. **Prioritize mitigations**: Focus on ASR-001 (performance) and CONCERN-002 (performance infrastructure)
3. **Set up test infrastructure**: Run `*framework` workflow to set up Vitest and Playwright
4. **Create test utilities**: Develop game state factories, localStorage mocks, and performance monitoring
5. **Proceed to implementation**: Once test infrastructure is ready, proceed with Epic 1 (Foundation)

---

## Related Documents

- **PRD**: `docs/prd.md` - Product requirements and NFRs
- **Architecture**: `docs/architecture.md` - System architecture and design decisions
- **Epics**: `docs/epics.md` - Feature breakdown and implementation plan

---

**Generated by**: BMad TEA Agent - Test Architect Module
**Workflow**: `.bmad/bmm/testarch/test-design`
**Version**: 4.0 (BMad v6)
**Mode**: System-Level (Phase 3 - Testability Review)

