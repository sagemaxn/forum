const Index = ({ decoded, token }) => {
  return <div>Index</div>;
};

import auth from "../lib/auth";
import { compose } from "../lib/compose";

export const getServerSideProps = compose(auth);

export default Index;
