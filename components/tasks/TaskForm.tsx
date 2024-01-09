"use client";

import * as z from "zod";
import { Plus } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { taskFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskDefaultValues } from "@/constants";
import { createTask } from "@/lib/database/actions/task.actions";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { DatePicker } from "@tremor/react";
import PriorityDropdown from "./PriorityDropdown";

function TaskForm({ userId }: { userId: string }) {
  const form = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: taskDefaultValues,
  });

  async function onSubmit(values: z.infer<typeof taskFormSchema>) {
    try {
      const adjustedDate = new Date(values.deadline);
      const utcDate = new Date(adjustedDate.toISOString());

      const newTask = await createTask({
        task: { ...values, deadline: utcDate },
        userId,
        path: "/tasks",
      });

      if (newTask) {
        form.reset();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="lg"
          className="flex flex-row items-center gap-2 w-full md:w-fit"
        >
          <Plus /> Create Task
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="font-semibold text-indigo-600 text-xl">
          Create New Task
        </AlertDialogHeader>
        <AlertDialogDescription>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Science project..."
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-row gap-3 items-center">
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Deadline</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onValueChange={(date) => field.onChange(date)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="priorityId"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Priority Level</FormLabel>
                      <FormControl>
                        <PriorityDropdown
                          onChangeHandler={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        autoComplete="off"
                        className="resize-none"
                        placeholder="The brief and guidelines..."
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-2 justify-end mt-4">
                <AlertDialogCancel onClick={() => form.reset()}>
                  Cancel
                </AlertDialogCancel>
                <Button
                  type="submit"
                  disabled={form.formState.isSubmitting}
                  className="flex flex-row gap-2 bg-indigo-600 hover:bg-indigo-900 dark:text-white"
                >
                  {form.formState.isSubmitting ? "Submitting..." : "Add Task"}
                </Button>
              </div>
            </form>
          </Form>
        </AlertDialogDescription>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default TaskForm;
