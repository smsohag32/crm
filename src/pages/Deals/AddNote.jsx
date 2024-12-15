import CmModal from '@/components/modal/CmModal';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from 'lucide-react';
import { useState } from 'react';
import { usePostDealNoteMutation } from '@/redux-store/api/dealsApi';
import { toast } from 'sonner';

const AddNote = ({ isOpen, setOpen, refetch, id }) => {
   const { register, handleSubmit, formState: { errors }, reset } = useForm();
   const [noteType, setNoteType] = useState("deal")
   const [postDealNote, { isLoading }] = usePostDealNoteMutation()
   const handleClose = () => {
      setOpen(false);
      reset();
   };

   const onSubmit = async (data) => {
      const noteData = { ...data, type: noteType };

      console.log(id, data)
      try {
         await postDealNote({ id, data }).unwrap()
         toast.success("Added new Note successfully.")
         refetch();
         setOpen(false);
         reset()
      } catch {
         toast.error("Failed to add note. ")
      }

   };

   return (
      <CmModal isOpen={isOpen} handleClose={handleClose} size={"600px"} title={"Add Note"}>
         {/* Tabs for switching between Deal Note and Private Note */}
         <Tabs defaultValue="deal" className="mb-4" onValueChange={setNoteType}>
            <TabsList className="grid grid-cols-2 w-full">
               <TabsTrigger value="deal" className="text-sm">Deal Note</TabsTrigger>
               <TabsTrigger value="private" className="text-sm">Private Note</TabsTrigger>
            </TabsList>
         </Tabs>

         <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
               <label className="flex items-center gap-2 text-sm text-gray-700">
                  <FileText size={20} />
                  {noteType === "deal" ? "Deal Note" : "Private Note"}
               </label>
               <Textarea
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
                  Add Note
               </button>
            </div>
         </form>
      </CmModal>
   );
};

export default AddNote;
