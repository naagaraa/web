import Link from "next/link";

export default function Home() {
  return (
    <section>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-4xl font-bold">Eka Jaya Nagara</h1>
            <p className="py-3">Software Engineer</p>
            <p className="-mt-2 mb-3">PHP - Laravel - JS - React</p>
            <Link
              href="/about"
              className="btn bg-lime-500 rounded-r-badge rounded-l-badge"
            >
              Touch Me
            </Link>
            <div className="card-actions mt-5 justify-center">
              <Link href={"/"} className="badge badge-outline">
                Home
              </Link>
              <Link href={"/about"} className="badge badge-outline">
                Who AM I
              </Link>
              <Link href={"/project"} className="badge badge-outline">
                Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
