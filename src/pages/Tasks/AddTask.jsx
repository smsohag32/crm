import CmModal from '@/components/modal/CmModal';

const AddTask = ({ isOpen, setOpen }) => {
   const handleClose = () => {
      setOpen(false)
   }
   return (
      <CmModal isOpen={isOpen} handleClose={handleClose} size={"600px"} title={"Add new task."} >
         <div>
            <p>Task</p>
         </div>
      </CmModal>
   );
};

export default AddTask;
