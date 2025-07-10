// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: "2024-07-06",
  modules: ["shadcn-nuxt", "@builder.io/sdk-vue/nuxt"],
  builder: {
    publicKey: "25becc87cdbf4edab9eccb09d448af92",
    models: ["page", "nav-link"],
  },
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
});
