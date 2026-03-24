# CrafterCMS Next.js Blueprint

This project is a migration of the official [CrafterCMS Next.js Blueprint](https://github.com/craftercms/nextjs-blueprint/tree/master/app) to an updated Next.js code.

## Migration Improvements

- Upgraded to **Next.js 16** with App Router and Server-Side Rendering (SSR)
- Upgraded to **React 19** with React Compiler
- Fully rewritten in **TypeScript**
- Added **Tailwind CSS v4**
- Added **T3 Env** for type-safe environment variables
- Added dynamic sitemap generation (`sitemap.ts`)
- Multiple code and performance improvements

## Code Quality Tools

This blueprint uses automated code quality tools to maintain consistency:

- **vite-plus**: Unified toolchain that bundles linting, formatting and testing:
    - **oxlint**: Rust-based linter (replaces ESLint)
    - **oxfmt**: Rust-based code formatter (replaces Prettier)
    - **Vitest**: Unit testing
- **Knip**: Detects unused files, exports, and dependencies
- **TypeScript**: Provides type safety
- **Husky**: Runs pre-commit hooks automatically
- **SonarQube Cloud**: Continuous code analysis for bugs, vulnerabilities, and code smells

## Getting Started

### 1. Install CrafterCMS

Download and install CrafterCMS from https://craftercms.com/download

> **Note:** You only need the Authoring module to get started.

### 2. Create a new Studio project

In CrafterCMS Studio create a new project and select the **Next.js Blueprint** from the public marketplace.

### 3. Clone this repository

### 4. Install dependencies with pnpm

```bash
pnpm install
```

### 5. Environment Variables

The project includes an example environment file: `.env.example.`

Create your own `.env` file by copying the example file:

```bash
cp .env.example .env
```

Then update the values accordingly:

**NEXT_PUBLIC_HOST**  
The URL of your Next.js application (default: `http://localhost:3000`)

**NEXT_PUBLIC_CRAFTERCMS_AUTHORING_HOST_NAME**  
The URL of your CrafterCMS Authoring instance (default: `http://localhost:8080`)

**NEXT_PUBLIC_CRAFTERCMS_DELIVERY_HOST_NAME**  
The URL of your CrafterCMS Delivery instance (default: `http://localhost:9080`)

**NEXT_PUBLIC_CRAFTERCMS_SITE_NAME**  
The name of the site created in CrafterCMS Studio

**NEXT_PUBLIC_PREVIEW_TOKEN**  
The preview token generated in CrafterCMS Studio

### 6. Run the application

CrafterCMS has two modules: **Authoring** and **Delivery**. To get started, you only need the Authoring module.

#### Authoring

```bash
# Development
pnpm dev:authoring

# Production build
pnpm build:authoring
```

#### Delivery

> **Note:** The blueprint is ready for both Authoring and Delivery environments. To use Delivery, install the CrafterCMS Delivery and follow the instructions in the `init-site.sh` script.

```bash
# Development
pnpm dev:delivery

# Production build
pnpm build:delivery
```

## 🤝 Contributing

Contributions are welcome! Please feel free to open a PR or a issue.
