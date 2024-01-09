import MainSchedule from "@/components/scheduler/MainSchedule";
import ScheduleList from "@/components/scheduler/ScheduleList";
import BackButton from "@/components/shared/BackButton";
import Heading from "@/components/shared/Heading";
import { auth } from "@clerk/nextjs";

function Schedule() {
  const { sessionClaims } = auth();
  const creator = sessionClaims?.userId as any;

  return (
    <div className="bg-neutral-50 dark:bg-slate-800">
      <Heading
        title="Schedule"
        subtitle="Add your timetable and never lose it"
      />

      <section className="wrapper grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-5">
          <BackButton />
          <ScheduleList creator={creator} />
          <p className="-mt-3 text-xs text-neutral-400 dark:text-neutral-500 font-light w-full text-center">
            Scroll to view more
          </p>
        </div>

        <div className="md:col-span-2">
          <MainSchedule creator={creator} />
        </div>
      </section>
    </div>
  );
}

export default Schedule;
