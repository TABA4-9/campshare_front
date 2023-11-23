import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height : 350,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface propsType {
    showDetailModal : boolean
    handleClose : () => void,
    checkDetail : () => void,
    DetailItem : string,
    onChange : (e: React.ChangeEvent<HTMLTextAreaElement>) => void,
}


export default function ItemDetailModal({showDetailModal, handleClose, checkDetail, DetailItem, onChange} : propsType) {
    return (
        <div>
            <Modal
                open={showDetailModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={()=>{
                    handleClose()
                    checkDetail()
                }}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    상품 설명
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <textarea
                        name="DetailItem"
                        className="w-full h-[200px]"
                        placeholder="상품 설명을 입력하시오..."
                        value={DetailItem}
                        onChange={onChange}
                    />
                    <button onClick={checkDetail}>확인</button>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}