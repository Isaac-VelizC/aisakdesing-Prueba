import { Helmet } from "react-helmet-async";
import { CONFIG } from "src/config-global";
import { ProductsView } from "./products-view";

function PageProducts() {
  return (
    <>
      <Helmet>
        <title> {`Products - ${CONFIG.appName}`}</title>
        <meta
          name="keywords"
          content="react,material,kit,application,dashboard,admin,template"
        />
      </Helmet>
      <ProductsView/>
    </>
  );
}

export default PageProducts;
