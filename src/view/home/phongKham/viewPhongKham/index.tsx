import { useState } from 'react';
import DSPhongKham from '../pack/DSPhongKham';
import CapNhapPhongKham from '../pack/CapNhapPhongKham';
import { useAppDispatch } from '../../../../shared/hooks/customRedux';
import { UpdateDataRoom } from '../../../../core/redux/room';
import { RoomsInterface } from '../../../../@types/IRoom';

export default function ViewPhongKham() {
  const dispatch = useAppDispatch();

  const [reset, setReset] = useState<boolean>(true);
  const [checkAuth, setCheckAuth] = useState<boolean>(true);

  const [page, setPage] = useState<string>('0');
  const [id, setId] = useState<string>('');

  const HandleClickUpdate = (key: string) => {
    setId(key);
    setPage('3');
  };

  if (checkAuth) {
    return (
      <>
        {page === '0' ? (
          <DSPhongKham
            reset={reset}
            HandleClickAddRoom={() => setPage('1')}
            HandleClickDescription={() => {}}
            HandleClickUpdate={HandleClickUpdate}
          />
        ) : (
          <CapNhapPhongKham
            id={id}
            HandleClickCancelUpdateDevice={() => setPage('0')}
            HandleClickOkUpdateDevice={(roomId, roomName, status) => {
              const setDataUpdate: RoomsInterface = {
                key: roomId,
                roomName: roomName,
                status: status === 'true' ? true : false,
              };
              if (window.confirm('Bạn có chắc chắc muốn sửa không?')) {
                dispatch(UpdateDataRoom(setDataUpdate));
                setReset(!reset);
              }
              setPage('0');
            }}
          />
        )}
      </>
    );
  } else {
    return (
      <div
        style={{
          width: 800,
          marginTop: 400,
          marginLeft: 300,
          textAlign: 'center',
        }}
      >
        <h1 className="fw-bold">Đăng nhập bằng tài khoản khác để sử dụng dịch vụ này</h1>
      </div>
    );
  }
}
