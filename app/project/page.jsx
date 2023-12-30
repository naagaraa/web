import Link from "next/link";
import React from "react";

export default function Project() {
  return (
    <div className="container mx-auto mt-10 mb-10 ps-3 pe-3">
      <div className="min-h-screen">
        <h1 className="font-bold">Simple Project</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
          <Link href="/project/whatsapp">
            <div className="card-body flex-grow bg-slate-800 text-lime-500 rounded-box">
              <h2 className="card-title text-slate-200">WhatsApps Direct</h2>
              <p>Open Chat People WA without save the number</p>
              <div className="card-actions mt-5 justify-end">
                <div className="badge badge-outline">Direct</div>
                <div className="badge badge-outline">NextJS</div>
                <div className="badge badge-outline">Javacript</div>
              </div>
            </div>
          </Link>
          <a href="https://nagara.gitbook.io/code-zero-project/"  target="_blank">
            <div className="card-body flex-grow bg-slate-800 text-lime-500 rounded-box">
              <h2 className="card-title text-slate-200">FrameWork</h2>
              <p>MVC Native PHP native for Final Education Degree</p>
              <div className="card-actions mt-5 justify-end">
              <div className="badge badge-outline">PHP</div>
                <div className="badge badge-outline">Native</div>
                <div className="badge badge-outline">Composer</div>
              </div>
            </div>
          </a>
          <a href="https://naagaraa.github.io/web-metode-skripsi/" target="_blank">
            <div className="card-body flex-grow bg-slate-800 text-lime-500 rounded-box">
              <h2 className="card-title text-slate-200">PHP library</h2>
              <p>personal package include, metode statistic</p>
              <div className="card-actions mt-5 justify-end">
                <div className="badge badge-outline">PHP</div>
                <div className="badge badge-outline">Native</div>
                <div className="badge badge-outline">Composer</div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
