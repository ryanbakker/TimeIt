import GradeForm from "@/components/forms/GradeForm";
import { Grades, columns } from "@/components/gradesTable/columns";
import { GradeTable } from "@/components/gradesTable/grade-table";
import GradeChart from "@/components/shared/GradeChart";
import Heading from "@/components/shared/Heading";
import { getAllGradesByUser } from "@/lib/database/actions/grade.actions";
import { getLetterById } from "@/lib/database/actions/letter.actions";
import { formatSimpleDate } from "@/lib/utils";
import { auth } from "@clerk/nextjs";

async function getData(): Promise<Grades[]> {
  const { sessionClaims } = auth();
  const creator = sessionClaims?.userId as any;

  const getGrades = await getAllGradesByUser({ creator: creator });
  const grades = getGrades?.data;

  // Map the grades to the desired format
  const mappedGrades: Grades[] = await Promise.all(
    grades.map(async (grade: any) => {
      const letter = await getLetterById(grade.letter);

      console.log(letter);

      return {
        id: grade._id,
        assignment: grade.assignment || "N/A",
        credits: grade.credits || "N/A",
        created: formatSimpleDate(grade.createdAt) || "N/A",
        grade: letter ? (letter.grade as string) : "N/A",
      };
    })
  );

  return mappedGrades;
}

async function Grades() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const data = await getData();

  console.log("Filtered Data => ", data);

  return (
    <div className="bg-white dark:bg-[#121827]">
      <Heading title="Grades" subtitle="Add and understand your grades." />

      <section>
        <div className="wrapper grid grid-cols-1 md:grid-cols-2">
          <div>
            <GradeForm userId={userId} />

            <div className="mt-8">
              <GradeTable columns={columns} data={data} />
            </div>
          </div>

          <div className="flex items-start justify-start w-full">
            <GradeChart grades={data} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Grades;
