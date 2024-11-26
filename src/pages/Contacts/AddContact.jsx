import CmModal from '@/components/modal/CmModal';

const AddContact = ({ isOpen, setOpen }) => {
   const handleClose = () => {
      setOpen(false)
   }
   return (
      <CmModal isOpen={isOpen} handleClose={handleClose} size={"600px"} title={"Add new contact"} >
         <div>
            <p>contact</p>
         </div>
      </CmModal>
   );
};

export default AddContact;
