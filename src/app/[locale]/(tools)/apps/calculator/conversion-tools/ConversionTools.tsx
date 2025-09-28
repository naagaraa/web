"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

export interface ConversionOption {
  id: string;
  label: string;
  units: string[];
  convert: (val: number, from: string, to: string) => number;
  chartable?: boolean;
}

export const conversionOptions: ConversionOption[] = [
  {
    id: "temperature",
    label: "Temperature",
    units: ["°C", "°F", "K"],
    convert: (val, from, to) => {
      if (from === "°C") {
        if (to === "°F") return (val * 9) / 5 + 32;
        if (to === "K") return val + 273.15;
      }
      if (from === "°F") {
        if (to === "°C") return ((val - 32) * 5) / 9;
        if (to === "K") return ((val - 32) * 5) / 9 + 273.15;
      }
      if (from === "K") {
        if (to === "°C") return val - 273.15;
        if (to === "°F") return ((val - 273.15) * 9) / 5 + 32;
      }
      return val;
    },
    chartable: true,
  },
  {
    id: "weight",
    label: "Weight",
    units: ["kg", "g", "lb", "oz", "st"],
    convert: (val, from, to) => {
      let kg = val;
      switch (from) {
        case "g":
          kg = val / 1000;
          break;
        case "lb":
          kg = val / 2.2046226218;
          break;
        case "oz":
          kg = val / 35.27396195;
          break;
        case "st":
          kg = val * 6.35029318;
          break;
      }
      switch (to) {
        case "kg":
          return kg;
        case "g":
          return kg * 1000;
        case "lb":
          return kg * 2.2046226218;
        case "oz":
          return kg * 35.27396195;
        case "st":
          return kg / 6.35029318;
      }
      return val;
    },
    chartable: true,
  },
  {
    id: "distance",
    label: "Distance / Length",
    units: ["m", "km", "cm", "mm", "ft", "in", "mi", "yd", "nm"],
    convert: (val, from, to) => {
      let m = val;
      switch (from) {
        case "km":
          m = val * 1000;
          break;
        case "cm":
          m = val / 100;
          break;
        case "mm":
          m = val / 1000;
          break;
        case "ft":
          m = val * 0.3048;
          break;
        case "in":
          m = val * 0.0254;
          break;
        case "mi":
          m = val * 1609.344;
          break;
        case "yd":
          m = val * 0.9144;
          break;
        case "nm":
          m = val * 1852;
          break;
      }
      switch (to) {
        case "m":
          return m;
        case "km":
          return m / 1000;
        case "cm":
          return m * 100;
        case "mm":
          return m * 1000;
        case "ft":
          return m / 0.3048;
        case "in":
          return m / 0.0254;
        case "mi":
          return m / 1609.344;
        case "yd":
          return m / 0.9144;
        case "nm":
          return m / 1852;
      }
      return val;
    },
    chartable: true,
  },
  {
    id: "volume",
    label: "Volume / Capacity",
    units: ["L", "mL", "gal-US", "gal-UK", "qt", "cup", "fl oz"],
    convert: (val, from, to) => {
      let L = val;
      switch (from) {
        case "mL":
          L = val / 1000;
          break;
        case "gal-US":
          L = val * 3.785411784;
          break;
        case "gal-UK":
          L = val * 4.54609;
          break;
        case "qt":
          L = val * 0.946353;
          break;
        case "cup":
          L = val * 0.24;
          break;
        case "fl oz":
          L = val * 0.0295735;
          break;
      }
      switch (to) {
        case "L":
          return L;
        case "mL":
          return L * 1000;
        case "gal-US":
          return L / 3.785411784;
        case "gal-UK":
          return L / 4.54609;
        case "qt":
          return L / 0.946353;
        case "cup":
          return L / 0.24;
        case "fl oz":
          return L / 0.0295735;
      }
      return val;
    },
    chartable: true,
  },
  {
    id: "speed",
    label: "Speed",
    units: ["m/s", "km/h", "mph", "knots"],
    convert: (val, from, to) => {
      let ms = val;
      switch (from) {
        case "km/h":
          ms = val / 3.6;
          break;
        case "mph":
          ms = val * 0.44704;
          break;
        case "knots":
          ms = val * 0.514444;
          break;
      }
      switch (to) {
        case "m/s":
          return ms;
        case "km/h":
          return ms * 3.6;
        case "mph":
          return ms / 0.44704;
        case "knots":
          return ms / 0.514444;
      }
      return val;
    },
    chartable: true,
  },
  {
    id: "pressure",
    label: "Pressure",
    units: ["Pa", "kPa", "bar", "psi", "atm", "mmHg"],
    convert: (val, from, to) => {
      let Pa = val;
      switch (from) {
        case "kPa":
          Pa = val * 1000;
          break;
        case "bar":
          Pa = val * 100000;
          break;
        case "psi":
          Pa = val * 6894.757;
          break;
        case "atm":
          Pa = val * 101325;
          break;
        case "mmHg":
          Pa = val * 133.322368;
          break;
      }
      switch (to) {
        case "Pa":
          return Pa;
        case "kPa":
          return Pa / 1000;
        case "bar":
          return Pa / 100000;
        case "psi":
          return Pa / 6894.757;
        case "atm":
          return Pa / 101325;
        case "mmHg":
          return Pa / 133.322368;
      }
      return val;
    },
    chartable: true,
  },
  {
    id: "energy",
    label: "Energy",
    units: ["J", "kJ", "cal", "kcal", "kWh", "BTU"],
    convert: (val, from, to) => {
      let J = val;
      switch (from) {
        case "kJ":
          J = val * 1000;
          break;
        case "cal":
          J = val * 4.184;
          break;
        case "kcal":
          J = val * 4184;
          break;
        case "kWh":
          J = val * 3.6e6;
          break;
        case "BTU":
          J = val * 1055.06;
          break;
      }
      switch (to) {
        case "J":
          return J;
        case "kJ":
          return J / 1000;
        case "cal":
          return J / 4.184;
        case "kcal":
          return J / 4184;
        case "kWh":
          return J / 3.6e6;
        case "BTU":
          return J / 1055.06;
      }
      return val;
    },
    chartable: true,
  },
  {
    id: "data",
    label: "Data Storage",
    units: ["B", "KB", "MB", "GB", "TB", "KiB", "MiB", "GiB", "TiB"],
    convert: (val, from, to) => {
      const mapping: Record<string, number> = {
        B: 1,
        KB: 1e3,
        MB: 1e6,
        GB: 1e9,
        TB: 1e12,
        KiB: 1024,
        MiB: 1024 ** 2,
        GiB: 1024 ** 3,
        TiB: 1024 ** 4,
      };
      return (val * mapping[from]) / mapping[to];
    },
    chartable: true,
  },
];

