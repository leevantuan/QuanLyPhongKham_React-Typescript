import { useState } from 'react';
import DSBacSi from '../pack/DSBacSi';
import ThemBacSi from '../pack/themBacSi';
import CapNhapBacSi from '../pack/capNhapBacSi';
import ChiTietBacSi from '../pack/ChiTietBacSi';

export default function ViewBacSi() {
  const [page, setPage] = useState<string>('0');
  return (
    <>
      {page === '0' ? (
        <DSBacSi
          HandleClickAddRoom={() => setPage('1')}
          HandleClickDescription={() => setPage('3')}
          HandleClickUpdate={() => setPage('2')}
        />
      ) : page === '1' ? (
        <ThemBacSi
          HandleClickCancelAddDevice={() => setPage('0')}
          HandleClickOkAddDevice={() => {}}
        />
      ) : page === '2' ? (
        <CapNhapBacSi
          HandleClickCancelAddDevice={() => setPage('0')}
          HandleClickOkAddDevice={() => {}}
        />
      ) : (
        <ChiTietBacSi
          HandleClickGoBackRoom={() => setPage('0')}
          HandleClickUpdateRoom={() => setPage('2')}
          id=""
        />
      )}
    </>
  );
}
