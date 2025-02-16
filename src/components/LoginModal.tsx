"use client";
import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!recaptchaVerifier) {
      const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: (response: any) => {
          console.log("Recaptcha Verified", response);
        },
      });
      verifier.render();
      setRecaptchaVerifier(verifier);
    }
  }, [recaptchaVerifier]);

  const handleSendOtp = async () => {
    setError("");
    if (!phone) return setError("Enter a valid phone number!");
    if (!recaptchaVerifier) return setError("Recaptcha not initialized. Try again.");

    try {
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptchaVerifier);
      setConfirmationResult(confirmation);
      setShowOtpInput(true);
    } catch (err) {
      console.error(err);
      setError("Failed to send OTP. Try again.");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return setError("Enter the OTP!");
    if (!confirmationResult) return setError("No OTP confirmation found!");

    try {
      await confirmationResult.confirm(otp);
      alert("Login Successful! 🎉");
      onClose();
    } catch (err) {
      setError("Invalid OTP. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-2xl font-semibold">Login</h2>
        <p className="text-gray-500 mb-4">Enter your phone number to receive an OTP</p>

        {!showOtpInput ? (
          <>
            <input
              type="tel"
              placeholder="+91 9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-pink-500"
            />
            <div id="recaptcha-container"></div>
            <button onClick={handleSendOtp} className="mt-4 w-full bg-pink-500 text-white py-2 rounded-md">
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:border-pink-500"
            />
            <button onClick={handleVerifyOtp} className="mt-4 w-full bg-green-500 text-white py-2 rounded-md">
              Verify OTP
            </button>
          </>
        )}

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button onClick={onClose} className="mt-4 text-gray-500 underline">Close</button>
      </div>
    </div>
  );
};

export default LoginModal;
