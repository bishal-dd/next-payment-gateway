// route.ts

import { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";

type ResponseData = {
  mac: string;
  timestamp: string;
};

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const transactionTimestamp = getCurrentTimestamp();
    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY!;

    const fields = {
      MPI_TRANS_TYPE: "SALES",
      MPI_MERC_ID: "863990743500270",
      MPI_PAN: "4889130151646463",
      MPI_CARD_HOLDER_NAME: "Bishal Dhakal",
      MPI_PAN_EXP: "2809",
      MPI_CVV2: "605",
      MPI_TRXN_ID: "52",
      MPI_PURCH_DATE: transactionTimestamp,
      MPI_PURCH_CURR: "840",
      MPI_PURCH_AMT: "1",
      MPI_EMAIL: "dhakalbishal930@gmail.com",
    };

    const dataString = Object.values(fields).join("");

    const sign = crypto.createSign("SHA256");
    sign.update(dataString);
    const signature = sign.sign(
      privateKey.split(String.raw`\n`).join("\n"),
      "base64"
    );

    const base64UrlSignature = signature
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const MPI_MAC = base64UrlSignature;

    return new Response(
      JSON.stringify({ mac: MPI_MAC, timestamp: transactionTimestamp })
    );
  } catch (error) {
    console.error("Error fetching MAC:", error);
  }
}

function getCurrentTimestamp() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
