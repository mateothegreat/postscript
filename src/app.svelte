<script lang="ts">
  import { Instance, instance } from "./lib/instance";
  import Basic from "$test/components/basic.svelte";
  import Button from "$test/components/button.svelte";

  type CustomComponent = {
    message: string;
  };

  let container: HTMLDivElement;
  let ref: Instance<CustomComponent>;

  $effect(() => {
    ref = instance({
      component: Basic,
      props: {
        testId: "e2e"
      }
    });
  });
</script>

<div class="gap-2 flex flex-col items-center justify-center h-screen">
  <Button
    action="render"
    onclick={() => console.log("render returned:", ref.render(container))}>
    Render
  </Button>
  <Button
    action="destroy"
    onclick={() => console.log("destroy returned:", ref.destroy())}>
    Destroy
  </Button>
  <div
    class="flex flex-col items-center justify-center bg-red-500"
    bind:this={container}>
  </div>
</div>
