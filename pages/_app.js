import "../styles/global.css";
import Router from "next/router";
import NProgress from "nprogress"; //nprogress module
import "../components/nprogress.css";
import { wrapper } from "../components/redux/store"

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  );
}


MyApp.getInitialProps = wrapper.getInitialAppProps();

export default wrapper.withRedux(MyApp);
