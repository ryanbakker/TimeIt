import GradeForm from "@/components/forms/GradeForm";
import { columns } from "@/components/gradesTable/columns";
import { GradeTable } from "@/components/gradesTable/grade-table";
import BackButton from "@/components/shared/BackButton";
import GradeChart from "@/components/shared/GradeChart";
import Heading from "@/components/shared/Heading";
import { Button } from "@/components/ui/button";
import { getData } from "@/lib/utils";
import { auth } from "@clerk/nextjs";

async function GradesPage() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const data = await getData();

  return (
    <div className="bg-white dark:bg-[#121827]">
      <Heading title="Grades" subtitle="Add and understand your grades." />

      <section>
        <div className="wrapper grid grid-cols-1 md:grid-cols-2">
          <div>
            <div className="flex flex-row gap-8 md:gap-0 justify-between">
              <BackButton />
              <GradeForm userId={userId} />
            </div>

            <div className="mt-8">
              <GradeTable columns={columns} data={data} />
            </div>
          </div>

          <div className="flex items-start justify-start w-full">
            <GradeChart grades={data} size="lg" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default GradesPage;
