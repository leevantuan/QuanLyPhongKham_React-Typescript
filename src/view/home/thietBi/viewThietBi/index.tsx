import { useState } from 'react';
import DSThietBi from '../pack/DSThietBi';
import ThemThietBi from '../pack/ThemThietBi';
import ChiTietThietBi from '../pack/ChiTietThietBi';
import CapNhapThietBi from '../pack/CapNhapThietBi';

export default function ViewThietBi() {
  const [page, setPage] = useState<string>('0');
  const [id, setId] = useState<string>('');

  const HandleClickAddDevice = () => {
    setPage('1');
  };
  const HandleClickCancelAddDevice = () => {
    setPage('0');
  };
  const HandleClickOkAddDevice = () => {
    alert('Sucess');
    setPage('0');
  };
  const HandleClickDescription = (key: string) => {
    setId(key);
    setPage('2');
  };
  const HandleClickUpdate = (key: string) => {
    setId(key);
    setPage('3');
  };
  const HandleClickUpdateDevice = (key: string) => {
    setId(key);
    setPage('3');
  };
  return (
    <>
      {page === '0' ? (
        <DSThietBi
          HandleClickAddDevice={HandleClickAddDevice}
          HandleClickDescription={HandleClickDescription}
          HandleClickUpdate={HandleClickUpdate}
        />
      ) : page === '1' ? (
        <ThemThietBi
          HandleClickCancelAddDevice={HandleClickCancelAddDevice}
          HandleClickOkAddDevice={HandleClickOkAddDevice}
        />
      ) : page === '2' ? (
        <ChiTietThietBi id={id} HandleClickUpdateDevice={HandleClickUpdateDevice} />
      ) : (
        <CapNhapThietBi id={id} />
      )}
    </>
  );
}
