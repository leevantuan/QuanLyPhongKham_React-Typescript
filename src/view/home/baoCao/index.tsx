import './styles.scss';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import type { DatePickerProps } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../shared/hooks/customRedux';
import NavBar from '../../../layout/navBar';
import CustomTable from '../../../shared/components/table';
import { FaSort } from 'react-icons/fa';
import { GoDotFill } from 'react-icons/go';
import ModalFilter from '../../../shared/components/modalFilter';
import { ConvertToTimestamp, HandleDates, Sort, SortDate } from '../../../HandleLogic';
import ModalChecked from '../../../shared/components/modalChecked';
import { Modal } from 'antd';
import { Checkbox, Row } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

export default function ViewBaoCao() {
  const dispatch = useAppDispatch();
  // const ListDetailServices = useAppSelector(state => state.ServiceDetail.ServiceDetail);

  //get data Services
  useEffect(() => {
    // dispatch(GetDataServicDetail());
  }, [dispatch]);

  const onChangeFromDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  const onChangeToDate: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };
  const onChange = (checkedValues: CheckboxValueType[]) => {
    if (checkedValues.find(check => check === 'Tất cả')) {
      setFilterServiceName(['Tất cả']);
    } else {
      const newData = checkedValues.map(event => event.toString());
      setFilterServiceName(newData);
    }
  };

  const [filterSTT, setFilterSTT] = useState<string>('Tất cả');
  const [filterServiceName, setFilterServiceName] = useState<string[]>(['Tất cả']);
  const [filterDate, setFilterDate] = useState<string>('Tất cả');
  const [filterStatus, setFilterSatus] = useState<string>('Tất cả');
  const [filterSource, setFilterSource] = useState<string>('Tất cả');

  const [openSTT, setOpenSTT] = useState<boolean>(false);
  const [openServiceName, setOpenServiceName] = useState<boolean>(false);
  const [openDate, setOpenDate] = useState<boolean>(false);
  const [openStatus, setOpenSatus] = useState<boolean>(false);
  const [openSource, setOpenSource] = useState<boolean>(false);

  const [listSTT, setListSTT] = useState<string[]>([]);
  const [listServiceName, setListServiceName] = useState<string[]>([]);
  const [listDate, setListDate] = useState<string[]>([]);
  const [listStatus] = useState<string[]>(['Tất cả', 'Đang chờ', 'Đã sử dụng', 'Bỏ qua']);
  const [listSource] = useState<string[]>(['Tất cả', 'kiosk', 'Hệ thống']);
  // const [listData, setListData] = useState<DataServiceDetailInterface[]>([]);

  // useEffect(() => {
  //   //set data stt
  //   const listSTT = ListDetailServices.map(service => service.stt);
  //   const newListStt = listSTT.filter((value, index, array) => array.indexOf(value) === index);
  //   const setListStt = Sort(newListStt);
  //   if (setListStt) {
  //     const defaultList = ['Tất cả'];
  //     const newList = defaultList.concat(setListStt);
  //     setListSTT(newList);
  //   }
  //   //set data service
  //   const listService = ListDetailServices.map(service => service.serviceName);
  //   const newListService = listService.filter(
  //     (value, index, array) => array.indexOf(value) === index,
  //   );
  //   const setListService = Sort(newListService);
  //   if (setListService) {
  //     const defaultList = ['Tất cả'];
  //     const newList = defaultList.concat(setListService);
  //     setListServiceName(newList);
  //   }
  //   //set data date
  //   const listDate = ListDetailServices.map(service => service.date);
  //   const newListDate = listDate.filter((value, index, array) => array.indexOf(value) === index);
  //   const setToDate = newListDate.map(date => ConvertToTimestamp(date, '00:00:00'));
  //   const newSortListDate = SortDate(setToDate);
  //   const AfterSortData = newSortListDate.map(date => HandleDates(date));
  //   if (AfterSortData) {
  //     const defaultList = ['Tất cả'];
  //     const newList = defaultList.concat(AfterSortData);
  //     setListDate(newList);
  //   }
  // }, [ListDetailServices]);

  //filter

  // useEffect( () =>
  // {
  //   //STT
  //   let listDataStt: DataServiceDetailInterface[] = [];
  //   if (filterSTT === 'Tất cả') {
  //     listDataStt = ListDetailServices;
  //   } else {
  //     // listDataStt = ListDetailServices.filter(service => service.stt === filterSTT);
  //   }
  //   //Service name
  //   let listDataServiceName: DataServiceDetailInterface[] = [];
  //   if (filterServiceName.find(service => service === 'Tất cả')) {
  //     listDataServiceName = listDataStt;
  //   } else {
  //     listDataServiceName = listDataStt.filter(data =>
  //       filterServiceName.includes(data.serviceName),
  //     );
  //   }
  //   //filterDate
  //   let listDataDate: DataServiceDetailInterface[] = [];
  //   if (filterDate === 'Tất cả') {
  //     listDataDate = listDataServiceName;
  //   } else {
  //     listDataDate = listDataServiceName.filter(service => service.date === filterDate);
  //   }
  //   //Status
  //   let listDataStatus: DataServiceDetailInterface[] = [];
  //   if (filterStatus === 'Tất cả') {
  //     listDataStatus = listDataDate;
  //   } else if (filterStatus === 'Đang chờ') {
  //     listDataStatus = listDataDate.filter(service => service.status === 'waiting');
  //   } else if (filterStatus === 'Đã sử dụng') {
  //     listDataStatus = listDataDate.filter(service => service.status === 'success');
  //   } else {
  //     listDataStatus = listDataDate.filter(service => service.status === 'pass');
  //   }
  //   //filterSource
  //   let listDataSource: DataServiceDetailInterface[] = [];
  //   if (filterSource === 'Tất cả') {
  //     listDataSource = listDataStatus;
  //   } else if (filterSource === 'Hệ thống') {
  //     listDataSource = listDataStatus.filter(service => service.source === 'Hệ thống');
  //   } else {
  //     listDataSource = listDataStatus.filter(service => service.source === 'kiosk');
  //   }
  //   setListData(listDataSource);
  // }, [ListDetailServices, filterSTT, filterServiceName, filterDate, filterStatus, filterSource]);

  //colunms device
  // const columns: ColumnsType<DataServiceDetailInterface> = [
  //   {
  //     title: (
  //       <Space className="d-flex justify-content-between text-white">
  //         <span>Số thứ tự</span>
  //         {filterSTT === 'Tất cả' ? (
  //           <i onClick={() => setOpenSTT(true)} style={{ cursor: 'pointer' }}>
  //             <FaSort />
  //           </i>
  //         ) : (
  //           <i onClick={() => setOpenSTT(true)} style={{ cursor: 'pointer', color: 'blue' }}>
  //             <FaSort />
  //           </i>
  //         )}
  //       </Space>
  //     ),
  //     dataIndex: 'stt',
  //   },
  //   {
  //     title: (
  //       <Space className="d-flex justify-content-between text-white">
  //         <span>Tên dịch vụ</span>
  //         {filterServiceName.find(event => event === 'Tất cả') ? (
  //           <i onClick={() => setOpenServiceName(true)} style={{ cursor: 'pointer' }}>
  //             <FaSort />
  //           </i>
  //         ) : (
  //           <i
  //             onClick={() => setOpenServiceName(true)}
  //             style={{ cursor: 'pointer', color: 'blue' }}
  //           >
  //             <FaSort />
  //           </i>
  //         )}
  //       </Space>
  //     ),
  //     dataIndex: 'serviceName',
  //   },
  //   {
  //     title: (
  //       <Space className="d-flex justify-content-between text-white">
  //         <span>Thời gian cấp</span>
  //         {filterDate === 'Tất cả' ? (
  //           <i onClick={() => setOpenDate(true)} style={{ cursor: 'pointer' }}>
  //             <FaSort />
  //           </i>
  //         ) : (
  //           <i onClick={() => setOpenDate(true)} style={{ cursor: 'pointer', color: 'blue' }}>
  //             <FaSort />
  //           </i>
  //         )}
  //       </Space>
  //     ),
  //     dataIndex: 'date',
  //   },
  //   {
  //     title: (
  //       <Space className="d-flex justify-content-between text-white">
  //         <span>Tình trạng</span>
  //         {filterStatus === 'Tất cả' ? (
  //           <i onClick={() => setOpenSatus(true)} style={{ cursor: 'pointer' }}>
  //             <FaSort />
  //           </i>
  //         ) : (
  //           <i onClick={() => setOpenSatus(true)} style={{ cursor: 'pointer', color: 'blue' }}>
  //             <FaSort />
  //           </i>
  //         )}
  //       </Space>
  //     ),
  //     render: (_, record) =>
  //       record.status === 'success' ? (
  //         <span className="status-online d-flex active-gray">
  //           <GoDotFill />
  //           <p>Đã sử dụng</p>
  //         </span>
  //       ) : record.status === 'waiting' ? (
  //         <span className="status-online d-flex active-blue">
  //           <GoDotFill />
  //           <p>Đang chờ</p>
  //         </span>
  //       ) : (
  //         <span className="status-online d-flex active-red">
  //           <GoDotFill />
  //           <p>Bỏ qua</p>
  //         </span>
  //       ),
  //   },
  //   {
  //     title: (
  //       <Space className="d-flex justify-content-between text-white">
  //         <span>Nguồn cấp</span>
  //         {filterSource === 'Tất cả' ? (
  //           <i onClick={() => setOpenSource(true)} style={{ cursor: 'pointer' }}>
  //             <FaSort />
  //           </i>
  //         ) : (
  //           <i onClick={() => setOpenSource(true)} style={{ cursor: 'pointer', color: 'blue' }}>
  //             <FaSort />
  //           </i>
  //         )}
  //       </Space>
  //     ),
  //     dataIndex: 'source',
  //   },
  // ];
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Phòng Khám" />
      <ModalFilter
        open={openSTT}
        HandleClickCancel={() => setOpenSTT(false)}
        title="Số thứ tự"
        data={listSTT}
        HandleClickSetValue={event => setFilterSTT(event)}
        text={filterSTT}
      />
      <Modal
        open={openServiceName}
        title="Tên dịch vụ"
        centered
        onCancel={() => setOpenServiceName(false)}
        footer={[]}
      >
        <div
          id="scrollableDiv"
          style={{
            minHeight: 208,
            maxHeight: 278,
            overflow: 'auto',
          }}
        >
          <Checkbox.Group style={{ width: '100%' }} onChange={onChange} value={filterServiceName}>
            <Row>
              {listServiceName.map(event => {
                return (
                  <div
                    className={
                      filterServiceName.find(check => check === event)
                        ? 'content-filter active-filter'
                        : 'content-filter'
                    }
                    key={event}
                  >
                    <Checkbox value={event}>
                      <h4>{event}</h4>
                    </Checkbox>
                  </div>
                );
              })}
            </Row>
          </Checkbox.Group>
        </div>
      </Modal>
      {/* <ModalChecked
        open={openServiceName}
        HandleClickCancel={() => setOpenServiceName(false)}
        title="Tên dịch vụ"
        data={listServiceName}
        HandleClickSetValue={event => {
          const newData = event.map(event => event.toString());
          setFilterServiceName(newData);
        }}
        text={filterServiceName}
      /> */}
      <ModalFilter
        open={openDate}
        HandleClickCancel={() => setOpenDate(false)}
        title="Thời gian cấp"
        data={listDate}
        HandleClickSetValue={event => setFilterDate(event)}
        text={filterDate}
      />
      <ModalFilter
        open={openStatus}
        HandleClickCancel={() => setOpenSatus(false)}
        title="Tình trạng"
        data={listStatus}
        HandleClickSetValue={event => setFilterSatus(event)}
        text={filterStatus}
      />
      <ModalFilter
        open={openSource}
        HandleClickCancel={() => setOpenSource(false)}
        title="Nguồn cấp"
        data={listSource}
        HandleClickSetValue={event => setFilterSource(event)}
        text={filterSource}
      />

      <div className="content-DS-report">
        <div className="navbar-DS-report d-flex ms-4">
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
        </div>
        <div className="list-DS-report m-4 ">
          {/* <CustomTable data={listData} columns={columns} /> */}
        </div>
      </div>
    </div>
  );
}
