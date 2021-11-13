<script lang="ts">
  import "carbon-components-svelte/css/all.css";

  import { Admin, Resource } from "./core";
  import { Appbar, Layout } from "./carbon";
  import ProductList from "./ProductList.svelte";
  import ProductEdit from "./ProductEdit.svelte";
  import ProductShow from "./ProductShow.svelte";
  import CategoryList from "./CategoryList.svelte";
  import { delayedDataProvider } from "./dataProvider";
  import ProductCreate from "./ProductCreate.svelte";
  const dataProvider = delayedDataProvider(2000);
</script>

<Admin {dataProvider}>
  <Layout title="Poster-galore">
    <Resource name="products">
      <ProductList slot="index" />
      <ProductCreate slot="create" />
      <ProductEdit slot="edit" />
      <ProductShow slot="show" />
    </Resource>
    <Resource name="categories">
      <CategoryList slot="index" />
    </Resource>
  </Layout>
</Admin>
