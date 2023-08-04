import { useEffect, useState } from 'react';
import { ModalInSoInterface } from '../../../../../@types';
import { HandleDates, HandleTimes } from '../../../../../HandleLogic';
import './styles.scss';
import { Modal } from 'antd';

export default function InSo(props: ModalInSoInterface) {
  const [date, setDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [toTime, setToTime] = useState<string>('');
  useEffect(() => {
    if (props.dateTime && props.toDateTime) {
      const date = HandleDates(props.dateTime);
      const toDate = HandleDates(props.toDateTime);
      const time = HandleTimes(props.dateTime);
      const toTime = HandleTimes(props.toDateTime);
      setDate(date);
      setToDate(toDate);
      setTime(time);
      setToTime(toTime);
    }
  }, [props.dateTime, props.toDateTime]);
  return (
    <Modal
      style={{ textAlign: 'center' }}
      title="Số thứ tự được cấp"
      centered
      open={props.open}
      width={500}
      onCancel={props.HandleClickCacel}
      footer={[]}
    >
      <div className="container-inso">
        <h1>{props.stt}</h1>
        <p className="d-flex justify-content-center">
          DV: {props.servicerName} <p className="fw-bold">( tại quầy số {props.couter} )</p>
        </p>
        <div>
          <p>Thời gian cấp: {time + ' ' + date}</p>
          <p>Hạn sử dụng: {toTime + ' ' + toDate}</p>
        </div>
      </div>
    </Modal>
  );
}
