# Tategaki Editor Technology Stack Research
## Research Date: August 2, 2025

This document provides comprehensive research on the best libraries and frameworks for building a Tategaki Editor (vertical Japanese text editor) web application in 2025.

## Executive Summary

Based on extensive research of current best practices and library ecosystems, the recommended technology stack for the Tategaki Editor prioritizes modern development tools, performance, and maintainability while ensuring proper support for vertical Japanese text layout.

## Technology Stack Recommendations

### 1. React Ecosystem
**Library**: React  
**Latest Version**: v19.1.0 (March 2025)  
**Purpose**: Frontend framework foundation  
**Why Chosen**: React 19 introduces significant improvements including Actions for handling async state updates, Server Components, new hooks (useActionState, useFormStatus, useOptimistic), and enhanced TypeScript integration. The framework has excellent stability and community support.

**Key Features in React 19**:
- Actions for simplified async state management
- Enhanced TypeScript types and better type safety
- Improved hydration error reporting
- Native support for metadata, stylesheets, and async scripts
- Better error reporting and ref handling

**Alternatives Considered**: Vue.js, Svelte  
**Notes**: React's mature ecosystem and Lexical's native React support make it the optimal choice for this text editor project.

### 2. Text Editor Framework
**Library**: Lexical  
**Latest Version**: v0.33.1 (July 2025)  
**Purpose**: Extensible text editor framework  
**Why Chosen**: Developed by Meta (Facebook), Lexical provides excellent reliability, accessibility, and performance. It has a plugin-based architecture ideal for custom features like ruby text and vertical text support.

**Key Characteristics**:
- Minimal core with plugin-based feature expansion
- Framework-agnostic with excellent React bindings
- Cross-platform support (web and iOS)
- Extensible architecture for custom node types
- Active development with frequent updates

**Vertical Text Support**: Lexical has some support for CSS `writing-mode: vertical-rl` with recent bug fixes for "correct caret movement in vertical-rl writing mode." Custom plugins may be needed for full vertical text editor functionality.

**Alternatives Considered**: TipTap, Draft.js, Slate  
**Notes**: While Lexical is still pre-1.0, its backing by Meta and active development make it suitable for production use with careful version management.

### 3. Build Tool
**Library**: Vite  
**Latest Version**: Latest stable (continuously updated)  
**Purpose**: Frontend build tool and development server  
**Why Chosen**: Vite offers blazing-fast development with instant server startup, lightning-fast Hot Module Replacement, and native ES modules support. Significantly outperforms Create React App in build times and development experience.

