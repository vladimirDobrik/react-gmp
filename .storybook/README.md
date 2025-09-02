# Storybook Configuration

This project uses Storybook to develop and showcase React components in isolation.

## What is Storybook?

Storybook is a development environment for UI components. It allows you to:
- Browse a component library
- View different states of each component
- Interactively develop and test components
- Create documentation for your components

## Getting Started

### Start Storybook Development Server
```bash
npm run storybook
```
This will start Storybook on `http://localhost:6006`

### Build Storybook for Production
```bash
npm run build-storybook
```
This creates a static build of Storybook that can be deployed.

## Current Stories

### Counter Component (`Counter.stories.tsx`)
The Counter component is fully covered with the following stories:

- **Default** - Basic counter with initial value of 0
- **WithInitialValue** - Counter starting with value 5
- **HighInitialValue** - Counter starting with value 100
- **NegativeInitialValue** - Counter with negative initial value (defaults to 0)
- **States** - Multiple counters showing different states
- **Behavior** - Interactive counter for testing functionality
- **Accessibility** - Counter with accessibility testing
- **Responsive** - Counter viewed on mobile device
- **DarkTheme** - Counter on dark background
- **Performance** - Counter for performance testing

## Story Structure

Each story includes:
- **Args** - Props that can be modified in the Controls panel
- **Parameters** - Configuration for the story (layout, docs, etc.)
- **Documentation** - Descriptions and usage examples
- **Interactive Controls** - Live editing of component props

## Features

- **Auto-documentation** - Component documentation is automatically generated
- **Interactive Controls** - Modify component props in real-time
- **Responsive Testing** - Test components at different viewport sizes
- **Accessibility Testing** - Built-in accessibility checks
- **Dark/Light Themes** - Test components in different color schemes
- **Performance Monitoring** - Track component performance metrics

## Configuration Files

- **`.storybook/main.ts`** - Main Storybook configuration
- **`.storybook/preview.ts`** - Global story parameters and decorators
- **`.storybook/tsconfig.json`** - TypeScript configuration for Storybook

## Adding New Stories

1. Create a new `.stories.tsx` file in your component directory
2. Import your component and create stories using the Story type
3. Export the meta object and individual stories
4. Use the `autodocs` tag for automatic documentation generation

## Best Practices

1. **Use descriptive story names** that explain what the story demonstrates
2. **Include multiple states** to show component variations
3. **Add documentation** explaining component usage and behavior
4. **Test edge cases** and boundary conditions
5. **Use controls** to make stories interactive
6. **Group related stories** using the title structure
