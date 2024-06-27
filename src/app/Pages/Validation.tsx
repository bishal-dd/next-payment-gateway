import crypto from "crypto";

export default async function Validation() {
  const handleAction = async () => {
    "use server";
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

    try {
      // Example: Making a fetch request to an endpoint
      const response = await fetch("https://3dsecure.bob.bt/3dss/mkReq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add any headers required by your API
        },
        body: JSON.stringify({
          merchantId: "863990743500270",
          pubKey: publicKey,
          purchaseId: "53",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json(); // Parse response JSON

      console.log(responseData);
      console.log("Submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle errors here
    }
  };
  return (
    <form action={handleAction}>
      <button type="submit">Validation</button>
    </form>
  );
}
