"use client";

import React, { useState } from "react";
import Link from "next/link";

const ConversionTools = () => {
  const [ip, setIp] = useState("");
  const [binary, setBinary] = useState("");
  const [cidr, setCidr] = useState("");
  const [mask, setMask] = useState("");

  const convertIpToBinary = () => {
    const bin = ip
      .split(".")
      .map((octet) => parseInt(octet).toString(2).padStart(8, "0"))
      .join(".");
    setBinary(bin);
  };

  const convertCidrToMask = () => {
    const bits = parseInt(cidr);
    const maskBinary = (0xffffffff << (32 - bits)) >>> 0;
    const maskStr = [24, 16, 8, 0]
      .map((s) => (maskBinary >> s) & 255)
      .join(".");
    setMask(maskStr);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 mt-24">
      <title>Conversion Tools - Network Tools</title>

      {/* <Link href="/apps" className="text-blue-600 hover:underline">
        ← Back to Tools
      </Link> */}

      <h1 className="text-2xl font-bold">Conversion Tools</h1>
      <p className="text-sm text-gray-600">
        Convert IP addresses, CIDR notations, and subnet masks.
      </p>

      <div>
        <label className="font-medium">IP to Binary:</label>
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className="border p-2 w-full rounded mt-1"
          placeholder="e.g. 192.168.1.1"
        />
        <button
          onClick={convertIpToBinary}
          className="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700"
        >
          Convert
        </button>
        {binary && <p className="mt-2">Binary: {binary}</p>}
      </div>

      <div>
        <label className="font-medium">CIDR to Subnet Mask:</label>
        <input
          type="text"
          value={cidr}
          onChange={(e) => setCidr(e.target.value)}
          className="border p-2 w-full rounded mt-1"
          placeholder="e.g. 24"
        />
        <button
          onClick={convertCidrToMask}
          className="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700"
        >
          Convert
        </button>
        {mask && <p className="mt-2">Subnet Mask: {mask}</p>}
      </div>
    </div>
  );
};

export default ConversionTools;
