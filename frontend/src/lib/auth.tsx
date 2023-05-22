import { decode, verify } from "jsonwebtoken";
import { AuthDocument } from "../generated/graphql";
import { initializeApollo } from "./apollo";

export default async function auth(ctx, pageProps) {
  const apolloClient = initializeApollo();
  const cookie = ctx.req.cookies.jid || "no refresh";
  const auth = await apolloClient.mutate({
    mutation: AuthDocument,
    variables: { cookie },
  });

  const tok = ctx.req.cookies.jid || "no refresh";
  console.log(auth.data.checkAuth.token);

  if (!decode(tok)) {
    pageProps.props.logged = false;
    if (ctx.res && ctx.req.url !== '/login') {
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
    }
    return;
  }

  let verified: any = "";
  if (tok) {
    try {
      verified = verify(tok, process.env.NEXT_PUBLIC_JWT_REFRESH);
     // console.log(`verify: ${verified}`)
    } catch (err) {
      console.error(err);
    }
  }

  // If logged in and trying to access /login, redirect to home
  if (decode(tok) && ctx.req.url === '/login') {
    if (ctx.res) {
      ctx.res.writeHead(302, { Location: '/' });
      ctx.res.end();
    }
    return;
  }

  pageProps.props.logged = true;
  pageProps.props.auth = auth;
  pageProps.props.decoded = verified;
  console.log(`pageProps.props.decoded = ${pageProps.props.decoded}`)

}
