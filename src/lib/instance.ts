import { type Component, mount, unmount } from "svelte";

/**
 * The configuration object for creating an instance of a component.
 *
 * @template T - The type of props for the component.
 *
 * @param {Component<T>} component - The Svelte component to be managed.
 * @param {T} props - The props to be passed to the component.
 */
export type InstanceConfig<T extends Record<string, any>> = {
  component: Component<T>;
  props: T;
};

/**
 * Instance class for managing Svelte component instances.
 *
 * This class provides methods for managing the lifecycle of
 * a component instance.
 *
 * @template T - The type of props for the component.
 *
 * @param {Component<T>} component - The Svelte component to be managed.
 * @param {T} props - The props to be passed to the component.
 */
export class Instance<T extends Record<string, any>> {
  /**
   * The Svelte component that is being managed.
   */
  component: Component<T>;

  /**
   * The props to be passed to the component when it is rendered.
   */
  props: T;

  /**
   * The mounted component instance. This is used to store the
   * mounted component instance for later destruction.
   */
  componentRef: Component<T>;

  constructor(component: Component<T>, props: T) {
    this.component = component;
    this.props = props;
  }

  /**
   * Renders the component to the target element.
   *
   * @param target - The target element to render the component to.
   * @returns The exports and potentially the props (if compiled with accessors: true) of the component.
   */
  render(target: HTMLElement): Component<T> {
    const mounted = mount(this.component, {
      target,
      props: this.props
    });

    this.componentRef = mounted as Component<T>;

    return mounted as Component<T>;
  }

  /**
   * Destroys the component instance.
   *
   * @returns True if the component was destroyed, false otherwise.
   */
  destroy(): boolean {
    if (!this.componentRef) {
      return false;
    }

    unmount(this.componentRef);
    this.componentRef = null;
    return true;
  }
}

export const instance = (config: InstanceConfig<any>) => {
  const instance = new Instance(config.component, config.props);
  return instance;
};
