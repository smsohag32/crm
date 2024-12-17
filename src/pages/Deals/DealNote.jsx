import { Card, CardContent } from "@/components/ui/card";
import { Edit3, FileText, Trash2 } from "lucide-react";
import moment from "moment";
import EditNote from "./EditNote";
import { useState } from "react";
import CrmAlert from "@/components/ui/alert";
import { useDealNoteDeleteMutation } from "@/redux-store/api/noteApi";
import { toast } from "sonner";

const DealNote = ({ notes, dealId, refetch }) => {
   const [selectedNote, setSelectedNote] = useState(null)
   const [isEdit, setIsEdit] = useState(false)
   const [isDelete, setIsDelete] = useState();
   const [dealNoteDelete, { isLoading }] = useDealNoteDeleteMutation()
   const handleEdit = (note) => {
      setSelectedNote(note)
      setIsEdit(true)
   }

   const handleDelete = (note) => {
      setSelectedNote(note)
      setIsDelete(true)
   }

   const confirmDelete = async () => {
      if (selectedNote) {
         try {
            await dealNoteDelete({ dealId: dealId, noteId: selectedNote?.id })
            setIsDelete(false)
            toast.success("Note deleted successfully.")
            refetch()
         } catch {
            toast.error("Failed to delete note.")
         }
      }
   }

   const handleClose = () => {
      setIsDelete(false)
      setSelectedNote(null)
   }

   return (
      <div>
         {notes?.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No notes yet</p>
         ) : (
            <div className="grid gap-3 w-full">
               {notes.map(note => (
                  <Card key={note.id}>
                     <CardContent className="p-4 flex flex-col lg:flex-row gap-4 items-start w-full justify-between">
                        <div className="w-full">
                           <div className="flex items-start max-w-4xl gap-2">
                              <span className="pt-1 w-5 h-5"><FileText size={16} className="" /></span>
                              <p className="text-base font-normal text-title">{note?.note}</p>
                           </div>
                           <p className="text-sm ps-5 mt-6 text-muted-foreground ">
                              {moment(new Date()).format("LLL")}
                           </p>
                        </div>
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
                     </CardContent>
                  </Card>
               ))}
            </div>
         )}
         <EditNote refetch={refetch} note={selectedNote} id={dealId} isOpen={isEdit} setOpen={setIsEdit} />



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

export default DealNote;
