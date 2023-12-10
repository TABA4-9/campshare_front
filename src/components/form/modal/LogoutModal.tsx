import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userInfoAtom } from '../../../data/userInfoAtom';

interface propsType {
    showLogoutModal : boolean,
    setShowLogoutModal : (value : boolean) => void,
    handleClose : () => void,
}

export default function LogoutModal({showLogoutModal, setShowLogoutModal, handleClose} : propsType) {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useRecoilState<UserInfoType>(userInfoAtom);

    const logoutPost = async () => {
        // setUserInfo 초기화
        setUserInfo({
            account : {
                id : 0,
                name : '',
                email : '',
            },
            kakaoAccessToken: '',
            rentItem : [],
            lendItem : [],
        })
        navigate('/');
    };


    return (
        <React.Fragment>
          <Dialog
            open={showLogoutModal}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              로그아웃
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                정말 로그아웃 하시겠습니까?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={()=>logoutPost()}>예</Button>
              <Button onClick={handleClose} autoFocus>
                아니오
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      );
}