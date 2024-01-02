import { Noto_Sans } from "next/font/google";

const noto = Noto_Sans({ subsets: ["latin"] });

function Footer() {
  return (
    <footer className="border-t">
      <div className="wrapper">
        <h2
          className={`${noto.className} font-semibold text-indigo-950 dark:text-indigo-100`}
        >
          TimeIt.
        </h2>
      </div>
    </footer>
  );
}

export default Footer;
