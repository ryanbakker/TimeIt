import Logo from "./Logo";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

function Header() {
  return (
    <header className="bg-gradient-to-tr from-indigo-800 via-indigo-900 to-indigo-950">
      <div className="max-w-7xl lg:mx-auto px-5 py-4 md:px-10 xl:px-0 w-full flex flex-row justify-between">
        <Logo />

        <NavDesktop />
        <NavMobile />
      </div>
    </header>
  );
}

export default Header;
