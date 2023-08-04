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
  DataServiceDetailInterface,
  ServiceInterface,
} from '../../../../../@types';
import { GoDotFill } from 'react-icons/go';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import { useEffect, useState } from 'react';
import { GetDataServicDetail, GetDataServices } from '../../../../../core/redux';

const dataSelect2: string[] = ['Tất cả', 'Đang chờ', 'Đã sử dụng', 'Bỏ qua'];
const dataSelect3: string[] = ['Tất cả', 'Kiosk', 'Hệ thống'];
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

export default function DanhSachCapSo(props: AddCapSoInterface) {
  //colunms device
  const columns: ColumnsType<DataServiceDetailInterface> = [
    {
      key: 'stt',
      title: 'STT',
      dataIndex: 'stt',
    },
    {
      key: 'customerName',
      title: 'Tên khách hàng',
      dataIndex: 'customerName',
    },
    {
      key: 'serviceName',
      title: 'Tên dịch vụ',
      dataIndex: 'serviceName',
    },
    {
      key: 'date',
      title: 'Thời gian cấp',
      render: (_, record) => <p>{record.time + ' - ' + record.date}</p>,
    },
    {
      key: 'toDate',
      title: 'Hạn sử dụng',
      render: (_, record) => <p>{record.toTime + ' - ' + record.toDate}</p>,
    },
    {
      key: 'status',
      title: 'Trạng thái',
      render: (_, record) =>
        record.status === 'success' ? (
          <span className="status-online d-flex active-gray">
            <GoDotFill />
            <p>Đã sử dụng</p>
          </span>
        ) : record.status === 'waiting' ? (
          <span className="status-online d-flex active-blue">
            <GoDotFill />
            <p>Đang chờ</p>
          </span>
        ) : (
          <span className="status-online d-flex active-red">
            <GoDotFill />
            <p>Bỏ qua</p>
          </span>
        ),
    },
    {
      key: 'source',
      title: 'Nguồn cấp',
      dataIndex: 'source',
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
  const ListDetailServices = useAppSelector(state => state.ServiceDetail.ServiceDetail);
  const ListServices = useAppSelector(state => state.Service.Service);

  const [inputSearch, setInputSearch] = useState<string>('');
  const [onlineState, setOnlineState] = useState<string>('');
  const [newListService, setNewListService] = useState<string[]>([]);
  //get data Services
  useEffect(() => {
    dispatch(GetDataServicDetail());
    dispatch(GetDataServices());
  }, [dispatch]);
  useEffect(() => {
    const serviceName = ListServices.map(service => service.serviceName);
    if (serviceName) {
      const defaultList = ['Tất cả'];
      const newList = defaultList.concat(serviceName);
      setNewListService(newList);
    }
  }, [ListServices]);
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

  const onChangeFromDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  const onChangeToDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar textLv1="Cấp số >" textLv2="" textLv3=" Danh sách cấp số" />
      <div className="content-DS-CapSo">
        <h3>Quản lí cấp số</h3>
        <div className="navbar-DS-CapSo d-flex ms-4">
          <div className="mt-2">
            <p>Tên dịch vụ</p>
            <CustomSelect
              width={200}
              height={44}
              data={newListService}
              HandleChooseSelect={select => setOnlineState(select)}
            />
          </div>
          <div className="mt-2">
            <p>Tình trạng</p>
            <CustomSelect
              width={200}
              height={44}
              data={dataSelect2}
              HandleChooseSelect={select => setOnlineState(select)}
            />
          </div>
          <div className="mt-2">
            <p>Nguồn cấp</p>
            <CustomSelect
              width={200}
              height={44}
              data={dataSelect3}
              HandleChooseSelect={select => setOnlineState(select)}
            />
          </div>

          <div className="mt-2">
            <p>Chọn thời gian</p>
            <DatePicker
              defaultValue={dayjs('01/01/2015', dateFormatList[0])}
              format={dateFormatList}
              onChange={onChangeFromDate}
            />
            {' > '}
            <DatePicker
              defaultValue={dayjs('01/01/2015', dateFormatList[0])}
              format={dateFormatList}
              onChange={onChangeToDate}
            />
          </div>
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
          <CustomTable data={ListDetailServices} columns={columns} />
        </div>
      </div>
      <div
        className="button-add-device position-absolute"
        onClick={() => props.HandleClickAddCapSo()}
      >
        <MdAddBox />
        <p> Cấp số mới</p>
      </div>
    </div>
  );
}
