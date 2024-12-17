import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Calendar, Edit3, FileText, Trash2 } from "lucide-react";
import moment from "moment";
import EditNote from "./EditNote";
import { useState } from "react";
import CrmAlert from "@/components/ui/alert";
import { toast } from "sonner";
import Empty from "@/components/Empty/Empty";
import { useDeleteTeamNoteMutation } from "@/redux-store/api/teamApi";

const TeamNote = ({ notes, teamId, refetch }) => {
   const [selectedNote, setSelectedNote] = useState(null)
   const [isEdit, setIsEdit] = useState(false)
   const [isDelete, setIsDelete] = useState(false);
   const [deleteTeamNote, { isLoading }] = useDeleteTeamNoteMutation()
   const handleEdit = (note) => {
      setSelectedNote(note)
      setIsEdit(true)
   }

   const handleDelete = (note) => {
      setSelectedNote(note)
      setIsDelete(true)
   }

   const confirmDelete = async () => {
      if (!selectedNote) return;

      const { id: noteId } = selectedNote;

      try {
         await deleteTeamNote({ teamId, noteId });
         toast.success("Note deleted successfully.");
         handleClose();
         refetch();
      } catch (error) {
         console.error("Error deleting note:", error);
         toast.error(`Failed to delete note. ${error.message || ""}`);
      }
   };

   const handleClose = () => {
      setIsDelete(false)
      setSelectedNote(null)
   }

   return (
      <div>
         {notes?.length === 0 ? (
            <Empty message={"No notes yet"} />
         ) : (
            <div className={`grid gap-3 ${notes?.length > 1 ? "lg:grid-cols-1" : ""} w-full`}>
               {notes.map(note => (
                  <Card key={note.id}>
                     <CardHeader>
                        <div className="flex items-start gap-4 justify-between">
                           <p className="text-sm flex items-center gap-2  text-muted-foreground ">
                              <Calendar size={14} /> {moment(new Date()).format("LLL")}
                           </p>
                           <div className="flex items-center gap-3">
                              <button onClick={() => handleEdit(note)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 text-gray-700 rounded-md" type="button">
                                 <Edit3 size={14} className="text-green-500" />
                                 <span>Edit</span>
                              </button>
                              <button onClick={() => handleDelete(note)} className="flex items-center gap-2 px-4 text-sm py-2 hover:bg-gray-100 text-gray-700 rounded-md" type="button">
                                 <Trash2 size={14} className="text-red-500" />
                                 <span>Delete</span>
                              </button>
                           </div>
                        </div>
                     </CardHeader>
                     <CardContent className=" -mt-2 flex flex-col lg:flex-row gap-4 items-start w-full justify-between">
                        <div className="w-full">
                           <div className="flex items-start  gap-2">
                              {/* <span className="pt-1 w-5 text-des h-5"><FileText size={16} className="" /></span> */}
                              <p className="text-base font-normal text-title">{note?.note}</p>
                           </div>

                        </div>

                     </CardContent>
                  </Card>
               ))}
            </div>
         )}
         <EditNote refetch={refetch} note={selectedNote} id={teamId} isOpen={isEdit} setOpen={setIsEdit} />

         <CrmAlert
            isOpen={isDelete}
            message="Delete Note"
            description="Are you sure you want to delete this Note? This action cannot be undone."
            handleClose={handleClose}
            handleConfirm={confirmDelete}
         />

      </div>
   );
};

export default TeamNote;
