import { MdAddBox } from 'react-icons/md';
import NavBar from '../../../../../layout/navBar';
import './styles.scss';
import InputSearch from '../../../../../shared/components/inputSearch';
import CustomSelect from '../../../../../shared/components/select';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { DatePickerProps } from 'antd';
import CustomTable from '../../../../../shared/components/table';
import { ColumnsType } from 'antd/es/table';
import {
  AddCapSoInterface,
  CapSoInterface,
  ModalAddCapSoInterface,
  ServiceInterface,
} from '../../../../../@types';
import { GoDotFill } from 'react-icons/go';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import { useEffect, useState } from 'react';
import { GetDataCapSo, GetDataServices } from '../../../../../core/redux';

export default function DanhSachCapSo(props: ModalAddCapSoInterface) {
  //colunms cap so
  const columns: ColumnsType<CapSoInterface> = [
    {
      key: 'capsoID',
      title: 'Mã Cấp Số',
      dataIndex: 'capsoID',
    },
    {
      key: 'fullName',
      title: 'Họ và Tên',
      dataIndex: 'fullName',
    },
    {
      key: 'phoneNumber',
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
    },
    {
      key: 'serviceID',
      title: 'Mã dịch vụ',
      dataIndex: 'serviceID',
    },
    {
      key: 'date',
      title: 'Thời gian cấp',
      render: (_, record) => <p>{record.startDate}</p>,
    },
    {
      key: 'toDate',
      title: 'Hạn sử dụng',
      render: (_, record) => <p>{record.endDate}</p>,
    },
    {
      key: 'status',
      title: 'Trạng thái',
      render: (_, record) =>
        record.status ? (
          <span className="status-online d-flex active-gray">
            <GoDotFill />
            <p>Đã đóng tiền</p>
          </span>
        ) : (
          <span className="status-online d-flex active-red">
            <GoDotFill />
            <p>Chưa đóng tiền</p>
          </span>
        ),
    },
    {
      key: 'update',
      title: '',
      render: (_, record) => (
        <p className="text-link" onClick={() => props.HandleClickChiTietCapSo(record.key)}>
          Chi tiết
        </p>
      ),
    },
  ];
  const dispatch = useAppDispatch();
  const ListCapSo = useAppSelector(state => state.CapSo.CapSo);
  const ListServices = useAppSelector(state => state.Service.Service);

  const [inputSearch, setInputSearch] = useState<string>('');
  const [onlineState, setOnlineState] = useState<string>('');
  const [newListService, setNewListService] = useState<string[]>([]);
  //get data Services
  useEffect(() => {
    dispatch(GetDataCapSo());
    dispatch(GetDataServices());
  }, [dispatch]);
  //   useEffect(() => {
  //     const newSearchText = ListServices.filter(service => service.serviceId.includes(inputSearch));
  //     const newFilterOnline = newSearchText.filter(service => {
  //       if (onlineState === 'Hoạt động') {
  //         return service.online === true;
  //       } else if (onlineState === 'Ngưng hoạt động') {
  //         return service.online === false;
  //       } else {
  //         return service;
  //       }
  //     });
  //     setNewList(newFilterOnline);
  //   }, [inputSearch, onlineState, ListServices]);
  // console.log(ListCapSo);
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Cấp Số" />
      <div className="content-DS-CapSo">
        <h3>Quản lí cấp số</h3>
        <div className="navbar-DS-CapSo d-flex ms-4">
          <div className="mt-2">
            <p>Từ khóa</p>
            <InputSearch
              HandleInputSearch={e => setInputSearch(e.target.value)}
              width={400}
              placeholder="Nhập từ khóa"
            />
          </div>
        </div>
        <div className="list-DS-CapSo m-4 ">
          <CustomTable data={ListCapSo} columns={columns} />
        </div>
      </div>
      {/* <div
        className="button-add-device position-absolute"
        onClick={() => props.HandleClickAddCapSo()}
      >
        <MdAddBox />
        <p> Cấp số mới</p>
      </div> */}
    </div>
  );
}
