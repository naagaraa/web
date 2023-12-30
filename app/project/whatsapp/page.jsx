"use client";

import React, { useState } from "react";

const WhatsApp = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [codeCountry, setCodeCountry] = useState("62");

  const handleSendMessage = async () => {
    // Assuming you have a server endpoint for sending WhatsApp messages
    const WAurl = "https://api.whatsapp.com/send/?phone=";
    const phoneNumberWithoutHyphens = phoneNumber.replace(/-/g, "");
    const phoneNumberUser = phoneNumberWithoutHyphens.replace(/^0+/, "");
    const fullPhoneNumber = codeCountry + phoneNumberUser;
    const whatsappUrl = WAurl + fullPhoneNumber;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="container mx-auto mt-10 mb-10 ps-3 pe-3">
      <div className="min-h-screen ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mt-5">
          <div className="d-flex text-center col-span-3">
            <h1 className="font-bold text-center">WhatsApps Direct Chat</h1>

            <select
              value={codeCountry}
              onChange={(e) => setCodeCountry(e.target.value)}
              className="mt-3 select select-bordered w-full max-w-xs"
            >
              <option value={"62"}>Indonesia</option>
              <option value={"65"}>Singapore</option>
              <option value={"60"}>Malaysia</option>
            </select>
            <input
              type="text"
              placeholder="Phone Number"
              className="mt-3 input input-bordered w-full max-w-xs"
              value={phoneNumber}
              onChange={(e) => {
                // Allow only numeric input
                const numericInput = e.target.value.replace(/\D/g, "");
                setPhoneNumber(numericInput);
              }}
            />

            <button
              className="mt-3 btn bg-lime-500 hover:bg-lime-600 hover:text-slate-200"
              onClick={handleSendMessage}
            >
              Direct WhatsApp Apps
            </button>
          </div>
          <div className="col-span-4 mx-auto">
            <h1 className="font-bold mt-5">WhatsApps</h1>
            <section className="mt-5">
              <h2>Apps Flow</h2>
              <p>
                This Apps ONLY Direct your number to thirparty WhatsApp for open
                chat
              </p>
              {/* Add more details based on your specific data collection and usage practices. */}
            </section>
            <section className="mt-5">
              <h2>Privacy Policy</h2>
              <p>
                Your privacy is important to us. We Not collect and process your
                phone number solely for the purpose of sending WhatsApp
                messages. We do not share your information with third parties.
              </p>
              {/* Add more details based on your specific data collection and usage practices. */}
            </section>
            <section className="mt-5">
              <h2>Terms and Conditions</h2>
              <p>
                By using this service, you agree to abide by our terms and
                conditions. You acknowledge that the phone number you provide
                will be used for sending WhatsApp messages and related purposes.
              </p>
              {/* Include details on user responsibilities, limitations, disclaimers, etc. */}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsApp;