**Performance Benefits**:
- Nearly instant server startup
- Build time improvements (16.1s vs CRA's 28.4s)
- Server start time: 390ms vs CRA's 4.5s
- Native TypeScript and JSX support
- Optimized production builds with Rollup

**Alternatives Considered**: Create React App (deprecated), Next.js  
**Notes**: Create React App is no longer maintained by the React team. Next.js is excellent for SSR/SSG needs but unnecessary for this SPA text editor project.

### 4. TypeScript Configuration
**Setup**: Strict TypeScript configuration  
**Purpose**: Type safety and developer experience  
**Why Chosen**: TypeScript's strict mode enables comprehensive type checking that catches subtle bugs and enforces better code quality.

**Recommended tsconfig.json**:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### 5. CSS and Vertical Text Support
**Approach**: Native CSS with custom utilities  
**Implementation**: CSS `writing-mode: vertical-rl` with custom Tailwind CSS plugin  
**Why Chosen**: Native CSS writing-mode has 84.65% browser support and provides the most reliable vertical text rendering.

**CSS Implementation Strategy**:
- Use CSS `writing-mode: vertical-rl` for right-to-left vertical text
- Combine with `text-orientation` properties as needed
- Apply to `html` element for full Firefox compatibility
- Custom Tailwind CSS plugin for utility classes

**Frameworks Considered**: Tailwind CSS (requires custom plugin for writing-mode)  
**Notes**: Tailwind CSS doesn't include writing-mode utilities by default, but plugins are available or can be created.

### 6. Testing Framework
**Primary**: Vitest  
**Testing Library**: React Testing Library  
**Latest Versions**: Vitest (latest), @testing-library/react (latest)  
**Purpose**: Unit and integration testing  
**Why Chosen**: Vitest offers superior performance over Jest, seamless Vite integration, and includes an interactive UI dashboard.

**Vitest Advantages**:
- Native Vite integration (no complex config needed)
- Faster test execution than Jest
- TypeScript + JSX support without Babel
- Interactive UI dashboard (vitest/ui)
- Jest API compatibility for easy migration

**Required Packages**:
- vitest
- jsdom
- @testing-library/react
- @testing-library/jest-dom
- @testing-library/user-event
- @vitest/coverage-v8

**Alternatives Considered**: Jest (traditional but slower)  
**Notes**: Vitest is emerging as the preferred choice for Vite-based projects in 2025.

### 7. Linting and Formatting
**Recommendation**: Biome.js  
**Latest Version**: Latest stable (monthly releases in 2025)  
**Purpose**: Unified linting and formatting  
**Why Chosen**: Biome combines ESLint and Prettier functionality into a single, faster tool with simplified configuration.

**Biome Advantages**:
- 5x faster than ESLint + Prettier setup
- Single configuration file
- Built-in import organization
- Excellent TypeScript integration
- Active development with monthly releases

**Alternative**: Traditional ESLint + Prettier  
**Migration**: Biome can run alongside ESLint during migration periods  
**Notes**: For teams requiring extensive ESLint plugin ecosystems, traditional setup may still be preferred.

### 8. Japanese Text Processing Libraries
**Primary**: Gem  
**Additional**: kuroshiro, JVFurigana.js  
**Purpose**: Ruby text (furigana) support  
**Why Chosen**: Multiple mature options available for different furigana implementation approaches.

**Library Options**:
- **Gem**: Modern library for furigana with npm support and ES6 imports
- **kuroshiro**: Comprehensive Japanese language library for conversion and furigana
- **JVFurigana.js**: jQuery plugin for furigana with graceful degradation
- **rubyann**: Simplified syntax for ruby annotations

**HTML Implementation**: Use standard HTML `<ruby>`, `<rt>`, and `<rp>` elements  
**Browser Support**: Good modern browser support for ruby elements

## Dependency Versions and Compatibility

### Core Dependencies
```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "lexical": "^0.33.1",
  "@lexical/react": "^0.33.1",
  "typescript": "^5.0.0"
}
```

### Development Dependencies
```json
{
  "vite": "latest",
  "@vitejs/plugin-react": "latest",
  "vitest": "latest",
  "@testing-library/react": "latest",
  "@testing-library/jest-dom": "latest",
  "@biomejs/biome": "latest"
}
```

## Implementation Priorities

### Phase 1: Core Setup
1. Initialize Vite + React + TypeScript project
2. Configure Biome for linting/formatting
3. Set up Vitest testing framework
4. Install and configure Lexical editor

### Phase 2: Vertical Text Foundation
1. Implement CSS writing-mode utilities
2. Create custom Lexical plugins for vertical text
3. Test cursor movement and text selection in vertical mode

### Phase 3: Japanese Text Features
1. Integrate ruby text library (Gem)
2. Implement custom Lexical nodes for furigana
3. Add page break and formatting features

## Risk Assessment

### Low Risk
- React 19 adoption (stable release)
- Vite build tool (mature and widely adopted)
- CSS writing-mode (good browser support)

### Medium Risk
- Lexical pre-1.0 status (mitigated by Meta backing and active development)
- Biome.js adoption (newer tool, but API-compatible with ESLint)

### High Risk
- Custom vertical text implementation complexity
- Lexical plugin development for specialized features

## Conclusion

This technology stack provides a modern, performant foundation for building the Tategaki Editor. The combination of React 19, Lexical, Vite, and supporting tools offers excellent developer experience while maintaining the flexibility needed for specialized vertical text editing features.

The recommended approach balances cutting-edge tools (Biome, Vitest) with proven technologies (React, CSS writing-mode) to create a maintainable and scalable codebase suitable for a specialized Japanese text editor application.

## Next Steps

1. Initialize project with recommended stack
2. Set up development environment with all tools
3. Create proof-of-concept for vertical text editing
4. Implement basic Lexical editor with vertical text support
5. Add Japanese text processing capabilities iteratively

---

*Research conducted on August 2, 2025*  
*All version numbers and recommendations based on latest available information as of research date*