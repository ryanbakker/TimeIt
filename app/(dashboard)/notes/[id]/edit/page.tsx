import NoteForm from "@/components/forms/NoteForm";
import Heading from "@/components/shared/Heading";
import { getNoteById } from "@/lib/database/actions/note.actions";
import { auth } from "@clerk/nextjs";

type UpdateNoteProps = {
  params: {
    id: string;
  };
};

async function EditNote({ params: { id } }: UpdateNoteProps) {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const note = await getNoteById(id);

  return (
    <>
      <Heading
        title="Edit Note"
        subtitle="Make any desired changes and hit save"
        icon="edit-doc"
      />

      <NoteForm userId={userId} note={note} noteId={note._id} type="Update" />
    </>
  );
}

export default EditNote;
