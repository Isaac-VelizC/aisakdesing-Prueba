import { Helmet } from "react-helmet-async";
import { CONFIG } from "src/config-global";
import { UserView } from "./user-view";

function PageUsers() {
  return (
    <>
      <Helmet>
        <title> {`Users - ${CONFIG.appName}`}</title>
      </Helmet>
      <UserView/>
    </>
  );
}

export default PageUsers;
