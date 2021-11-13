<script lang="ts">
  import { ToastNotification } from "carbon-components-svelte";
  import { Notifications } from "@svelte-admin/core";

  const handleClose = (id: string) => {
    Notifications.remove(id);
  };
</script>

{#each $Notifications as notification (notification.id)}
  <ToastNotification
    kind={notification.type}
    title={notification.message}
    timeout={notification.timeout}
    on:close={() => handleClose(notification.id)}
  />
{/each}
