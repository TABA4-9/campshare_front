import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height : 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: "hidden",
  overflowY: "scroll",
};

interface propsType {
    handleClose : () => void,
    showAgreeModal : boolean,

}

export default function ServiceAgreeModal({handleClose, showAgreeModal} :propsType) {

  return (
    <div>
      <Modal
        open={showAgreeModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            약관 동의
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="whitespace-pre-wrap ">
                - 서비스 이용 도중 회원의 고의 또는 과실로 인하여 캠핑용품 및 이를 거치하거나 보관 등을 하기 위한 시설물(이하 캠핑용품와 총괄하여 ‘캠핑용품 시설물’이라 합니다)이 파손될 경우, 회원이 본인의 비용으로 수리하여야 합니다. 이 경우 수리비용은 시가를 반영한 일반적인 단가를 따릅니다.
                <br/>
                - 서비스 이용 도중 회원의 고의 또는 과실로 인하여 캠핑용품 시설물이 수리가 불가능할 정도로 파손될 경우, 회사는 해당 회원에게 캠핑용품 시설물을 교체하는데 필요한 비용 전액을 청구할 수 있습니다.
                <br/>
                - 서비스와 관련하여 발생한 미납경비, 손해배상채무 등 회원의 회사에 대한 채무가 전부 정산될 때까지, 해당 회원의 서비스 사용은 중지되며, 해당 회원이 그 채무를 상당 기간 계속하여 변제하지 않을 경우에는 회사는 해당 회원의 회원자격을 박탈할 수 있습니다. 서비스 사용 중지 또는 회원자격 박탈에 대한 판단 기준은 회사의 본 약관 및 이용정책에 근거합니다.
                <br/>
                - 당사는 캠핑 용품 중개사이트로서 회원 고의 또는 과실로 인한 캠핑 용품 파손에 대한 수리 비용은 책임지지 않습니다. 
                <br/>
                - ‘상품 빌려준 자’는 파손된 물품에 대해 본인의 비용으로 수리하여 이에 따른 비용을 ‘상품 빌린 자’에게 청구할 수 있습니다.
                <br/>
                - ‘상품 빌려준 자’는 상품 등록시 파손 위험에 대한 보증으로 가격 설정을 임의로 조정할 수 있습니다.
                <br/>
                - ‘상품 빌리는 자’는 상품 상태를 인지한 상태로 빌리는 것을 가정하므로, 이에 따라 미리 사진을 찍어두기를 권장합니다.
                <br/>
                - ‘상품 빌리는 자’는 기한 내에 상품 반납을 하지 않을 시 추가 요금이 부과되므로 유의하시기 바랍니다.
                <br/>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}