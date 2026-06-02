# Design

## Foundations

### Color
- Primary: `#FF8400`
- Secondary: `#2DB742`
- Accent / Link: `#1C4583`
- Background: `#FFFFFF`
- Text primary: `#000000`

### Typography
- Primary UI font: Arimo
- Fallbacks: Arial, Helvetica, sans-serif
- Type scale:
  - h1: 30px
  - h2: 21.68px
  - body: 14px

### Spacing and Radius
- Base spacing unit: 4px
- Border radius: 5px

## Components

### Buttons
- Primary button uses primary color surface with dark text.
- Secondary button uses white surface with subtle border.
- Both use medium weight labels and clear hover/focus states.

### Inputs
- Inputs use white surface, dark text, and visible border.
- Focus state uses accent-colored ring.

## Interaction
- Motion style: balanced and functional.
- Keep transitions subtle (around 150-200ms) for state changes only.

## Usage Rules
- Global tokens are defined once in `app/globals.css`.
- All page-level styling should consume tokens through Tailwind classes and theme variables.
- Avoid one-off custom CSS on individual pages unless adding system-level tokens/utilities.
