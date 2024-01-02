import Image from "next/image";

// Theme - Noto Sans

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen bg-gradient-to-tl from-indigo-800 via-slate-900 to-indigo-950 overflow-hidden">
      <div className="max-w-7xl lg:mx-auto px-5 md:px-10 xl:px-0 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
          <section className="flex justify-center items-center">
            {children}
          </section>
          <section className="flex justify-end items-center flex-col gap-12">
            <div className="flex flex-col gap-2 w-full md:px-16">
              <h1 className="text-5xl font-semibold text-white">TimeIt</h1>
              <p className="font-light tracking-wide text-indigo-300">
                Get the most out of your education
              </p>
            </div>
            <Image
              src="/images/authImg.png"
              alt="Student Cartoon"
              width={500}
              height={500}
            />
          </section>
        </div>
      </div>
    </main>
  );
};

export default Layout;
