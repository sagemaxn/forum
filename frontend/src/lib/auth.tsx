import { decode } from "jsonwebtoken";
import { AuthDocument } from "../generated/graphql";
import { initializeApollo } from "./apollo";

export default async function auth({ req, res }, pageProps) {
  const apolloClient = initializeApollo();
  const cook = req.cookies.jid || "no refresh";
  console.log(cook);
  const auth = await apolloClient.query({
    query: AuthDocument,
    variables: { cookie: cook },
  });

  const tok = auth.data.checkAuth.token;
  console.log(decode(tok));
  console.log(req.url);
  if (!decode(tok) 
  //&& req.url !=='/login'
  ) {
    pageProps.props.logged = false;
    if (req.url !== "/login") {
      pageProps.redirect = {
        destination: "/login",
        permanent: false,
      };
    }
    return;
  }
  // else {
  //   if(req.url === '/login') {
  //     pageProps.redirect = {
  //       destination: "/",
  //       permanent: false
  //     }
  //   }
  // }
  pageProps.props.logged = true;
  pageProps.props.auth = auth;
}
