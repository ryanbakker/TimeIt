import Link from "next/link";
import { Button } from "../ui/button";
import { Award, ListTodo, StickyNote } from "lucide-react";

type ActionButtonProps = {
  icon: "Award" | "Note" | "Todo";
  title: string;
  route: string;
};

function ActionButton({ icon, title, route }: ActionButtonProps) {
  return (
    <Button size="lg" asChild className="w-full sm:w-fit gap-2">
      <Link href="/grades">
        <Award
          size={20}
          className={`${icon === "Award" ? "block" : "hidden"}`}
        />{" "}
        <StickyNote
          size={20}
          className={`${icon === "Note" ? "block" : "hidden"}`}
        />{" "}
        <ListTodo
          size={20}
          className={`${icon === "Todo" ? "block" : "hidden"}`}
        />{" "}
        {title}
      </Link>
    </Button>
  );
}

export default ActionButton;
