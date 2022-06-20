import { decode, verify } from "jsonwebtoken";
import { AuthDocument } from "../generated/graphql";
import { initializeApollo } from "./apollo";

export default async function auth({ req, res }, pageProps) {
  const apolloClient = initializeApollo();
  const cook = req.cookies.jid || "no refresh";
  console.log(cook);
  const auth = await apolloClient.mutate({
    mutation: AuthDocument,
    variables: { cookie: cook },
  });

  const tok = auth.data.checkAuth.token;
  console.log(auth.data.checkAuth.token);

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
  let verified: any = "";
  if (tok) {
    try {
      verified = verify(tok, "123456");
    } catch (err) {
      console.error(err);
    }
  }

  pageProps.props.logged = true;
  pageProps.props.auth = auth;
  pageProps.props.decoded = verified;
}
