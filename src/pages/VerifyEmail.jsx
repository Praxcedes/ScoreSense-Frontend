import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { verifyEmail } from "../services/authApi";

export default function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    verifyEmail(token)
      .then(() => setStatus("success"))
      .catch(() => setStatus("error"));
  }, [token]);

  if (status === "loading") return <p>Verifying...</p>;
  if (status === "success") return <p>Email verified successfully!</p>;

  return <p>Verification failed or expired.</p>;
}
