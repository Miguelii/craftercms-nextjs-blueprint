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

## Getting Started

### 1. Install CrafterCMS

See https://craftercms.com/download

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

**NEXT_PUBLIC_CRAFTERCMS_HOST_NAME**  
The URL of your CrafterCMS instance (default: `http://localhost:8080`)

**NEXT_PUBLIC_CRAFTERCMS_SITE_NAME**  
The name of the site created in CrafterCMS Studio

**NEXT_PUBLIC_PREVIEW_TOKEN**  
The preview token generated in CrafterCMS Studio

### 6. Run Development Server with pnpm

```bash
pnpm dev
```

## 🤝 Contributing

Contributions are welcome! Please feel free to open a PR or a issue.
