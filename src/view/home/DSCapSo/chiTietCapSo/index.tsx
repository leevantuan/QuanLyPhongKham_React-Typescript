import NavBar from '../../../../layout/navBar';
import './styles.scss';
import { useAppDispatch, useAppSelector } from '../../../../shared/hooks/customRedux';
import { useEffect, useState } from 'react';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { DetailCapSoInterface } from '../../../../@types';
import { GoDotFill } from 'react-icons/go';

export default function ChiTietCapSo(props: DetailCapSoInterface) {
  //colunms device

  const dispatch = useAppDispatch();
  // const ListDetailServices = useAppSelector(state => state.ServiceDetail.ServiceDetail);

  // const [listData, setListData] = useState<DataServiceDetailInterface>();
  //get data Services detail
  useEffect(() => {
    // dispatch(GetDataServicDetail());
  }, [dispatch]);
  // useEffect(() => {
  //   if (props.id) {
  //     const newList = ListDetailServices.find(service => service.key === props.id);
  //     setListData(newList);
  //   }
  // }, [props.id, ListDetailServices]);
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Phòng Khám" />
      <div className="content-chiTiet-CapSo">
        <h3>Quản lí cấp số</h3>
        <div>
          <h5>Thông tin cấp số</h5>
          {/* <div className="d-flex">
            <div>
              <div className="d-flex">
                <label>Họ tên:</label>
                <p>{listData?.customerName}</p>
              </div>
              <div className="d-flex">
                <label>Tên dịch vụ:</label>
                <p>{listData?.serviceName}</p>
              </div>
              <div className="d-flex">
                <label>Số thứ tự:</label>
                <p>{listData?.stt}</p>
              </div>
              <div className="d-flex">
                <label>Thời gian cấp:</label>
                <p>{listData?.time + ' - ' + listData?.date} </p>
              </div>
              <div className="d-flex">
                <label>Hạn sử dụng:</label>
                <p>{listData?.toTime + ' - ' + listData?.toDate}</p>
              </div>
            </div>
            <div>
              <div className="d-flex">
                <label>Nguồn cấp:</label>
                <p>{listData?.source}</p>
              </div>
              <div className="d-flex">
                <label>Trạng thái:</label>
                <p>
                  {listData?.status === 'success' ? (
                    <span className="status-online d-flex active-gray">
                      <GoDotFill />
                      <p>Đã sử dụng</p>
                    </span>
                  ) : listData?.status === 'waiting' ? (
                    <span className="status-online d-flex active-blue">
                      <GoDotFill />
                      <p>Đang chờ</p>
                    </span>
                  ) : (
                    <span className="status-online d-flex active-red">
                      <GoDotFill />
                      <p>Bỏ qua</p>
                    </span>
                  )}
                </p>
              </div>
              <div className="d-flex">
                <label>Số điện thoại:</label>
                <p>{listData?.phoneNumber}</p>
              </div>
              <div className="d-flex">
                <label>Địa chỉ Email:</label>
                <p>{listData?.email}</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div
        className="button-goback-capSo position-absolute"
        onClick={() => props.HandleClickGoBack()}
      >
        <RiArrowGoBackFill />
        <p> Quay lại</p>
      </div>
    </div>
  );
}
