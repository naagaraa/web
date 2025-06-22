/* eslint-disable @typescript-eslint/no-require-imports */
"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function IPCalculator() {
  const [ipModule, setIpModule] = useState<any>(null);

  useEffect(() => {
    // Load module on client-side only
    const ip = require("ip");
    setIpModule(ip);
  }, []);

  const [inputIP, setInputIP] = useState("192.168.1.1");
  const [inputCIDR, setInputCIDR] = useState("24");
  const [result, setResult] = useState<any>(null);

  const handleCalculate = () => {
    if (!ipModule) return;

    try {
      const cidr = `${inputIP}/${inputCIDR}`;
      const subnet = ipModule.cidrSubnet(cidr);
      setResult(subnet);
    } catch (error) {
      toast.dismiss();
      toast.error("IP atau CIDR tidak valid.");
    }
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded shadow max-w-xl mt-24">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={inputIP}
          onChange={(e) => setInputIP(e.target.value)}
          placeholder="IP Address (e.g. 192.168.1.1)"
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          min={0}
          max={32}
          value={inputCIDR}
          onChange={(e) => setInputCIDR(e.target.value)}
          placeholder="CIDR (e.g. 24)"
          className="border p-2 rounded w-24"
        />
        <button
          onClick={handleCalculate}
          disabled={!ipModule}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Calculate
        </button>
      </div>

      {result && (
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div>
            <strong>IP Address:</strong> {inputIP}
          </div>
          <div>
            <strong>CIDR:</strong> /{inputCIDR}
          </div>
          <div>
            <strong>Subnet Mask:</strong> {result.subnetMask}
          </div>
          <div>
            {result && (
              <div>
                <strong>Wildcard Mask:</strong>{" "}
                {ipModule?.not(result.subnetMask)}
              </div>
            )}
          </div>
          <div>
            <strong>Network Address:</strong> {result.networkAddress}
          </div>
          <div>
            <strong>Broadcast Address:</strong> {result.broadcastAddress}
          </div>
          <div>
            <strong>First Host:</strong> {result.firstAddress}
          </div>
          <div>
            <strong>Last Host:</strong> {result.lastAddress}
          </div>
          <div>
            <strong>Usable Hosts:</strong> {result.numHosts}
          </div>
          <div>
            <strong>IP Class:</strong> {getClass(inputIP)}
          </div>
        </div>
      )}
    </div>
  );
}

function getClass(ipAddr: string): string {
  const firstOctet = parseInt(ipAddr.split(".")[0], 10);
  if (firstOctet >= 0 && firstOctet <= 127) return "A";
  if (firstOctet >= 128 && firstOctet <= 191) return "B";
  if (firstOctet >= 192 && firstOctet <= 223) return "C";
  if (firstOctet >= 224 && firstOctet <= 239) return "D (Multicast)";
  if (firstOctet >= 240) return "E (Experimental)";
  return "Unknown";
}
