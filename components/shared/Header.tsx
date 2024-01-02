import Logo from "./Logo";
import NavDesktop from "./NavDesktop";

function Header() {
  return (
    <header className="bg-gradient-to-tr from-indigo-800 via-indigo-900 to-indigo-950">
      <div className="wrapper flex flex-row justify-between">
        <Logo />

        <NavDesktop />
      </div>
    </header>
  );
}

export default Header;
