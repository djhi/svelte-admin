<script lang="ts">
	import fakeRestDataProvider from 'ra-data-fakerest';
	import generateData from 'data-generator-retail';
	import "carbon-components-svelte/css/all.css";

	import Admin from "./core/Admin.svelte";
	import Resource from "./core/Resource.svelte";
	import ProductsList from './ProductsList.svelte';

	const dataProvider = fakeRestDataProvider(generateData(), true);
</script>

<Admin dataProvider={dataProvider}>
	<Resource name="products">
		<div slot="index">
			<ProductsList />
		</div>
		<div slot="create">
		</div>
		<div slot="edit">
		</div>
		<div slot="show">
		</div>
	</Resource>
</Admin>
<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
