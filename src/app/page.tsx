import crypto from "crypto";
import Validation from "./Pages/Validation";
import Payment from "./Pages/Payment";

export default async function Home() {
  return (
    <>
      <Validation />
      <Payment />
    </>
  );
}
