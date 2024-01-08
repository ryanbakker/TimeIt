"use client";

import ScheduleForm from "./ScheduleForm";
import { useEffect, useState } from "react";
import { getAllEventsByUser } from "@/lib/database/actions/event.actions";
import { formatSimpleDate } from "@/lib/utils";
import DeleteBtn from "./DeleteBtn";

interface Event {
  _id: string;
  title: string;
  dateTime: string;
}

function ScheduleList({ creator }: { creator: string }) {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEventsByUser({ creator });

        if (response && response.data) {
          setEvents(response.data);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [creator]);

  return (
    <div className="bg-neutral-200 shadow-lg p-2 rounded-lg">
      <div className="mb-3">
        <ScheduleForm userId={creator} />
      </div>
      <ul className="flex flex-col gap-3 max-h-[505px] overflow-scroll rounded-md">
        {events.map((event) => (
          <li
            key={event._id}
            className="w-full bg-white shadow-md rounded-md p-3 flex flex-row justify-between items-center"
          >
            <div>
              <h5 className="font-medium text-base">{event.title}</h5>
              <h6 className="font-light text-sm">
                {formatSimpleDate(event.dateTime)}
              </h6>
            </div>

            <DeleteBtn eventId={event._id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ScheduleList;
