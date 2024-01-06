"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { noteDefaultValues } from "@/constants";
import { NoteFormProps } from "@/types";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { noteFormSchema } from "@/lib/validator";
import { createNote, updateNote } from "@/lib/database/actions/note.actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import CategoryDropdown from "./CategoryDropdown";
import { AlignLeft, Heading1 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useState } from "react";
import MarkdownPreview from "../shared/MarkdownPreview";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

function NoteForm({ userId, type, note, noteId }: NoteFormProps) {
  const router = useRouter();
  const [postContent, setPostContent] = useState("");

  const initialValues =
    note && type === "Update"
      ? {
          ...note,
        }
      : noteDefaultValues;

  const form = useForm<z.infer<typeof noteFormSchema>>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof noteFormSchema>) {
    if (type === "Create") {
      try {
        const newNote = await createNote({
          note: { ...values, content: postContent },
          userId,
          path: "/notes",
        });

        if (newNote) {
          form.reset();
          router.push("/notes");
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!noteId) {
        router.back();
        return;
      }

      try {
        const updatedNote = await updateNote({
          userId,
          note: { ...values, _id: noteId },
          path: "/notes",
        });

        if (updatedNote) {
          form.reset();
          router.push("/notes");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  function onCancel() {
    form.reset();
    router.back();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="wrapper flex flex-col gap-4 mb-20"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center bg-gray-200 rounded-md px-2">
              <Heading1 />
              <FormControl>
                <Input
                  placeholder="Note title"
                  {...field}
                  className="input-field font-medium max-w-[1000px]"
                  autoComplete="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <CategoryDropdown
                  onChangeHandler={field.onChange}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <Popover>
            <PopoverTrigger className="flex justify-start my-4">
              <span className="text-xs font-light m-0 p-0 hover:underline underline-offset-2 text-gray-500 hover:text-gray-900">
                Markdown Tips
              </span>
            </PopoverTrigger>
            <PopoverContent className="ml-8 bg-gray-100 w-full">
              <div className="markdown-tips-container hidden md:flex gap-8">
                <ul className="markdown-tips-list">
                  <li>
                    <p>Header 1</p>
                    <span># text</span>
                  </li>
                  <li>
                    <p>Header 2</p>
                    <span>## text</span>
                  </li>
                  <li>
                    <p>Header 3</p>
                    <span>### text</span>
                  </li>
                  <li>
                    <p>Header 4</p>
                    <span>#### text</span>
                  </li>
                  <li>
                    <p>Header 5</p>
                    <span>##### text</span>
                  </li>
                  <li>
                    <p>Header 6</p>
                    <span>###### text</span>
                  </li>
                  <li>
                    <p>Bold</p>
                    <span>**text**</span>
                  </li>
                  <li>
                    <p>Italic</p>
                    <span>*text*</span>
                  </li>
                </ul>
                <span className="bg-gray-300 h-auto w-0.5 rounded-2xl"></span>
                <ul className="markdown-tips-list">
                  <li>
                    <p>Strikethrough</p>
                    <span>~~text~~</span>
                  </li>
                  <li>
                    <p>Inline Code</p>
                    <span>`text`</span>
                  </li>
                  <li>
                    <p>Blockquote</p>
                    <span>&rsaquo; text</span>
                  </li>
                  <li>
                    <p>List</p>
                    <span>- text</span>
                  </li>
                  <li>
                    <p>Link</p>
                    <span>[text](link)</span>
                  </li>
                  <li>
                    <p>Image</p>
                    <span>![alt text](url)</span>
                  </li>
                  <li>
                    <p>Divide</p>
                    <span>---</span>
                  </li>
                </ul>
              </div>
              <div className="markdown-tips-container-mobile flex md:hidden gap-8">
                <ul className="markdown-tips-list">
                  <li>
                    <p>Header 1</p>
                    <span># text</span>
                  </li>
                  <li>
                    <p>Header 2</p>
                    <span>## text</span>
                  </li>
                  <li>
                    <p>Header 3</p>
                    <span>### text</span>
                  </li>
                  <li>
                    <p>Header 4</p>
                    <span>#### text</span>
                  </li>
                  <li>
                    <p>Header 5</p>
                    <span>##### text</span>
                  </li>
                  <li>
                    <p>Header 6</p>
                    <span>###### text</span>
                  </li>
                  <li>
                    <p>Bold</p>
                    <span>**text**</span>
                  </li>
                  <li>
                    <p>Italic</p>
                    <span>*text*</span>
                  </li>

                  <li>
                    <p>Strikethrough</p>
                    <span>~~text~~</span>
                  </li>
                  <li>
                    <p>Inline Code</p>
                    <span>`text`</span>
                  </li>
                  <li>
                    <p>Blockquote</p>
                    <span>&rsaquo; text</span>
                  </li>
                  <li>
                    <p>List</p>
                    <span>- text</span>
                  </li>
                  <li>
                    <p>Link</p>
                    <span>[text](link)</span>
                  </li>
                  <li>
                    <p>Image</p>
                    <span>![alt text](url)</span>
                  </li>
                  <li>
                    <p>Divide</p>
                    <span>---</span>
                  </li>
                </ul>
              </div>
            </PopoverContent>
          </Popover>
          <Tabs defaultValue="markdown">
            <TabsList className="px-0 mb-1 mt-1 ">
              <TabsTrigger value="markdown" className="py-[10px]">
                Content Markdown
              </TabsTrigger>
              <TabsTrigger value="preview" className="py-[10px]">
                Content Preview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="markdown">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start bg-gray-200 rounded-md px-2">
                    <div className="pt-1.5 pl-0">
                      <AlignLeft />
                    </div>
                    <FormControl>
                      <Textarea
                        {...field}
                        value={postContent}
                        onChange={(e) => setPostContent(e.target.value)}
                        className="text-area resize-none min-h-[300px] overflow-scroll"
                        placeholder="Start typing"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            <TabsContent value="preview" className="markdown-preview">
              <div className="p-8 border-slate-300 bg-gray-50 border rounded-lg max-h-[30rem] overflow-scroll">
                <MarkdownPreview markdown={postContent} />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex flex-row gap-3">
          <Button
            size="lg"
            disabled={form.formState.isSubmitting}
            onClick={onCancel}
            className="bg-[#EEEEEE] shadow-none border border-gray-400 text-gray-600 hover:bg-gray-400 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="bg-indigo-600 hover:bg-indigo-800"
          >
            {form.formState.isSubmitting ? "Submitting..." : `${type} Note`}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default NoteForm;
