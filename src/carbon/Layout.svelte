<script lang="ts">
    import { Content } from "carbon-components-svelte";
    import Appbar from "./Appbar.svelte";
import Sidebar from "./Sidebar.svelte";
</script>

<slot name="header"><Appbar /></slot>
<slot name="sidebar"><Sidebar /></slot>
<Content>
    <slot></slot>
</Content>
<slot name="footer"></slot>
