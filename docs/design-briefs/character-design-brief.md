# Design Brief: Main Player Character for «Вечір при блекауті»

**Date:** 2025-01-21  
**Project:** Вечір при блекауті (Evening during blackout)  
**Designer:** [To be assigned]  
**Status:** Ready for design

---

## 1. Goal / Context

We need a main player character for the game «Вечір при блекауті».

**View:** Top-down (from above) inside a small 2D apartment.

**Implementation:** Simple shapes in React + CSS (no complex sprite sheets).

**Design Requirements:**
- Cozy, friendly, modern Ukrainian aesthetic
- Very readable at small sizes
- Easy to "build" using CSS rectangles, circles and basic gradients
- This is the default hero the player controls in the MVP

---

## 2. Style Direction

**Overall game style:** Flat 2D, cozy, slightly cartoony

**Mood:** Warm, calm, domestic evening, not horror

**Character approach:**
- No strong gender/age stereotypes
- Can be slightly gender neutral but still relatable
- Casual home clothes aesthetic

**Keywords:** cozy, soft, rounded, minimal, not overly detailed, warm colors

---

## 3. View & Proportions

### Perspective
- **Strict top-down view** (camera looking from above)

### Proportions (for base "CSS sprite")
- **Target render size:** Around 40–48 px height in game
- Details must still read clearly at that size

### Shape Breakdown
- **Head:** Circle (approx. 40–45% of total height)
- **Body:** Rounded rectangle under head (approx. 55–60% of height)
- **Arms/legs:** Suggested in the silhouette rather than detailed
- **Think:** A simple icon that still clearly reads as "person walking around the room"

---

## 4. Visual Details

### 4.1. Silhouette
- Head + body should form a clear, compact silhouette
- Avoid skinny shapes – better slightly "chibi / compact" proportions
- Rounded corners everywhere (no sharp edges)

### 4.2. Outfit
- Casual home outfit, e.g.:
  - Hoodie + pants, or
  - Oversized sweater + pants
- No logos / brand marks
- Shoes can be optional (e.g. socks / slippers)

### 4.3. Colors (example palette)
Please propose exact colors, but direction is:

- **Body / clothes:** One strong base color so character pops on dark floor
- **Head / skin:** Light neutral tone (but stylized, no need for realistic skin tones)
- **Hair:** Darker blob on top of the head (simplified shape, no strands)
- **Optional:** A small secondary accent (e.g. hoodie strings, small stripe)

**Important:** We want the character to stand out clearly against a dark blue/grey floor.

---

## 5. States & Animations (for design)

We don't need full animation frames, but we do need visual guidance for:

### Idle State
- Character centered, neutral pose
- Slight suggestion how a "breathing" or small bounce animation could look (so Dev can animate with CSS scale/translate)

### Walking
Provide two variants of the character:
- **"Frame A"** and **"Frame B"** for walking

The difference can be just:
- Slight tilt of body
- Small suggestion of legs/feet offset
- Head/body offset by 1–2px

These will be alternated in CSS for a fake walk cycle.

### Interaction Highlight (optional visual hint)
Suggest how the character could look when interacting:
- e.g. slight squat / lean forward, or small glow around the character
- This can be just a concept so Dev can approximate with scale/shadow

### Orientation
- We don't need 8 directions – the game can use a single orientation for MVP (character facing "up" / towards top of screen)
- If you can hint how left/right facing would look, that's a bonus

---

## 6. Technical Constraints

Character will be built as HTML elements styled with CSS:

**Think in terms of:**
- `border-radius`
- Simple gradients
- 1–2 layers (head + body)

**Please avoid:**
- Tiny details we can't reproduce with pure CSS (like micro patterns)
- Complex shadows (simple drop shadow is okay)

**Target "container" for one character:**
- Roughly **48 × 48 px artboard** (can scale, but proportions should work at that size)
- Important shapes should not touch the very edge (some padding)

---

## 7. Reference Context

### Game Background
- Dark apartment setting (dark blues/greys)
- Cozy Ukrainian home atmosphere
- Warm candle light sources
- Simple furniture and objects

### Current Implementation
The character is currently implemented as:
- Simple blue gradient circle with basic features
- Needs visual upgrade to match game's cozy aesthetic

### Gameplay Context
- Character moves around apartment using WASD/arrow keys
- Interacts with events (phone, kettle, cat, candle)
- Must be clearly visible against dark background
- Must read well at small size during fast movement

---

## 8. Deliverables

Please provide:

1. **Design mockup** showing:
   - Idle state (front view, top-down)
   - Walking frame A
   - Walking frame B
   - Optional: Interaction state

2. **Color palette** with exact hex codes:
   - Head/skin color
   - Body/clothing color
   - Hair color
   - Accent color (if any)

3. **Proportions guide:**
   - Head size (px or %)
   - Body size (px or %)
   - Overall dimensions

4. **CSS implementation notes:**
   - Suggested approach for building with CSS
   - Any specific gradients or effects to use

5. **Optional:**
   - Left/right facing variants
   - Animation timing suggestions

---

## 9. Timeline & Priority

**Priority:** High (needed for MVP)  
**Timeline:** [To be discussed with designer]

---

## 10. Questions for Designer

1. What color palette would work best for visibility on dark blue/grey background?
2. How can we make the character feel "Ukrainian cozy" without being too specific?
3. What's the simplest way to suggest movement with just 2 frames?
4. Should we use a hoodie, sweater, or other casual outfit?
5. Any suggestions for making the character feel more "alive" with minimal animation?

---

## Contact

For questions or clarifications, please contact: [Your contact info]

---

**Note:** This character will be the player's avatar throughout the game. It should feel warm, relatable, and fit the cozy evening atmosphere while being simple enough to implement in pure CSS.

