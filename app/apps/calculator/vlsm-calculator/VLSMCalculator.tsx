"use client";

import React, { useState } from "react";

interface SubnetResult {
  subnet: string;
  subnetMask: string;
  usableHosts: number;
  broadcast: string;
}

const VLSMCalculator = () => {
  const [baseIp, setBaseIp] = useState("192.168.1.0");
  const [requiredHosts, setRequiredHosts] = useState<string[]>(["50", "30"]);
  const [results, setResults] = useState<SubnetResult[]>([]);

  const calculateVLSM = () => {
    const sortedHosts = [...requiredHosts]
      .map((h) => parseInt(h))
      .filter((n) => !isNaN(n))
      .sort((a, b) => b - a);

    let currentIp = ipToNumber(baseIp);
    const output: SubnetResult[] = [];

    for (const hosts of sortedHosts) {
      const bits = Math.ceil(Math.log2(hosts + 2));
      const subnetSize = Math.pow(2, bits);
      const subnetMask = 32 - bits;

      const subnetIp = numberToIp(currentIp);
      const broadcast = numberToIp(currentIp + subnetSize - 1);

      output.push({
        subnet: `${subnetIp}/${subnetMask}`,
        subnetMask: cidrToMask(subnetMask),
        usableHosts: subnetSize - 2,
        broadcast,
      });

      currentIp += subnetSize;
    }

    setResults(output);
  };

  const addHostField = () => {
    setRequiredHosts([...requiredHosts, ""]);
  };

  const updateHostField = (index: number, value: string) => {
    const updated = [...requiredHosts];
    updated[index] = value;
    setRequiredHosts(updated);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4 mt-24">
      <h1 className="text-xl font-bold">VLSM Calculator</h1>

      <div>
        <label className="font-medium">Base IP Address:</label>
        <input
          type="text"
          className="border p-2 w-full rounded mt-1"
          value={baseIp}
          onChange={(e) => setBaseIp(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="font-medium">Required Hosts:</label>
        {requiredHosts.map((host, i) => (
          <input
            key={i}
            type="number"
            value={host}
            onChange={(e) => updateHostField(i, e.target.value)}
            className="border p-2 w-full rounded"
            placeholder={`Hosts for subnet ${i + 1}`}
          />
        ))}
        <button
          onClick={addHostField}
          className="bg-gray-200 px-4 py-2 mt-2 rounded hover:bg-gray-300"
        >
          + Add Subnet
        </button>
      </div>

      <button
        onClick={calculateVLSM}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Calculate
      </button>

      {results.length > 0 && (
        <div className="mt-6 space-y-4">
          <h2 className="text-lg font-semibold">Results</h2>
          {results.map((r, i) => (
            <div key={i} className="border p-4 rounded shadow">
              <p>
                <strong>Subnet:</strong> {r.subnet}
              </p>
              <p>
                <strong>Subnet Mask:</strong> {r.subnetMask}
              </p>
              <p>
                <strong>Usable Hosts:</strong> {r.usableHosts}
              </p>
              <p>
                <strong>Broadcast:</strong> {r.broadcast}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VLSMCalculator;

function ipToNumber(ip: string): number {
  return ip
    .split(".")
    .map(Number)
    .reduce((acc, val) => (acc << 8) + val);
}

function numberToIp(num: number): string {
  return [24, 16, 8, 0].map((s) => (num >> s) & 255).join(".");
}

function cidrToMask(bits: number): string {
  const mask = (0xffffffff << (32 - bits)) >>> 0;
  return [24, 16, 8, 0].map((s) => (mask >> s) & 255).join(".");
}
