import { Builder } from "@builder.io/sdk-vue";

// Import all custom components
import HeroSection from "~/components/builder/HeroSection.vue";
import FeatureCard from "~/components/builder/FeatureCard.vue";
import CTASection from "~/components/builder/CTASection.vue";
import TestimonialCard from "~/components/builder/TestimonialCard.vue";
import StatsSection from "~/components/builder/StatsSection.vue";
import CustomHeader from "~/components/builder/CustomHeader.vue";
import PricingSection from "~/components/builder/PricingSection.vue";

export default defineNuxtPlugin(() => {
  // Register Hero Section
  Builder.registerComponent(HeroSection, {
    name: "Hero Section",
    inputs: [
      {
        name: "title",
        type: "string",
        defaultValue: "Welcome to Our Platform",
        helperText: "Main headline for the hero section",
      },
      {
        name: "subtitle",
        type: "longText",
        defaultValue:
          "Discover amazing features and transform your experience with our cutting-edge solutions.",
        helperText: "Subtitle text below the main headline",
      },
      {
        name: "primaryButtonText",
        type: "string",
        defaultValue: "Get Started",
        helperText: "Text for the primary call-to-action button",
      },
      {
        name: "secondaryButtonText",
        type: "string",
        defaultValue: "Learn More",
        helperText: "Text for the secondary button",
      },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F52dcecf48f9c4f2a94a68cb302522364",
  });

  // Register Feature Card
  register("FeatureCard", {
    name: "Feature Card",
    inputs: [
      {
        name: "title",
        type: "string",
        defaultValue: "Feature Title",
        helperText: "Title of the feature",
      },
      {
        name: "description",
        type: "longText",
        defaultValue:
          "Feature description goes here. Explain the benefits and value this feature provides to your users.",
        helperText: "Description of the feature",
      },
      {
        name: "icon",
        type: "string",
        enum: ["rocket", "shield", "star"],
        defaultValue: "rocket",
        helperText: "Icon to display with the feature",
      },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F8b30f86b21a5471db5b3e6c22af4f5eb",
  });

  // Register CTA Section
  register("CTASection", {
    name: "CTA Section",
    inputs: [
      {
        name: "title",
        type: "string",
        defaultValue: "Ready to Get Started?",
        helperText: "Main headline for the CTA section",
      },
      {
        name: "subtitle",
        type: "longText",
        defaultValue:
          "Join thousands of satisfied customers who have transformed their business with our solutions.",
        helperText: "Supporting text for the CTA",
      },
      {
        name: "primaryButtonText",
        type: "string",
        defaultValue: "Start Free Trial",
        helperText: "Text for the primary button",
      },
      {
        name: "secondaryButtonText",
        type: "string",
        defaultValue: "Contact Sales",
        helperText: "Text for the secondary button",
      },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F1c3c2c3b4b6a4d7e8a1b2c3d4e5f6789",
  });

  // Register Testimonial Card
  register("TestimonialCard", {
    name: "Testimonial Card",
    inputs: [
      {
        name: "quote",
        type: "longText",
        defaultValue:
          "This product has completely transformed how we work. The results have been outstanding and exceeded all our expectations.",
        helperText: "Customer testimonial quote",
      },
      {
        name: "name",
        type: "string",
        defaultValue: "John Doe",
        helperText: "Name of the person giving the testimonial",
      },
      {
        name: "title",
        type: "string",
        defaultValue: "CEO, Company Name",
        helperText: "Job title and company of the testimonial giver",
      },
      {
        name: "avatar",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
        defaultValue:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
        helperText: "Profile photo of the testimonial giver",
      },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F2d4e6f8a1b3c5d7e9f1a2b3c4d5e6f78",
  });

  // Register Stats Section
  register("StatsSection", {
    name: "Stats Section",
    inputs: [
      {
        name: "title",
        type: "string",
        defaultValue: "Trusted by Industry Leaders",
        helperText: "Main title for the stats section",
      },
      {
        name: "subtitle",
        type: "longText",
        defaultValue:
          "See why thousands of companies choose our platform for their success.",
        helperText: "Subtitle text",
      },
      {
        name: "stat1Number",
        type: "string",
        defaultValue: "10K+",
        helperText: "First statistic number",
      },
      {
        name: "stat1Label",
        type: "string",
        defaultValue: "Happy Customers",
        helperText: "First statistic label",
      },
      {
        name: "stat2Number",
        type: "string",
        defaultValue: "99%",
        helperText: "Second statistic number",
      },
      {
        name: "stat2Label",
        type: "string",
        defaultValue: "Uptime",
        helperText: "Second statistic label",
      },
      {
        name: "stat3Number",
        type: "string",
        defaultValue: "50M+",
        helperText: "Third statistic number",
      },
      {
        name: "stat3Label",
        type: "string",
        defaultValue: "Transactions",
        helperText: "Third statistic label",
      },
      {
        name: "stat4Number",
        type: "string",
        defaultValue: "24/7",
        helperText: "Fourth statistic number",
      },
      {
        name: "stat4Label",
        type: "string",
        defaultValue: "Support",
        helperText: "Fourth statistic label",
      },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F3e5f7a9b1c3d5e7f9a1b2c3d4e5f6789",
  });

  // Register Custom Header
  register("CustomHeader", {
    name: "Custom Header",
    inputs: [
      {
        name: "logoUrl",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
        defaultValue: "https://ahoyclub.com/logo/ahoy-club-logo-dark.svg",
        helperText: "Company logo image",
      },
      {
        name: "logoAlt",
        type: "string",
        defaultValue: "Logo",
        helperText: "Alt text for the logo",
      },
      {
        name: "companyName",
        type: "string",
        defaultValue: "Your Company",
        helperText: "Company name to display next to logo",
      },
      {
        name: "showCompanyName",
        type: "boolean",
        defaultValue: false,
        helperText: "Show company name next to logo",
      },
      {
        name: "showLoginButton",
        type: "boolean",
        defaultValue: true,
        helperText: "Show login button in header",
      },
      {
        name: "showSignupButton",
        type: "boolean",
        defaultValue: true,
        helperText: "Show signup button in header",
      },
      {
        name: "loginButtonText",
        type: "string",
        defaultValue: "Login",
        helperText: "Text for login button",
      },
      {
        name: "signupButtonText",
        type: "string",
        defaultValue: "Sign Up",
        helperText: "Text for signup button",
      },
      {
        name: "useBuilderNavigation",
        type: "boolean",
        defaultValue: true,
        helperText: "Use navigation links from Builder.io nav-link model",
      },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F4f6a8b9c1d3e5f7a9b1c2d3e4f5a6b78",
  });

  // Register Pricing Section
  register("PricingSection", {
    name: "Pricing Section",
    inputs: [
      // Hero Section
      {
        name: "showHero",
        type: "boolean",
        defaultValue: false,
        helperText: "Show hero section at the top",
      },
      {
        name: "heroTitle",
        type: "string",
        defaultValue: "THE HERO",
        helperText: "Hero section title",
      },
      {
        name: "backgroundImage",
        type: "file",
        allowedFileTypes: ["jpeg", "jpg", "png", "svg"],
        helperText: "Background image URL",
      },
      {
        name: "backgroundColor",
        type: "color",
        defaultValue: "#f8f9fa",
        helperText: "Background color if no image",
      },

      // Header
      {
        name: "title",
        type: "string",
        defaultValue: "Choose Your Plan",
        helperText: "Main section title",
      },
      {
        name: "subtitle",
        type: "longText",
        defaultValue:
          "Select the perfect plan for your needs. Upgrade or downgrade at any time.",
        helperText: "Section subtitle",
      },

      // Basic Plan
      {
        name: "basicTitle",
        type: "string",
        defaultValue: "Basic",
        helperText: "Basic plan title",
      },
      {
        name: "basicDescription",
        type: "string",
        defaultValue: "Perfect for getting started",
        helperText: "Basic plan description",
      },
      {
        name: "basicPrice",
        type: "string",
        defaultValue: "9",
        helperText: "Basic plan price (numbers only)",
      },
      {
        name: "basicFeature1",
        type: "string",
        defaultValue: "Up to 5 projects",
        helperText: "Basic plan feature 1",
      },
      {
        name: "basicFeature2",
        type: "string",
        defaultValue: "Basic support",
        helperText: "Basic plan feature 2",
      },
      {
        name: "basicFeature3",
        type: "string",
        defaultValue: "1GB storage",
        helperText: "Basic plan feature 3",
      },
      {
        name: "basicFeature4",
        type: "string",
        defaultValue: "Email support",
        helperText: "Basic plan feature 4",
      },
      {
        name: "basicButtonText",
        type: "string",
        defaultValue: "Get Started",
        helperText: "Basic plan button text",
      },

      // Pro Plan
      {
        name: "popularBadge",
        type: "string",
        defaultValue: "Most Popular",
        helperText: "Popular badge text",
      },
      {
        name: "proTitle",
        type: "string",
        defaultValue: "Pro",
        helperText: "Pro plan title",
      },
      {
        name: "proDescription",
        type: "string",
        defaultValue: "Best for growing businesses",
        helperText: "Pro plan description",
      },
      {
        name: "proPrice",
        type: "string",
        defaultValue: "29",
        helperText: "Pro plan price (numbers only)",
      },
      {
        name: "proFeature1",
        type: "string",
        defaultValue: "Unlimited projects",
        helperText: "Pro plan feature 1",
      },
      {
        name: "proFeature2",
        type: "string",
        defaultValue: "Priority support",
        helperText: "Pro plan feature 2",
      },
      {
        name: "proFeature3",
        type: "string",
        defaultValue: "100GB storage",
        helperText: "Pro plan feature 3",
      },
      {
        name: "proFeature4",
        type: "string",
        defaultValue: "Advanced analytics",
        helperText: "Pro plan feature 4",
      },
      {
        name: "proFeature5",
        type: "string",
        defaultValue: "Team collaboration",
        helperText: "Pro plan feature 5",
      },
      {
        name: "proButtonText",
        type: "string",
        defaultValue: "Start Free Trial",
        helperText: "Pro plan button text",
      },

      // Enterprise Plan
      {
        name: "enterpriseTitle",
        type: "string",
        defaultValue: "Enterprise",
        helperText: "Enterprise plan title",
      },
      {
        name: "enterpriseDescription",
        type: "string",
        defaultValue: "For large organizations",
        helperText: "Enterprise plan description",
      },
      {
        name: "enterprisePrice",
        type: "string",
        defaultValue: "99",
        helperText: "Enterprise plan price (numbers only)",
      },
      {
        name: "enterpriseFeature1",
        type: "string",
        defaultValue: "Everything in Pro",
        helperText: "Enterprise plan feature 1",
      },
      {
        name: "enterpriseFeature2",
        type: "string",
        defaultValue: "Dedicated support",
        helperText: "Enterprise plan feature 2",
      },
      {
        name: "enterpriseFeature3",
        type: "string",
        defaultValue: "Unlimited storage",
        helperText: "Enterprise plan feature 3",
      },
      {
        name: "enterpriseFeature4",
        type: "string",
        defaultValue: "Custom integrations",
        helperText: "Enterprise plan feature 4",
      },
      {
        name: "enterpriseFeature5",
        type: "string",
        defaultValue: "SLA guarantee",
        helperText: "Enterprise plan feature 5",
      },
      {
        name: "enterpriseButtonText",
        type: "string",
        defaultValue: "Contact Sales",
        helperText: "Enterprise plan button text",
      },

      // Bottom
      {
        name: "bottomText",
        type: "longText",
        defaultValue:
          "All plans include a 14-day free trial. No credit card required.",
        helperText: "Bottom section text",
      },
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F5f7a9b1c3d5e7f9a1b2c3d4e5f6a7b89",
  });
});
