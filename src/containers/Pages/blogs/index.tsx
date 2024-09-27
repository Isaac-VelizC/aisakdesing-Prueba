import { Helmet } from "react-helmet-async";
import { CONFIG } from "src/config-global";
import { BlogView } from "./blog-view";

function PageBlogs() {
  return (
    <>
      <Helmet>
        <title> {`Blogs - ${CONFIG.appName}`}</title>
      </Helmet>
      <BlogView/>
    </>
  );
}

export default PageBlogs;
