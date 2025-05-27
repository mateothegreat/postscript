import type { Instance } from "./instance";

export class Registry {
  private instances: Instance<any>[] = [];

  add(instance: Instance<any>) {
    this.instances.push(instance);
  }

  remove(instance: Instance<any>) {
    this.instances = this.instances.filter((i) => i !== instance);
  }
}
