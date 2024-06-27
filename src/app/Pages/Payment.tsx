"use client";
import { useEffect, useState } from "react";

const Payment = () => {
  const [mac, setMac] = useState("");
  const [timestamp, setTimestamp] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api");
        if (!response.ok) {
          throw new Error("Failed to fetch signature");
        }
        const { mac, timestamp } = await response.json();
        setMac(mac);
        setTimestamp(timestamp);
      } catch (error) {
        console.log(error);
        console.error("Error fetching signature:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <form action="https://3dsecure.bob.bt/3dss/mercReq">
      <input type="hidden" name="MPI_TRANS_TYPE" value="SALES" />
      <input type="hidden" name="MPI_MERC_ID" value="863990743500270" />
      <input type="hidden" name="MPI_PAN" value="4889130151646463" />
      <input type="hidden" name="MPI_CARD_HOLDER_NAME" value="Bishal Dhakal" />
      <input type="hidden" name="MPI_PAN_EXP" value="2809" />
      <input type="hidden" name="MPI_CVV2" value="605" />
      <input type="hidden" name="MPI_TRXN_ID" value="52" />
      <input type="hidden" name="MPI_PURCH_DATE" value={timestamp} />
      <input type="hidden" name="MPI_PURCH_CURR" value="840" />
      <input type="hidden" name="MPI_PURCH_AMT" value="1" />
      <input type="hidden" name="MPI_EMAIL" value="dhakalbishal930@gmail.com" />
      <input type="hidden" name="MPI_MAC" value={mac} />
      <button type="submit">Payment</button>
    </form>
  );
};

export default Payment;
