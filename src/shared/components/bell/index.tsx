import './styles.scss';
import { Modal } from 'antd';
import { BellInterface } from '../../../@types';
import { useAppDispatch, useAppSelector } from '../../hooks/customRedux';
import { useEffect } from 'react';
// import { GetDataHistorys } from '../../../core/redux';

export default function Bell(props: BellInterface) {
  const dispatch = useAppDispatch();
  // const ListHistory = useAppSelector(state => state.History.History);

  useEffect(() => {
    // dispatch(GetDataHistorys());
  }, [dispatch]);
  return (
    <>
      <Modal open={props.open} title="Thông báo" onCancel={props.HandleClickCancel} footer={[]}>
        <div
          id="scrollableDiv"
          style={{
            height: 610,
            overflow: 'auto',
            padding: '0 16px',
            // border: '1px solid rgba(140, 140, 140, 0.35)',
          }}
        >
          {/* {ListHistory.map(history => {
            return (
              <div className="content-bell" key={history.key}>
                <h6 className="fw-bold mb-3">Người dùng: {history.userName}</h6>
                <h6>
                  Thời gian nhận số: {history.time} ngày {history.date}
                </h6>
              </div>
            );
          })} */}
        </div>
      </Modal>
    </>
  );
}
