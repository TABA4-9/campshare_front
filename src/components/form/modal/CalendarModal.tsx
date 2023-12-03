import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import moment from "moment";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface propsType {
    showCalendar : boolean,
    handleClose : () => void,
    startDate : string,
    endDate : string,
    onChangeDate : (e:any) => void,
}

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

export default function CalendarModal({handleClose, showCalendar, startDate, endDate, onChangeDate} : propsType) {
  const [nowDate, setNowDate] = useState<Value>(new Date());

  
  return (
    <div>
        <Modal
            open={showCalendar}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Calendar 
                    onChange={onChangeDate} 
                    selectRange={true}
                    formatDay={(locale, date) => moment(date).format("DD")} 
                />
            </Box>
        </Modal>
    </div>
  );
};