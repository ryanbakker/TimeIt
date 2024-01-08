"use client";

import * as z from "zod";
import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { eventFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventDefaultValues } from "@/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { createEvent } from "@/lib/database/actions/event.actions";
import { DatePicker } from "@tremor/react";
import { Textarea } from "../ui/textarea";

function ScheduleForm({ userId }: { userId: string }) {
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: eventDefaultValues,
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    try {
      // Adjust the date to UTC
      const adjustedDate = new Date(values.dateTime);
      const utcDate = new Date(adjustedDate.toISOString());

      // Push the whole day forward
      utcDate.setUTCDate(utcDate.getUTCDate() + 1);
      utcDate.setUTCHours(1, 0, 0, 0);

      const newEvent = await createEvent({
        event: { ...values, dateTime: utcDate },
        userId,
        path: "/events",
      });

      if (newEvent) {
        form.reset();
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <AlertDialog>
      <Button
        asChild
        size="lg"
        className="flex flex-row gap-1 bg-indigo-600 hover:bg-indigo-900 dark:text-white"
      >
        <AlertDialogTrigger className="w-full">
          <Plus size={20} /> Create Event
        </AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create New Event</AlertDialogTitle>

          <AlertDialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="gap-3 flex flex-col"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Science assignment..."
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onValueChange={(date) => field.onChange(date)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          autoComplete="off"
                          className="resize-none"
                          placeholder="Located in lab..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-row gap-2 justify-end mt-4">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? "Submitting" : "Add Event"}
                  </Button>
                </div>
              </form>
            </Form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ScheduleForm;
