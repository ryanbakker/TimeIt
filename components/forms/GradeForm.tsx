"use client";

import { gradeDefaultValues } from "@/constants";
import { createGrade } from "@/lib/database/actions/grade.actions";
import { gradeFormSchema } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import LetterGradeDropdown from "./LetterGradeDropdown";
import { Plus } from "lucide-react";

function GradeForm({ userId }: { userId: string }) {
  const form = useForm<z.infer<typeof gradeFormSchema>>({
    resolver: zodResolver(gradeFormSchema),
    defaultValues: gradeDefaultValues,
  });

  async function onSubmit(values: z.infer<typeof gradeFormSchema>) {
    try {
      const newGrade = await createGrade({
        grade: { ...values },
        userId,
        path: "/grades",
      });

      console.log(newGrade);

      if (newGrade) {
        form.reset();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AlertDialog>
      <Button
        size="lg"
        asChild
        className="flex flex-row gap-2 bg-indigo-700 hover:bg-indigo-900"
      >
        <AlertDialogTrigger>
          Add Grade <Plus size={20} />
        </AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add New Grade</AlertDialogTitle>

          <AlertDialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="assignment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assignment</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Science 101..."
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="credits"
                    render={({ field }) => (
                      <FormItem className="max-w-[30%]">
                        <FormLabel>Credits</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Credits"
                            type="number"
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
                    name="letter"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Grade</FormLabel>
                        <FormControl>
                          <LetterGradeDropdown
                            onChangeHandler={field.onChange}
                            value={field.value}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-row gap-2 justify-end mt-4">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    type="submit"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? "Submitting" : "Add Grade"}
                  </AlertDialogAction>
                </div>
              </form>
            </Form>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default GradeForm;
