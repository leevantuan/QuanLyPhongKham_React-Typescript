import { useState } from 'react';
import DanhSachDichVu from '../pack/DSDichVu';
import ThemDichVu from '../pack/ThemDichVu';
import CapNhapDichVu from '../pack/CapNhapDichVu';
import { useAppDispatch } from '../../../../shared/hooks/customRedux';
import { AddServiceInterface, ServiceInterface } from '../../../../@types/IService';
import { CreateDataService, UpdateDataService } from '../../../../core/redux/Service';

export default function ViewDichVu() {
  const dispatch = useAppDispatch();
  const [checkAuth, setCheckAuth] = useState<boolean>(true);

  const [page, setPage] = useState<string>('0');
  const [id, setId] = useState<string>('');
  const [reset, setReset] = useState<boolean>(false);

  if (checkAuth) {
    return (
      <>
        {page === '0' ? (
          <DanhSachDichVu
            reset={reset}
            HandleClickAddService={() => setPage('1')}
            HandleClickDescriptionService={(id: string) => {
              setId(id);
              setPage('2');
            }}
            HandleClickUpdateService={(id: string) => {
              setId(id);
              setPage('3');
            }}
          />
        ) : page === '1' ? (
          <ThemDichVu
            HandleClickCancelAddService={() => setPage('0')}
            HandleClickOkAddService={(serviceName, price, status, roomId) => {
              if (serviceName || price || status || roomId) {
                const Data: AddServiceInterface = {
                  serviceName: serviceName,
                  price: price,
                  status: status,
                  roomId: roomId,
                };
                if (window.confirm('Bạn có chắc chắc muốn thêm không?')) {
                  dispatch(CreateDataService(Data));
                  setReset(!reset);
                }
                setPage('0');
              } else {
                alert('Vui lòng nhập đầy đủ thông tin');
              }
            }}
          />
        ) : (
          <CapNhapDichVu
            HandleClickCancelUpdateService={() => setPage('0')}
            HandleClickOkUpdateService={(serviceId, serviceName, price, status, roomId) => {
              if (serviceId || serviceName || price || status || roomId) {
                const Data: ServiceInterface = {
                  key: serviceId,
                  serviceName: serviceName,
                  price: price,
                  status: status === 'true' ? true : false,
                  roomId: roomId,
                };
                if (window.confirm('Bạn có chắc chắc muốn sửa không?')) {
                  dispatch(UpdateDataService(Data));
                  setReset(!reset);
                }
                setPage('0');
              } else {
                alert('Vui lòng nhập đầy đủ thông tin');
              }
            }}
            id={id}
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
