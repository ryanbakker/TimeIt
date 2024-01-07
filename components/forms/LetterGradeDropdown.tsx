import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  createLetter,
  getAllLetters,
} from "@/lib/database/actions/letter.actions";
import { ILetter } from "@/lib/database/models/letter.model";

type LetterGradeProps = {
  value?: string;
  onChangeHandler?: () => void;
};

function LetterGradeDropdown({ value, onChangeHandler }: LetterGradeProps) {
  const [letters, setLetters] = useState<ILetter[]>([]);
  const [newLetter, setNewLetter] = useState("");

  const handleAddLetter = () => {
    createLetter({
      letterGrade: newLetter.trim(),
    }).then((letter) => {
      setLetters((prevState) => [...prevState, letter]);
    });
  };

  useEffect(() => {
    const getLetters = async () => {
      const letterList = await getAllLetters();

      letterList && setLetters(letterList as ILetter[]);
    };

    getLetters();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger>
        <SelectValue placeholder="Choose Letter Grade" />
      </SelectTrigger>
      <SelectContent>
        {letters.length > 0 &&
          letters.map((letter) => (
            <SelectItem key={letter._id} value={letter._id}>
              {letter.grade}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}

export default LetterGradeDropdown;
