import { useState } from 'react';
import DSBacSi from '../pack/DSBacSi';

export default function ViewBacSi() {
  const [page, setPage] = useState<string>('0');
  return (
    <>
      {page === '0' ? (
        <DSBacSi
          HandleClickAddRoom={() => {}}
          HandleClickDescription={() => {}}
          HandleClickUpdate={() => {}}
        />
      ) : (
        ''
      )}
    </>
  );
}
