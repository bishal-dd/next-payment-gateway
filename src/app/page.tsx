export default async function Home() {
  const handleAction = async () => {
    "use server";

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
          pubKey: `-----BEGIN PUBLIC KEY-----
      MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArMpFdvQUMXtWo9hDwDgK
      xFGCaOPozbtsf29vrPE11wCEXLvLGebaKY1mrBN2ZPaHXzh3SaP5xoRKQofuG3sY
      VwBLTBNrrhL7hAIopmc0TFUnEAiD7JItS0rUCQ3oriGDVfD0jnbuTi0XBL4lM2w9
      7FBx0s4rRv9nfwmU9eSwP0fusxdb316oU61/vWXTLeQa7FLx8H25FpN+8Tlx+Z0e
      svdiGWDYbtP/Fb9ktIOaS3dYc1QFzmpQlfPX+azoKbSXA3uIDngubS9io/egcpkR
      Jfbu/fpKdlndVqIJgGiGoz+4TBQatNp3bkfpLn612XZn6XXEjzmMgx40T3CV22TC
      OwIDAQAB
      -----END PUBLIC KEY-----`,
          purchaseId: "3",
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json(); // Parse response JSON

      console.log(responseData);
      console.log("Submitted successfully");
      // Handle success or further actions here
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle errors here
    }
  };
  return (
    <form action={handleAction}>
      <button type="submit">Submit</button>
    </form>
  );
}
