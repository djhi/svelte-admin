<script lang="ts">
  import "carbon-components-svelte/css/all.css";

  import { Admin, Resource } from "./core";
  import { Appbar, Layout } from "./carbon";
  import ProductList from "./ProductList.svelte";
  import ProductShow from "./ProductShow.svelte";
  import CategoryList from "./CategoryList.svelte";
  import { dataProvider } from "./dataProvider";
</script>

<Admin {dataProvider}>
  <Layout title="Poster-galore">
    <Resource name="products">
      <ProductList slot="index" />
      <div slot="create" />
      <div slot="edit" />
      <ProductShow slot="show" />
    </Resource>
    <Resource name="categories">
      <CategoryList slot="index" />
      <div slot="create" />
      <div slot="edit" />
      <div slot="show" />
    </Resource>
  </Layout>
</Admin>
