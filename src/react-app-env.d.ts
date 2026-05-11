/// <reference types="vite/client" />

/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module "*.avif" {
  const src: string;
  export default src;
}

declare module "*.bmp" {
  const src: string;
  export default src;
}

declare module "*.gif" {
  const src: string;
  export default src;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

declare module "*.jpeg" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}

declare module "*.webp" {
  const src: string;
  export default src;
}

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.sass" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// react-notifications-component v3 ships .d.ts files but its package.json
// lacks a "types" field, so TypeScript can't find them. Declare the bits we
// actually use; can be removed if/when we move to a typed alternative.
declare module "react-notifications-component" {
  import type { ComponentType } from "react";
  export const store: {
    addNotification(options: {
      title?: string;
      message?: string;
      type?: "success" | "danger" | "info" | "warning" | "default";
      insert?: "top" | "bottom";
      container?: string;
      dismiss?: { duration?: number };
      [key: string]: unknown;
    }): void;
  };
  const ReactNotification: ComponentType<Record<string, unknown>>;
  export default ReactNotification;
}
