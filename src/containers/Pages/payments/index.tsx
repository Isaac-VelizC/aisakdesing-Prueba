import { Helmet } from "react-helmet-async";
import { CONFIG } from "src/config-global";
import { PaymentsView } from "./payment-view";

function PagePayments() {
  return (
    <>
      <Helmet>
        <title> {`Payments - ${CONFIG.appName}`}</title>
        <meta
          name="keywords"
          content="react,material,kit,application,dashboard,admin,template"
        />
      </Helmet>
      <PaymentsView/>
    </>
  );
}

export default PagePayments;
