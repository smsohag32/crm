import CmModal from '@/components/modal/CmModal';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useEditDealNoteMutation } from '@/redux-store/api/noteApi';

const EditNote = ({ isOpen, note, setOpen, refetch, id }) => {
   const [editDealNote, { isLoading }] = useEditDealNoteMutation()
   const [noteType, setNoteType] = useState("deal")

   const { register, handleSubmit, formState: { errors }, reset } = useForm({
      defaultValues: {
         note: note?.note
      }
   });


   useEffect(() => {
      reset({
         note: note?.note
      })
   }, [reset, note])


   const handleClose = () => {
      setOpen(false);
      reset();
   };

   const onSubmit = async (data) => {
      try {
         await editDealNote({ dealId: id, noteId: note?.id, data }).unwrap()
         toast.success("Successfully edit your note.")
         refetch();
         setOpen(false);
         reset()
      } catch {
         toast.error("Failed to edit note. ")
      }

   };

   return (
      <CmModal isOpen={isOpen} handleClose={handleClose} size={"600px"} title={"Edit Note"}>
         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
               <label className="flex items-center gap-2 text-sm text-gray-700">
                  <FileText size={20} />
                  {noteType === "deal" ? "Deal Note" : "Private Note"}
               </label>
               <Textarea
                  defaultValues={note?.note}
                  {...register("note", { required: "Note is required" })}
                  placeholder={`Enter your ${noteType === "deal" ? "deal" : "private"} note here`}
                  className="resize-none  bg-[#ffffff]"
                  rows={6}
               />
               {errors.note && <p className="text-red-600 text-xs">{errors.note.message}</p>}
            </div>
            <div className="mt-4 flex justify-end gap-4">
               <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
               >
                  Cancel
               </button>
               <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
               >
                  Edit Note
               </button>
            </div>
         </form>
      </CmModal>
   );
};

export default EditNote;
