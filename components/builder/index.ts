// Export all Builder.io components
export { default as HeroSection } from "./HeroSection.vue";
export { default as FeatureCard } from "./FeatureCard.vue";
export { default as CTASection } from "./CTASection.vue";
export { default as TestimonialCard } from "./TestimonialCard.vue";
export { default as StatsSection } from "./StatsSection.vue";
export { default as CustomHeader } from "./CustomHeader.vue";
export { default as PricingSection } from "./PricingSection.vue";

// Component descriptions for documentation
export const componentInfo = {
  HeroSection: {
    name: "Hero Section",
    description:
      "A full-width hero section with title, subtitle, and action buttons",
    category: "Landing Page",
    props: ["title", "subtitle", "primaryButtonText", "secondaryButtonText"],
  },
  FeatureCard: {
    name: "Feature Card",
    description: "A card component for showcasing product features with icons",
    category: "Content",
    props: ["title", "description", "icon"],
  },
  CTASection: {
    name: "CTA Section",
    description: "Call-to-action section with title, subtitle, and buttons",
    category: "Landing Page",
    props: ["title", "subtitle", "primaryButtonText", "secondaryButtonText"],
  },
  TestimonialCard: {
    name: "Testimonial Card",
    description:
      "Customer testimonial card with avatar, quote, and attribution",
    category: "Social Proof",
    props: ["quote", "name", "title", "avatar"],
  },
  StatsSection: {
    name: "Stats Section",
    description: "Statistics display section with 4 customizable metrics",
    category: "Data Display",
    props: [
      "title",
      "subtitle",
      "stat1Number",
      "stat1Label",
      "stat2Number",
      "stat2Label",
      "stat3Number",
      "stat3Label",
      "stat4Number",
      "stat4Label",
    ],
  },
  CustomHeader: {
    name: "Custom Header",
    description: "Responsive header with logo, navigation, and action buttons",
    category: "Navigation",
    props: [
      "logoUrl",
      "logoAlt",
      "companyName",
      "showCompanyName",
      "showLoginButton",
      "showSignupButton",
      "loginButtonText",
      "signupButtonText",
      "useBuilderNavigation",
    ],
  },
  PricingSection: {
    name: "Pricing Section",
    description:
      "Complete pricing section with three tiers and customizable features",
    category: "Landing Page",
    props: [
      "showHero",
      "heroTitle",
      "backgroundImage",
      "backgroundColor",
      "title",
      "subtitle",
      "basicTitle",
      "basicPrice",
      "proTitle",
      "proPrice",
      "enterpriseTitle",
      "enterprisePrice",
      "bottomText",
    ],
  },
};
