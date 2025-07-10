# Builder.io Custom Components

This directory contains custom Vue.js components designed specifically for use with Builder.io's visual editor. These components are automatically registered with Builder.io through the `plugins/builder-components.client.ts` plugin.

## Available Components

### 🚀 HeroSection

A full-width hero section perfect for landing pages.

- **Props**: title, subtitle, primaryButtonText, secondaryButtonText
- **Use Case**: Homepage headers, landing page intros

### 🎯 FeatureCard

A card component for showcasing product features with icons.

- **Props**: title, description, icon (rocket/shield/star)
- **Use Case**: Feature listings, service highlights

### 📢 CTASection

Call-to-action section with compelling copy and buttons.

- **Props**: title, subtitle, primaryButtonText, secondaryButtonText
- **Use Case**: Conversion sections, newsletter signups

### 💬 TestimonialCard

Customer testimonial card with avatar and attribution.

- **Props**: quote, name, title, avatar
- **Use Case**: Social proof, customer reviews

### 📊 StatsSection

Statistics display section with up to 4 metrics.

- **Props**: title, subtitle, stat1Number, stat1Label, stat2Number, stat2Label, etc.
- **Use Case**: Company metrics, product statistics

### 🧭 CustomHeader

Responsive header with logo, navigation, and action buttons.

- **Props**: logoUrl, companyName, showLoginButton, showSignupButton, etc.
- **Use Case**: Site navigation, brand identity

## How to Use

1. **In Builder.io Editor**: These components appear in the "Insert" tab under "Custom Components"
2. **Drag and Drop**: Simply drag any component onto your page
3. **Configure**: Use the properties panel to customize text, images, and behavior
4. **Responsive**: All components are mobile-responsive by default

## Component Registration

Components are automatically registered when the app loads via the Nuxt plugin at `plugins/builder-components.client.ts`. This ensures they're available in Builder.io's visual editor.

## Styling

All components use:

- **Tailwind CSS** for styling
- **shadcn/ui** components for buttons and UI elements
- **Responsive design** principles
- **Consistent spacing** and typography

## Customization

To add new components:

1. Create a new `.vue` file in this directory
2. Add it to the plugin registration in `plugins/builder-components.client.ts`
3. Define appropriate inputs for the Builder.io editor
4. Export it from `index.ts`

## Development

When developing these components:

- Test them both standalone and in Builder.io
- Ensure all props have sensible defaults
- Follow the existing styling patterns
- Add proper TypeScript interfaces for props
