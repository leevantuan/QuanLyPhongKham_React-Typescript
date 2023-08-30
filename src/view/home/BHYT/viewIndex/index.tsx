import { useState } from 'react';
import DSBHYT from '../pack/DSBHYT';

export default function ViewBHYT() {
  const [page, setPage] = useState<string>('0');
  return (
    <>
      {page === '0' ? (
        <DSBHYT
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
