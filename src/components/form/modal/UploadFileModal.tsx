import {useState} from "react";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

interface propsType {
  showUploadFileModal : boolean,
  handleClose : () => void,
  fileList : File[],
  setFileList : React.Dispatch<React.SetStateAction<File[]>>,
}

export default function UploadFileModal({showUploadFileModal, handleClose, fileList, setFileList}:propsType) {
  const DeleteUploadFile = (index:number) => {
    let newFileList = [...fileList];
    newFileList.splice(index,1);
    setFileList(newFileList);
  }

    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={showUploadFileModal}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={showUploadFileModal}>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                업로드 파일 이름
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {
                  fileList.map((item,index)=>{
                    return (
                      <div>
                        {item?.name}
                        {
                          item?.name && <button className="ml-8" onClick={()=>DeleteUploadFile(index)}>X</button>
                        }
                      </div>
                    )
                  })
                }
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
}