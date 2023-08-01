import { useState } from 'react';
import DanhSachDichVu from '../pack/DSDichVu';
import ThemDichVu from '../pack/ThemDichVu';
import ChiTietDichVu from '../pack/ChiTietDichVu';
import CapNhapDichVu from '../pack/CapNhapDichVu';

export default function ViewDichVu() {
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
          HandleClickOkAddService={() => alert('Oki')}
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
          HandleClickOkUpdateService={() => alert('oki')}
          id={id}
        />
      )}
    </>
  );
}
