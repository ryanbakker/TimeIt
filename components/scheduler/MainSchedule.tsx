"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useEffect, useState } from "react";
import { getAllEventsByUser } from "@/lib/database/actions/event.actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

function renderEventContent(eventInfo: any) {
  const maxLength = 15;

  const truncatedTitle =
    eventInfo.event.title.length > maxLength
      ? `${eventInfo.event.title.substring(0, maxLength)}...`
      : eventInfo.event.title;

  console.log("Event Info => ", eventInfo.event);

  return (
    <div className="flex flex-wrap overflow-hidden bg-indigo-200 px-2 py-1.5 rounded-sm w-full event-button hover:bg-indigo-300 transition-all">
      <AlertDialog>
        <AlertDialogTrigger title="Event Details">
          <p className="font-semibold text-xs text-indigo-900 overflow-hidden pr-1">
            {truncatedTitle}
          </p>
        </AlertDialogTrigger>
        <AlertDialogContent className="dark:bg-slate-800">
          <AlertDialogHeader>
            <AlertDialogTitle>{eventInfo.event.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {eventInfo.event.extendedProps.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function MainSchedule({ creator }: { creator: string }) {
  const [events, setEvents] = useState<Event[]>([]);

  console.log("EVENTS ===> ", events);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEventsByUser({ creator });

        if (response && response.data) {
          const transformedEvents = response.data.map((event: any) => ({
            id: event._id,
            title: event.title,
            description: event.description,
            start: event.dateTime,
          }));

          setEvents(transformedEvents);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [creator]);

  return (
    <FullCalendar
      plugins={[resourceTimelinePlugin, dayGridPlugin, timeGridPlugin]}
      events={events}
      eventContent={renderEventContent}
      headerToolbar={{
        left: "prev next",
        center: "title",
        right: "today",
      }}
      initialView="dayGridMonth"
      nowIndicator={true}
      selectable={true}
      selectMirror={true}
      dayMaxEventRows={1}
    />
  );
}

export default MainSchedule;
