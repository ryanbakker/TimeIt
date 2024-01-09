import {
  createCategory,
  getAllCategories,
} from "@/lib/database/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { startTransition, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { Layers, Trash2 } from "lucide-react";
import DeleteCategory from "../shared/DeleteCategory";

type DropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
  userId: string;
};

function CategoryDropdown({ value, onChangeHandler, userId }: DropdownProps) {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = () => {
    createCategory({
      categoryName: newCategory.trim(),
      userId: userId,
    }).then((category) => {
      setCategories((prevState) => [...prevState, category]);
    });
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories({ userId });
      categoryList && setCategories(categoryList as ICategory[]);
    };

    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="shadow-none border-0 bg-gray-200 dark:bg-slate-800 flex flex-row items-center space-x-4 pl-3 h-[50px] focus:ring-0 w-full justify-start">
        <Layers />
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent className="bg-gray-200 dark:bg-slate-800 flex flex-col gap-1">
        {categories.length > 0 &&
          categories
            .slice()
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((category) => (
              <p className="flex flex-row justify-between gap-4 pr-2 items-center py-1">
                <SelectItem
                  key={category._id}
                  value={category._id}
                  className="!bg-gray-200 hover:!bg-gray-300 cursor-pointer text-sm transition-all !flex !flex-row !justify-between !w-full capitalize"
                >
                  {category.name}
                </SelectItem>
                <DeleteCategory categoryId={category._id} />
              </p>
            ))}

        <AlertDialog>
          <AlertDialogTrigger className="h-[40px] px-2 w-full text-left rounded-md bg-indigo-200 text-indigo-800 hover:bg-indigo-400 transition-all text-sm mt-1">
            Create Category
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="English 101..."
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
}

export default CategoryDropdown;
