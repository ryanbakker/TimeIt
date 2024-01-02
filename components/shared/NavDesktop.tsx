import { UserButton } from "@clerk/nextjs";
import NavList from "./NavList";
import { ThemeToggler } from "../ThemeToggler";

function NavDesktop() {
  return (
    <nav className="hidden md:flex items-center gap-6 flex-row">
      <NavList />

      <div className="flex gap-6 items-center">
        <ThemeToggler />
        <UserButton afterSignOutUrl="/sign-in" />
      </div>
    </nav>
  );
}

export default NavDesktop;
