<script lang="ts">
  /**
   * Test component for validating the instance() method functionality.
   * This component accepts props and renders them for testing purposes.
   */

  let { action, children, ...rest } = $props();
</script>

<button
  data-test-action={action}
  class="bg-blue-500 text-white p-2 rounded-md"
  {...rest}>
  {@render children?.()}
</button>
