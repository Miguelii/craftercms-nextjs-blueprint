# CrafterCMS Next.js Blueprint

## Pages

Every page follows this structure:

```tsx
export default async function Page() {
    const model = await getModel(ModelPathEnum.PAGE_PATH)

    if (!model) return notFound()

    return <ExperienceBuilder model={model}>{/* page content */}</ExperienceBuilder>
}
```

## CrafterCMS Component Imports

### ExperienceBuilder

Always import from the local wrapper to preserve SSR:

```tsx
import { ExperienceBuilder } from '@/components/craftercms/experience-builder'
```

Never import from `@craftercms/experience-builder/react` — that export is typed as `never` to prevent accidental use (see `src/types/experience-builder-override.d.ts`).

### RenderField

Always import from the local wrapper to preserve SSR:

```tsx
import { RenderField } from '@/components/craftercms/render-field'
```

Never import from `@craftercms/experience-builder/react` or `@craftercms/experience-builder/react/RenderField` directly.

#### Server Component usage (preferred)

`RenderField` without the `render` prop works inside Server Components:

```tsx
<RenderField
    model={model}
    fieldId="title_s"
    componentProps={{
        component: 'h1',
        className: 'text-2xl font-bold w-full text-center',
    }}
/>
```

#### Client Component usage (when `render` prop is needed)

The `render` prop passes a function, which cannot cross the server/client boundary. Any component using `render` must be a Client Component (`'use client'`):

```tsx
'use client'

<RenderField
    model={model}
    fieldId="copy_s"
    component="span"
    render={(copy_s: string) =>
        copy_s?.replaceAll('$YEAR', String(new Date().getFullYear()))
    }
/>
```

## Data Fetching & Caching

Data-fetching functions in `src/lib/crafter-api.ts` use two layers of cache:

1. **`withDeliveryCache` (`unstable_cache`)** — persists results across requests with a configurable TTL. Needed because the CrafterCMS SDK uses RxJS observables (its own HTTP client), so Next.js cannot intercept and cache these calls automatically.
2. **`React.cache()`** — deduplicates calls within a single request's render tree (e.g. if layout and page both call `getModel` with the same args, it only executes once).

### `withDeliveryCache`

Defined in `src/lib/utils.server.ts`. Conditionally wraps a function with `unstable_cache` based on the environment (`NEXT_PUBLIC_CRAFTERCMS_ENVIRONMENT`):

- **Authoring** — skips caching entirely. Content editors need to see changes immediately.
- **Delivery** — wraps with `unstable_cache` using a TTL and cache tags for on-demand invalidation.

```tsx
const getModelFn = cache(
    withDeliveryCache(
        async (path: ModelPathEnum): Promise<ContentInstance> => {
            // fetch logic
        },
        [GET_MODEL_CACHE_KEY_PREFIX],
        { revalidate: GET_MODEL_DELIVERY_CACHE_TIME_S, tags: [GET_MODEL_CACHE_KEY_PREFIX] }
    )
)
```

### `unstable_cache` null-value bug

`unstable_cache` caches falsy return values (including `null`), which means a failed fetch would be cached until revalidation. To prevent this, the inner functions throw errors instead of returning `null`. The outer public function (`getModel`, `getNav`) catches those errors and returns `null`/`[]` without polluting the cache.
