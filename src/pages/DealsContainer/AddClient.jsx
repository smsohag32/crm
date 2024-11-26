import CmModal from '@/components/modal/CmModal';

const AddClient = ({ isOpen, setOpen }) => {
   const handleClose = () => {
      setOpen(false)
   }
   return (
      <CmModal isOpen={isOpen} handleClose={handleClose} size={"600px"} title={"Add new client"} >
         <div>
            <p>Client</p>
         </div>
      </CmModal>
   );
};

export default AddClient;
