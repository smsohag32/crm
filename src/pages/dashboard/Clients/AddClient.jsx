import CmModal from '@/components/modal/CmModal';
import { useForm } from 'react-hook-form';

const AddClient = ({ isOpen, setOpen }) => {

   const { register } = useForm()
   const handleClose = () => {
      setOpen(false)
   }
   return (
      <CmModal isOpen={isOpen} handleClose={handleClose} size={"600px"} title={"Add new client."} >
         <form>

               

         </form>
      </CmModal>
   );
};

export default AddClient;
