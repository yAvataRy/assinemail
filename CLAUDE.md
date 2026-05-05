# CLAUDE.md - AssineMail (Signature Studio)

## Project Overview

**AssineMail** is a premium email signature generator that enables professionals, companies, and freelancers to create professional, customized email signatures. The application provides real-time preview, multiple templates, QR code generation, and export capabilities.

- **Production URL**: https://assinemail.vercel.app/
- **Framework**: Nuxt 4 + TypeScript
- **UI System**: Tailwind CSS

## Tech Stack

### Core

- **Nuxt** 4 with **TypeScript**
- **Tailwind CSS** 3.4.17 with animations and typography plugins

### UI & Components

- **Radix UI** primitives (40+ components: dialog, dropdown-menu, tooltip, toast, etc.)
- **shadcn/ui** component system (installed via `components.json`)
- **Framer Motion** for animations
- **Lucide React** for icons
- **next-themes** for dark/light mode support

### Form & Validation

- **React Hook Form** with **@hookform/resolvers**
- **Zod** for schema validation

### State & Data

- **TanStack React Query** for server state
- **Vue Router** for client-side routing

### Features & Utilities

- **qrcode** + **html-to-image** for QR code generation and HTML export
- **Recharts** for analytics/charts
- **date-fns** for date formatting
- **cmdk** for command palette
- **embla-carousel-react** for carousels
- **sonner** for toast notifications
- **vaul** for drawer components
- **input-otp** for OTP input

### Testing

- **Vitest** + **@testing-library/vue** for unit tests
- **Playwright** for E2E tests

## Project Structure

```
signature-studio/
├── public/                  # Static assets
│   ├── favicon.ico
│   ├── placeholder.svg
│   └── robots.txt
├── app/
│   ├── components/          # Vue components
│   │   ├── signature/       # Signature-specific (Form, Preview, Templates, Export)
│   │   └── ui/              # shadcn/ui components (50+ Radix-based)
│   ├── pages/               # Route pages (Index, Login, Plans, Profiles, NotFound)
│   ├── templates/           # Signature template definitions
│   ├── stores/              # State management
│   ├── hooks/               # Custom Vue hooks
│   ├── lib/                 # Utility functions
│   ├── types/               # TypeScript type definitions
│   ├── test/                # Test utilities
│   ├── App.vue              # Main app with routing
│   ├── main.ts              # Entry point
│   ├── index.css            # Global styles
│   └── App.css
├── index.html
├── nuxt.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── playwright.config.ts
```

## Key Pages

| Route       | Page     | Description                                                |
| ----------- | -------- | ---------------------------------------------------------- |
| `/`         | Index    | Main signature generator with form, preview, and templates |
| `/login`    | Login    | User authentication                                        |
| `/plans`    | Plans    | Premium upgrade and pricing                                |
| `/profiles` | Profiles | Saved signature profiles management                        |
| `*`         | NotFound | 404 page                                                   |

## Available Scripts

```bash
npm run dev          # Start dev server on http://localhost:5173
npm run build        # Production build (vite build)
npm run build:dev    # Development build
npm run preview      # Preview production build
npm run test         # Run tests (vitest)
npm run test:watch   # Run tests in watch mode
npm run lint         # ESLint checks
```

## Coding Conventions

- **Component Style**: Use functional components with TypeScript interfaces for props
- **Styling**: Tailwind CSS utility classes; use `cn()` from `clsx` + `tailwind-merge` for conditional classes
- **Forms**: Always use React Hook Form with Zod schemas for validation
- **UI Components**: Use shadcn/ui components from `@/components/ui/...`
- **Imports**: Use path aliases (`@/` maps to `src/`)
- **Icons**: Use `lucide-react` icons
- **Routing**: Define routes in `src/App.vue` using Vue Router
- **State**: Use React Query for server state, local state with `useState`/`useReducer`

## Current Features

- [x] Professional signature generation with full personalization
- [x] Multiple signature templates (free + premium)
- [x] Real-time preview while editing
- [x] QR Code generation (WhatsApp, LinkedIn, custom URLs)
- [x] Export to HTML format
- [x] Save and manage signature profiles
- [x] Calendly integration for appointment scheduling
- [x] Premium upgrade modal with plan selection
- [x] Authentication system (login)
- [x] Dark/light theme support
- [x] Responsive design

## Planned Features (Futuras_Features.md)

- Google Workspace (Gmail) integration
- Outlook integration
- Apple Mail integration
- Advanced template customization (colors, fonts, icons)
- Multi-language support (EN, ES, PT)
- Analytics (click tracking on signature links)
- Team/multi-user signature support
- Export to PNG and PDF formats
- CRM integration
- Improved UX with real-time validation feedback

## Important Notes

- Bun lockfile (`bun.lock` and `bun.lockb`) exists alongside `package-lock.json` - project supports both npm and Bun
- ESLint config uses flat config format (`eslint.config.js`)
- Vite config includes `@vitejs/plugin-react-swc` for fast refresh
- Playwright is configured for E2E testing
- `lovable-tagger` is included as dev dependency (Lovable compatibility)
