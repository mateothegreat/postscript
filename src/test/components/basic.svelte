<script lang="ts">
  /**
   * Test component for validating the instance() method functionality.
   * This component accepts props and renders them for testing purposes.
   */

  interface Props {
    message?: string;
    count?: number;
    testId?: string;
  }

  let { testId }: Props = $props();
</script>

asdf
<div
  data-name="basic"
  data-testid={testId}>
  <h2 data-testid="message">data-testid: {testId}</h2>
</div>
