import React from "react";
import Link from "next/link";

export default function About() {
  return (
    <div className="container mx-auto mt-10 mb-10 ps-3 pe-3">
      <div className="min-h-screen -mb-30">
        <div className="grid grid-cols-1 gap-4 mt-5">
          <h1 className="mt-20  text-4xl font-bold">Eka Jaya Nagara</h1>
          <p className="py-3">Software Engineer</p>
          <p className="-mt-2 mb-3">
            Eka Jaya Nagara is a Software Engineer at Softwarehouse. Eka is
            passionate Codes and Backend Development. He loves to Otomotif &
            code web. For further inquiries, Eka can be reached through the
            following E-mail: ekabersinar@gmail.com
          </p>
          <p>
            As a backend developer with expertise in Laravel, I bring a robust
            skill set to web development. Proficient in PHP and Laravel, I have
            successfully designed and optimized database schemas, developed
            RESTful services, and seamlessly integrated backend functionalities
            with various JavaScript frameworks for efficient frontend
            collaboration. My experience includes API development, version
            control using Git, and a commitment to writing unit tests for secure
            and scalable applications. With a keen focus on performance
            optimization. I prioritize clear and
            comprehensive documentation and am dedicated to staying updated on
            the latest Laravel developments, showcasing a commitment to
            continuous learning in the dynamic field of web development.
          </p>
          <div className="card-actions mt-5 justify-center">
            <Link href={"/"} className="badge badge-outline">Home</Link>
            <Link href={"/about"} className="badge badge-outline">Who AM I</Link>
            <Link href={"/project"} className="badge badge-outline">Project</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
