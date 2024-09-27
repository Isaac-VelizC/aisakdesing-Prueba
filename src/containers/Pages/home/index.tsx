import { Helmet } from "react-helmet-async";
import { CONFIG } from "src/config-global";
import { OverviewView } from "./overview-view";

function PageHome() {
  return (
    <>
      <Helmet>
        <title> {`Dashboard - ${CONFIG.appName}`}</title>
        <meta
          name="keywords"
          content="react,material,kit,application,dashboard,admin,template"
        />
      </Helmet>
      <OverviewView/>
    </>
  );
}

export default PageHome;
