import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,

} from "@/components/ui/alert-dialog"
import { Button } from "../ui/button";

const CrmAlert = ({ isOpen, message, description, handleClose, handleConfirm }) => {
   return (
      <AlertDialog open={isOpen} onOpenChange={handleClose} >
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>{message}</AlertDialogTitle>
               <AlertDialogDescription>
                  {description}
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel onPointerDown={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
               <Button onPointerDown={(e) => e.stopPropagation()} onClick={handleConfirm}>Continue</Button>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>

   );
};

export default CrmAlert;
