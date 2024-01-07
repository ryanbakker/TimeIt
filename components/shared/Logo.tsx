import { Noto_Sans } from "next/font/google";
import Link from "next/link";

const noto = Noto_Sans({ subsets: ["latin"] });

function Logo() {
  return (
    <Link href="/">
      <h2 className={`text-3xl font-semibold text-white ${noto.className}`}>
        TimeIt.
      </h2>
    </Link>
  );
}

export default Logo;
