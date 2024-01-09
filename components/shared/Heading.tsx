import { FileMinus, FilePlus } from "lucide-react";

type HeadingProps = {
  title: string;
  subtitle?: string;
  icon?: string;
};

function Heading({ title, subtitle, icon }: HeadingProps) {
  return (
    <div className="wrapper">
      <div className="relative w-fit pt-8 flex flex-row items-center gap-2 text-indigo-900 dark:text-indigo-50">
        {icon === "create-doc" && <FilePlus size={34} />}
        {icon === "edit-doc" && <FileMinus size={34} />}
        <div>
          <h1 className="text-3xl font-semibold text-indigo-900 dark:text-indigo-50">
            {title}
          </h1>

          <div className="h-[3px] w-full bg-indigo-900 dark:bg-indigo-50 rounded-full" />
        </div>
      </div>
      {subtitle && (
        <h2 className="pt-2 text-slate-600 dark:text-slate-400 font-light max-w-[540px]">
          {subtitle}
        </h2>
      )}
    </div>
  );
}

export default Heading;
