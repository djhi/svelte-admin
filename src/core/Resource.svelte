<script lang="ts">
    import { Route } from 'tinro';
    import { setContext } from "svelte";

	export let name: string = '';

    setContext('resource', {
        hasCreate: $$slots.create,
        hasEdit: $$slots.edit,
        hasList: $$slots.index,
        hasShow: $$slots.show,
        name,
    });
</script>

<Route path="/{name}/*" firstmatch>
    {#if $$slots.index}
        <Route path="/">
            <slot name="index">
                <h1>Index page for resource {name}</h1>
            </slot>
        </Route>
    {/if}

    {#if $$slots.create}
        <Route path="/create">
            <slot name="create">
                <h1>Create page for resource {name}</h1>
            </slot>
        </Route>
    {/if}

    {#if $$slots.show}
        <Route path="/:id/show">
            <slot name="show">
                <h1>Show page for resource {name}</h1>
            </slot>
        </Route>
    {/if}

    {#if $$slots.edit}
        <Route path="/:id">
            <slot name="edit">
                <h1>Edit page for resource {name}</h1>
            </slot>
        </Route>
    {/if}
</Route>