export default function ConversionTools() {
  const [selectedCategory, setSelectedCategory] = useState<ConversionOption>(
    conversionOptions[0]
  );
  const [inputValue, setInputValue] = useState<number>(0);
  const [fromUnit, setFromUnit] = useState<string>(
    conversionOptions[0].units[0]
  );
  const [toUnit, setToUnit] = useState<string>(conversionOptions[0].units[1]);

  const handleCategoryChange = (id: string) => {
    const cat = conversionOptions.find((c) => c.id === id);
    if (cat) {
      setSelectedCategory(cat);
      setFromUnit(cat.units[0]);
      setToUnit(cat.units[1] || cat.units[0]);
      setInputValue(0);
    }
  };

  const chartData = selectedCategory.units.map((unit) => ({
    unit,
    value: selectedCategory.convert(inputValue, fromUnit, unit),
    highlight: unit === toUnit,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column */}
      <section className="space-y-6 border border-gray-800 p-6 bg-white shadow">
        <h2 className="text-xl font-semibold text-gray-800">
          {selectedCategory.label} Converter
        </h2>

        <select
          value={selectedCategory.id}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full border border-gray-300 p-2 bg-white text-gray-800"
        >
          {conversionOptions.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.label}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            value={isNaN(inputValue) ? "" : inputValue}
            onChange={(e) => setInputValue(parseFloat(e.target.value) || 0)}
            className="border border-gray-300 p-2 bg-white text-gray-800 w-full"
          />

          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="border border-gray-300 p-2 bg-white text-gray-800 w-full"
          >
            {selectedCategory.units.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
          className="w-full border border-gray-300 p-2 bg-white text-gray-800"
        >
          {selectedCategory.units.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>

        <p className="text-gray-800 font-medium">
          {inputValue} {fromUnit} ={" "}
          <span className="font-semibold">
            {selectedCategory.convert(inputValue, fromUnit, toUnit).toFixed(6)}{" "}
            {toUnit}
          </span>
        </p>
      </section>

      {/* Right Column */}
      <section className="border border-gray-800 p-6 bg-white shadow">
        <h3 className="font-semibold text-gray-800 mb-4">
          All Units Visualization
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="unit" />
            <YAxis />
            <Tooltip
              formatter={(val: number) => val.toFixed(6)}
              labelFormatter={(label) => `Unit: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
}
