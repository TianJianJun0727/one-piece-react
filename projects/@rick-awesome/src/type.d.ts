declare module 'flipdown';

declare module '*.js';

declare module '*.vue' {
  import { type defineComponent } from 'vue';
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

declare module '*.md' {
  // "unknown" would be more detailed depends on how you structure frontmatter
  const attributes: Record<string, unknown>;

  // When "Mode.TOC" is requested
  const toc: Array<{ level: string; content: string }>;

  // When "Mode.HTML" is requested
  const html: string;

  // When "Mode.RAW" is requested
  const raw: string;

  // When "Mode.React" is requested. VFC could take a generic like React.VFC<{ MyComponent: TypeOfMyComponent }>
  import type React from 'react';
  const ReactComponent: React.VFC;

  // When "Mode.Vue" is requested
  import { type Component, type ComponentOptions } from 'vue';
  const VueComponent: ComponentOptions;
  const VueComponentWith: (
    components: Record<string, Component>,
  ) => ComponentOptions;

  // Modify below per your usage
  export {
    ReactComponent,
    VueComponent,
    VueComponentWith,
    attributes,
    html,
    toc,
  };
}
