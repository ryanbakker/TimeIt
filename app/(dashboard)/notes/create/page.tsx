import NoteForm from "@/components/forms/NoteForm";
import Heading from "@/components/shared/Heading";
import { auth } from "@clerk/nextjs";

function CreateNote() {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <>
      <Heading
        title="Create Note"
        subtitle="Create a new note to add to your collection"
        icon="create-doc"
      />

      <NoteForm type="Create" userId={userId} />
    </>
  );
}

export default CreateNote;
