<script lang="ts">
	import fakeRestDataProvider from 'ra-data-fakerest';
	import generateData from 'data-generator-retail';
	import "carbon-components-svelte/css/all.css";

	import Admin from "./core/Admin.svelte";
	import Resource from "./core/Resource.svelte";
	import ProductList from './ProductList.svelte';
	import CategoryList from './CategoryList.svelte';
	import Layout from './carbon/Layout.svelte';
	import Appbar from './carbon/Appbar.svelte';

	const dataProvider = fakeRestDataProvider(generateData(), true);
</script>

<Admin dataProvider={dataProvider}>
	<Layout>
        <svelte:fragment slot="header">
			<Appbar company="Marmelab" title="Poster-galore" />
		</svelte:fragment>

		<Resource name="products">
			<div slot="index">
				<ProductList />
			</div>
			<div slot="create">
			</div>
			<div slot="edit">
			</div>
			<div slot="show">
			</div>
		</Resource>
		<Resource name="categories">
			<div slot="index">
				<CategoryList />
			</div>
			<div slot="create">
			</div>
			<div slot="edit">
			</div>
			<div slot="show">
			</div>
		</Resource>
	</Layout>
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
