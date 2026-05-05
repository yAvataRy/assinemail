declare module "#imports" {
  export function useToast(): {
    success: (msg: string, opts?: any) => void;
    error: (msg: string, opts?: any) => void;
  };
  export function navigateTo(path?: string): void;
  export function useI18n(): { t: (key: string) => string };
}

declare module "#app" {
  import { NuxtApp } from "nuxt/app";
  export function defineNuxtPlugin(cb: (nuxtApp: NuxtApp) => void): void;
}

declare global {
  const definePageMeta: (meta: Record<string, any>) => void;
  const defineNuxtConfig: (...args: any[]) => any;
  const defineEventHandler: (h: any) => any;
  function getRouterParam(event: any, key: string): string;
}

export {};
