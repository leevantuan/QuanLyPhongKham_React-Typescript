import { useState } from 'react';
import DSCapSo from './danhSach';
import ChiTietCapSo from './chiTietCapSo';

export default function DanhSachCapSo() {
  const [page, setPage] = useState<string>('0');
  return (
    <>
      {page === '0' ? (
        <DSCapSo HandleClickAddCapSo={() => {}} HandleClickChiTietCapSo={() => setPage('1')} />
      ) : (
        <ChiTietCapSo HandleClickGoBack={() => setPage('0')} id="" />
      )}
    </>
  );
}
