export default function Home() {
  return (
    <>
      <section className="grid hero-content text-center items-start sm:items-start justify-items-center mt-36">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold">Eka Jaya Nagara</h1>
          <p className="py-3">Software Engineer</p>
          <p className="-mt-2 mb-3">PHP - Laravel - JS - React</p>
        </div>
      </section>

      <section className="w-3/4 mx-auto mt-36">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Music Playlist
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                music favorite playlist
              </p>

              <section className="music grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <article className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
                    <div className="p-4 sm:p-6">
                      <a href="#">
                        <h3 className="mt-0.5 text-lg text-white">
                          How to position your furniture for positivity
                        </h3>
                      </a>
                      <p className="mt-2 line-clamp-3 text-sm/relaxed text-white/95">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Recusandae dolores, possimus pariatur animi
                        temporibus nesciunt praesentium dolore sed nulla ipsum
                        eveniet corporis quidem, mollitia itaque minus soluta,
                        voluptates neque explicabo tempora nisi culpa eius atque
                        dignissimos. Molestias explicabo corporis voluptatem?
                      </p>
                    </div>
                  </div>
                </article>

                <article className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
                    <div className="p-4 sm:p-6">
                      <a href="#">
                        <h3 className="mt-0.5 text-lg text-white">
                          How to organize your space effectively
                        </h3>
                      </a>
                      <p className="mt-2 line-clamp-3 text-sm/relaxed text-white/95">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Recusandae dolores, possimus pariatur animi
                        temporibus nesciunt praesentium dolore sed nulla ipsum
                        eveniet corporis quidem, mollitia itaque minus soluta,
                        voluptates neque explicabo tempora nisi culpa eius atque
                        dignissimos. Molestias explicabo corporis voluptatem?
                      </p>
                    </div>
                  </div>
                </article>

                <article className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64">
                    <div className="p-4 sm:p-6">
                      <a href="#">
                        <h3 className="mt-0.5 text-lg text-white">
                          Tips for creating a cozy home environment
                        </h3>
                      </a>
                      <p className="mt-2 line-clamp-3 text-sm/relaxed text-white/95">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Recusandae dolores, possimus pariatur animi
                        temporibus nesciunt praesentium dolore sed nulla ipsum
                        eveniet corporis quidem, mollitia itaque minus soluta,
                        voluptates neque explicabo tempora nisi culpa eius atque
                        dignissimos. Molestias explicabo corporis voluptatem?
                      </p>
                    </div>
                  </div>
                </article>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className="w-3/4 mx-auto mt-36">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Certification
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                Certification what i got it
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-3/4 mx-auto mt-36">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Activity
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">Coding Activity</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
