import { useEffect, useState } from 'react';
import {
  DataServiceDetailInterface,
  DetailServiceInterface,
  ServiceInterface,
} from '../../../../../@types';
import NavBar from '../../../../../layout/navBar';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import './styles.scss';
import { GetDataServicDetail, GetDataServices } from '../../../../../core/redux';
import { MdEditSquare } from 'react-icons/md';
import { RiArrowGoBackFill } from 'react-icons/ri';
import CustomSelect from '../../../../../shared/components/select';
import { DatePicker, DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import InputSearch from '../../../../../shared/components/inputSearch';
import CustomTable from '../../../../../shared/components/table';
import { ColumnsType } from 'antd/es/table';
import { GoDotFill } from 'react-icons/go';

const dataSelect1: string[] = ['Tất cả', 'Đã hoàn thành', 'Đang thực hiện', 'Vắng'];
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

export default function ChiTietDichVu(props: DetailServiceInterface) {
  const dispatch = useAppDispatch();
  const ListServices = useAppSelector(state => state.Service.Service);
  const ListServiceDetail = useAppSelector(state => state.ServiceDetail.ServiceDetail);
  //get data device
  useEffect(() => {
    dispatch(GetDataServices());
    dispatch(GetDataServicDetail());
  }, [dispatch]);
  //columns
  const columns: ColumnsType<DataServiceDetailInterface> = [
    {
      key: 'stt',
      title: 'Số thứ tự',
      dataIndex: 'stt',
    },
    {
      key: 'status',
      title: 'Trạng thái',
      render: (_, record) =>
        record.status === 'success' ? (
          <span className="status-online d-flex active-green">
            <GoDotFill />
            <p>Đã thực hiện</p>
          </span>
        ) : record.status === 'waiting' ? (
          <span className="status-online d-flex active-blue">
            <GoDotFill />
            <p>Đang thực hiện</p>
          </span>
        ) : (
          <span className="status-online d-flex active-red">
            <GoDotFill />
            <p>Vắng</p>
          </span>
        ),
    },
  ];
  const [service, setService] = useState<ServiceInterface>();
  const [serviceDetail, setServiceDetail] = useState<DataServiceDetailInterface[]>();
  const [serviceID, setServiceID] = useState<string>('');
  //find device
  useEffect(() => {
    if (props.id) {
      const service = ListServices.find(service => service.key === props.id);
      setService(service);
      if (service) {
        setServiceID(service.serviceId);
      }
    }
  }, [ListServices, props.id]);
  useEffect(() => {
    const serviceDetail = ListServiceDetail.filter(service => service.serviceId === serviceID);
    setServiceDetail(serviceDetail);
  }, [ListServiceDetail, serviceID]);
  //handle check list
  const CheckList = (event: string) => {
    if (service) {
      const list = service?.rule;
      const check = list.find(e => e === event);
      if (check) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };
  //handle
  const onChangeFromDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  const onChangeToDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar textLv1="Dịch vụ >" textLv2="Danh sách dịch vụ >" textLv3=" Chi tiết" />
      <div className="content-description-service">
        <h3>Quản lí dịch vụ</h3>
        <div className="d-flex">
          <div className="form-chi-tiet-dich-vu">
            <h5>Thông tin dịch vụ</h5>
            <div className="d-flex">
              <label>Mã dịch vụ:</label>
              <p>{service?.serviceId}</p>
            </div>
            <div className="d-flex">
              <label>Tên dịch vụ:</label>
              <p>{service?.serviceName}</p>
            </div>
            <div className="d-flex">
              <label>Mô tả:</label>
              <p>{service?.describe}</p>
            </div>
            <div className="quy-tac-cap-so">
              <h5>Quy tắc cấp số</h5>
              {/* quy tac  */}
              <div className={CheckList('1') ? 'd-flex' : 'd-none'}>
                <p>Tăng tự động: </p>
                <input value="0001" type="text" onChange={() => {}} disabled /> đến{' '}
                <input value="9999" type="text" onChange={() => {}} disabled />
              </div>
              <div className={CheckList('2') ? 'd-flex' : 'd-none'}>
                <p>Prefix:</p>
                <input value="0001" type="text" onChange={() => {}} disabled />
              </div>
              <div className={CheckList('3') ? 'd-flex' : 'd-none'}>
                <p>Surfix:</p>
                <input value="0001" type="text" onChange={() => {}} disabled />
              </div>
              <div className={CheckList('4') ? '' : 'd-none'}>
                <p>Reset mỗi ngày</p>
              </div>
              {/* quy tac  */}
            </div>
          </div>
          <div className="form-danh-sach-dich-vu">
            <div className="navbar-DS-DichVu d-flex ms-4">
              <div className="mt-2">
                <p>Trạng thái hoạt động</p>
                <CustomSelect
                  width={200}
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
                <InputSearch HandleInputSearch={() => {}} width={220} placeholder="Nhập từ khóa" />
              </div>
            </div>
            <div className="list-DS-DichVu m-4 ">
              <CustomTable data={serviceDetail} columns={columns} />
            </div>
          </div>
        </div>
      </div>
      <div
        className="button-update-service position-absolute"
        onClick={() => props.HandleClickUpdate()}
      >
        <MdEditSquare />
        <p> Cập nhập dịch vụ</p>
      </div>
      <div
        className="button-goback-service position-absolute"
        onClick={() => props.HandleClickGoBack()}
      >
        <RiArrowGoBackFill />
        <p>Quay lại</p>
      </div>
    </div>
  );
}
