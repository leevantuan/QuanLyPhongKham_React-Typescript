import { useState } from 'react';
import DSBHYT from '../pack/DSBHYT';
import ChiTietBHYT from '../pack/chiTietBHYT';
import CapNhapBHYT from '../pack/capNhapBHYT';

export default function ViewBHYT() {
  const [page, setPage] = useState<string>('0');
  return (
    <>
      {page === '0' ? (
        <DSBHYT
          reset={true}
          HandleClickAddRoom={() => {}}
          HandleClickDescription={() => setPage('2')}
          HandleClickUpdate={() => setPage('1')}
        />
      ) : page === '1' ? (
        <CapNhapBHYT
          HandleClickCancelAddDevice={() => setPage('0')}
          HandleClickOkAddDevice={() => {}}
        />
      ) : (
        <ChiTietBHYT
          HandleClickGoBackRoom={() => setPage('0')}
          HandleClickUpdateRoom={() => setPage('1')}
          id=""
        />
      )}
    </>
  );
}
