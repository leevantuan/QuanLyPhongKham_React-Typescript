import { MdAddBox } from 'react-icons/md';
import NavBar from '../../../../layout/navBar';
import './styles.scss';
import InputSearch from '../../../../shared/components/inputSearch';
import CustomSelect from '../../../../shared/components/select';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { DatePickerProps } from 'antd';
import CustomTable from '../../../../shared/components/table';
import { ColumnsType } from 'antd/es/table';
import { ModalAddCapSoInterface } from '../../../../@types';
import { GoDotFill } from 'react-icons/go';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/customRedux';
import { useEffect, useState } from 'react';
import { ProvideNumberInterface } from '../../../../@types/IProvideNumber';
import { GetAllProvideNumber } from '../../../../core/redux/ProvideNumber';
import { GetAllService } from '../../../../core/redux/Service';

export default function DSCapSo(props: ModalAddCapSoInterface) {
  //colunms cap so
  const columns: ColumnsType<ProvideNumberInterface> = [
    {
      key: 'key',
      title: 'Mã Cấp Số',
      dataIndex: 'key',
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
      title: 'Dịch vụ sử dụng',
      render: (_, record) =>
        ListServices.map((service, index) => {
          if (service.key === record.serviceId) {
            return <p>{service.serviceName}</p>;
          }
          return null;
        }),
    },
    {
      key: 'price',
      title: 'Giá dịch vụ',
      render: (_, record) => <p>{record.price} vnđ</p>,
    },
    {
      key: 'date',
      title: 'Thời gian cấp',
      render: (_, record) => <p>{record.startDate}</p>,
    },
    {
      key: 'toDate',
      title: 'Hạn sử dụng',
      render: (_, record) => <p>{record.endtDate}</p>,
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
  const ListCapSo = useAppSelector(state => state.ProvideNumber.ProvideNumbers);
  const ListServices = useAppSelector(state => state.Service.Services);

  const [inputSearch, setInputSearch] = useState<string>('');
  const [onlineState, setOnlineState] = useState<string>('');
  const [newListService, setNewListService] = useState<string[]>([]);
  //get data Services
  useEffect(() => {
    dispatch(GetAllProvideNumber());
    dispatch(GetAllService());
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
        <h3>Danh sách cấp số</h3>
        <div className="navbar-DS-CapSo d-flex ms-4">
          <div className="mt-2">
            <p>Tìm kiếm mã</p>
            <InputSearch
              HandleInputSearch={e => setInputSearch(e.target.value)}
              width={400}
              placeholder="Nhập mã cần tìm"
            />
          </div>
        </div>
        <div className="list-DS-CapSo m-4 ">
          <CustomTable data={ListCapSo} columns={columns} />
        </div>
      </div>
    </div>
  );
}
