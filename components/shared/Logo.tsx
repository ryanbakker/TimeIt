import { Noto_Sans } from "next/font/google";

const noto = Noto_Sans({ subsets: ["latin"] });

function Logo() {
  return (
    <h2 className={`text-2xl font-semibold text-white ${noto.className}`}>
      TimeIt.
    </h2>
  );
}

export default Logo;
