import { useState } from 'react';
import DanhSachDichVu from '../pack/DSDichVu';
import ThemDichVu from '../pack/ThemDichVu';
import ChiTietDichVu from '../pack/ChiTietDichVu';
import CapNhapDichVu from '../pack/CapNhapDichVu';
import { AddDataServiceInterface, UpdateDataServiceInterface } from '../../../../@types';
import { useAppDispatch } from '../../../../shared/hooks/customRedux';
import { AddDataServices, UpdateDataServices } from '../../../../core/redux';

export default function ViewDichVu() {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<string>('0');
  const [id, setId] = useState<string>('');
  return (
    <>
      {page === '0' ? (
        <DanhSachDichVu
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
          HandleClickOkAddService={(
            serviceId: string,
            serviceName: string,
            describe: string,
            rule: string[],
          ) => {
            if (serviceId || serviceName || describe || rule) {
              const newData: AddDataServiceInterface = {
                serviceId: serviceId,
                serviceName: serviceName,
                describe: describe,
                rule: rule,
              };
              dispatch(AddDataServices(newData));
              alert('Add success');
              setPage('0');
            } else {
              alert('Vui lòng nhập đầy đủ thông tin');
            }
          }}
        />
      ) : page === '2' ? (
        <ChiTietDichVu
          id={id}
          HandleClickGoBack={() => setPage('0')}
          HandleClickUpdate={() => setPage('3')}
        />
      ) : (
        <CapNhapDichVu
          HandleClickCancelUpdateService={() => setPage('0')}
          HandleClickOkUpdateService={(
            serviceId: string,
            serviceName: string,
            describe: string,
            rule: string[],
          ) => {
            if (serviceId || serviceName || describe || rule) {
              const newData: UpdateDataServiceInterface = {
                key: id,
                serviceId: serviceId,
                serviceName: serviceName,
                describe: describe,
                rule: rule,
              };
              dispatch(UpdateDataServices(newData));
              alert('Update success');
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
}
