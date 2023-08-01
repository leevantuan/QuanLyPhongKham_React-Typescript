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
import { ListServiceInterface, ServiceInterface } from '../../../../../@types';
import { GoDotFill } from 'react-icons/go';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import { useEffect } from 'react';
import { GetDataServices } from '../../../../../core/redux';

const dataSelect1: string[] = ['Tất cả', 'Hoạt động', 'Ngưng hoạt động'];
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

export default function DanhSachDichVu(props: ListServiceInterface) {
  //colunms device
  const columns: ColumnsType<ServiceInterface> = [
    {
      key: 'serviceId',
      title: 'Mã dịch vụ',
      dataIndex: 'serviceId',
    },
    {
      key: 'serviceName',
      title: 'Tên dịch vụ',
      dataIndex: 'serviceName',
    },
    {
      key: 'describe',
      title: 'Mô tả',
      dataIndex: 'describe',
    },
    {
      key: 'online',
      title: 'Trạng thái hoạt động',
      render: (_, record) =>
        record.online ? (
          <span className="status-online d-flex active-green">
            <GoDotFill />
            <p>Hoạt động</p>
          </span>
        ) : (
          <span className="status-online d-flex active-red">
            <GoDotFill />
            <p>Ngưng hoạt động</p>
          </span>
        ),
    },
    {
      key: 'description',
      title: '',
      render: (_, record) => (
        <p className="text-link" onClick={() => props.HandleClickDescriptionService(record.key)}>
          Chi tiết
        </p>
      ),
    },
    {
      key: 'update',
      title: '',
      render: (_, record) => (
        <p className="text-link" onClick={() => props.HandleClickUpdateService(record.key)}>
          Cập nhập
        </p>
      ),
    },
  ];
  const dispatch = useAppDispatch();
  const ListServices = useAppSelector(state => state.queuing_system.Service);
  //get data Services
  useEffect(() => {
    dispatch(GetDataServices());
  }, [dispatch]);

  const onChangeFromDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  const onChangeToDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar textLv1="Thiết bị >" textLv2="" textLv3=" Danh sách thiết bị" />
      <div className="content-DS-DichVu">
        <h3>Quản lí dịch vụ</h3>
        <div className="navbar-DS-DichVu d-flex ms-4">
          <div className="mt-2">
            <p>Trạng thái hoạt động</p>
            <CustomSelect
              width={350}
              height={44}
              data={dataSelect1}
              HandleChooseSelect={() => {}}
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
            <InputSearch HandleInputSearch={() => {}} width={400} placeholder="Nhập từ khóa" />
          </div>
        </div>
        <div className="list-DS-DichVu m-4 ">
          <CustomTable data={ListServices} columns={columns} />
        </div>
      </div>
      <div
        className="button-add-device position-absolute"
        onClick={() => props.HandleClickAddService()}
      >
        <MdAddBox />
        <p> Thêm dịch vụ</p>
      </div>
    </div>
  );
}
