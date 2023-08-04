import { useEffect, useState } from 'react';
import NavBar from '../../../../../layout/navBar';
import InputSearch from '../../../../../shared/components/inputSearch';
import CustomSelect from '../../../../../shared/components/select';
import CustomTable from '../../../../../shared/components/table';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import './styles.scss';
import { MdAddBox } from 'react-icons/md';
import { GetDataDevices } from '../../../../../core/redux';
import { ColumnsType } from 'antd/es/table';
import { DeviceInterface, ListDeviceInterface } from '../../../../../@types';
import { GoDotFill } from 'react-icons/go';

const dataSelect1: string[] = ['Tất cả', 'Hoạt động', 'Ngưng hoạt động'];
const dataSelect2: string[] = ['Tất cả', 'Kết nối', 'Mất kết nối'];

export default function DSThietBi(props: ListDeviceInterface) {
  //colunms device
  const columns: ColumnsType<DeviceInterface> = [
    {
      key: 'deviceId',
      title: 'Mã thiết bị',
      dataIndex: 'deviceId',
    },
    {
      key: 'deviceName',
      title: 'Tên thiết bị',
      dataIndex: 'deviceName',
    },
    {
      key: 'addressIP',
      title: 'Địa chỉ IP',
      dataIndex: 'addressIP',
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
      key: 'connect',
      title: 'Trạng thái kết nối',
      render: (_, record) =>
        record.connect ? (
          <span className="status-online d-flex active-green">
            <GoDotFill />
            <p>Kết nối</p>
          </span>
        ) : (
          <span className="status-online d-flex active-red">
            <GoDotFill />
            <p>Mất kết nối</p>
          </span>
        ),
    },
    {
      key: 'userService',
      title: 'Dịch vụ sử dụng',
      render: (_, record, index) => {
        return (
          <>
            <p>
              {record.userService.length < 30
                ? record.userService
                : record.userService.slice(0, 30) + '...'}
            </p>
            {record.userService.length > 30 && (
              <p onClick={() => alert(record.userService)} className="text-link">
                {'Xem thêm'}
              </p>
            )}
          </>
        );
      },
    },
    {
      key: 'description',
      title: '',
      render: (_, record) => (
        <p className="text-link" onClick={() => props.HandleClickDescription(record.key)}>
          Chi tiết
        </p>
      ),
    },
    {
      key: 'update',
      title: '',
      render: (_, record) => (
        <p className="text-link" onClick={() => props.HandleClickUpdate(record.key)}>
          Cập nhập
        </p>
      ),
    },
  ];

  const dispatch = useAppDispatch();
  const ListDevices = useAppSelector(state => state.Device.Device);
  //get data device
  useEffect(() => {
    dispatch(GetDataDevices());
  }, [dispatch]);

  const [inputSearch, setInputSearch] = useState<string>('');
  const [onlineState, setOnlineState] = useState<string>('');
  const [connectState, setConnectState] = useState<string>('');
  const [newList, setNewList] = useState<DeviceInterface[]>([]);

  useEffect(() => {
    const newSearchText = ListDevices.filter(device => device.deviceId.includes(inputSearch));
    const newFilterOnline = newSearchText.filter(device => {
      if (onlineState === 'Hoạt động') {
        return device.online === true;
      } else if (onlineState === 'Ngưng hoạt động') {
        return device.online === false;
      } else {
        return device;
      }
    });
    const newFilterConnect = newFilterOnline.filter(device => {
      if (connectState === 'Kết nối') {
        return device.connect === true;
      } else if (connectState === 'Mất kết nối') {
        return device.connect === false;
      } else {
        return device;
      }
    });
    setNewList(newFilterConnect);
  }, [inputSearch, onlineState, connectState, ListDevices]);

  return (
    <div className="col-10 d-flex position-relative">
      <NavBar textLv1="Thiết bị >" textLv2="" textLv3=" Danh sách thiết bị" />
      <div className="content-DS-thietBi">
        <h3>Danh sách thiết bị</h3>
        <div className="navbar-DS-thietBi d-flex ms-4">
          <div className="mt-2">
            <p>Trạng thái hoạt động</p>
            <CustomSelect
              width={350}
              height={44}
              data={dataSelect1}
              HandleChooseSelect={select => setOnlineState(select)}
            />
          </div>
          <div className="mt-2 ms-4">
            <p>Trạng thái kết nối</p>
            <CustomSelect
              width={350}
              height={44}
              data={dataSelect2}
              HandleChooseSelect={select => setConnectState(select)}
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
        <div className="list-DS-thietBi m-4 ">
          <CustomTable data={newList} columns={columns} />
        </div>
      </div>
      <div
        className="button-add-device position-absolute"
        onClick={() => props.HandleClickAddDevice()}
      >
        <MdAddBox />
        <p> Thêm thiết bị</p>
      </div>
    </div>
  );
}
