<script lang="ts">
    import { Route } from 'tinro';
    import { setContext, onMount, onDestroy } from "svelte";
    import { resourceStore } from './resources';

	export let name: string = '';

    const definition = {
        hasCreate: $$slots.create,
        hasEdit: $$slots.edit,
        hasList: $$slots.index,
        hasShow: $$slots.show,
        name,
    };

    setContext('resource', definition);
    onMount(() => {
        resourceStore.add(definition)
    });
    onDestroy(() => {
        resourceStore.remove(definition);
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
