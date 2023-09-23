import { useState } from 'react';
import DSBacSi from '../pack/DSBacSi';
import ThemBacSi from '../pack/themBacSi';
import CapNhapBacSi from '../pack/capNhapBacSi';
import ChiTietBacSi from '../pack/ChiTietBacSi';

export default function ViewBacSi() {
  const [page, setPage] = useState<string>('0');
  const [id, setId] = useState<string>('0');
  return (
    <>
      {page === '0' ? (
        <DSBacSi
          reset={true}
          HandleClickAddRoom={() => setPage('1')}
          HandleClickDescription={_id => {
            setPage('3');
            setId(_id);
          }}
          HandleClickUpdate={_id => {
            setPage('2');
            setId(_id);
          }}
        />
      ) : page === '1' ? (
        <ThemBacSi
          HandleClickCancelAddDoctor={() => setPage('0')}
          HandleClickOkAddDoctor={() => {}}
        />
      ) : page === '2' ? (
        <CapNhapBacSi
          id={id}
          HandleClickCancelUpdateDoctor={() => setPage('0')}
          HandleClickOkUpdateDoctor={() => {}}
        />
      ) : (
        <ChiTietBacSi
          HandleClickGoBackRoom={() => setPage('0')}
          HandleClickUpdateRoom={() => setPage('2')}
          id={id}
        />
      )}
    </>
  );
}
