import { useEffect, useState } from 'react';
import NavBar from '../../../../../layout/navBar';
import './styles.scss';
import CustomSelect from '../../../../../shared/components/select';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import { GetDataServices } from '../../../../../core/redux';
import { AddDataCapSoInterface } from '../../../../../@types';
import moment from 'moment';
// import { NewNumber } from '../../../../../HandleLogic';

export default function CapSo(props: AddDataCapSoInterface) {
  const dateNow = moment().format('DD/MM/YYYY');
  const datTimeNow = new Date();
  const dispatch = useAppDispatch();
  const ListServices = useAppSelector(state => state.Service.Service);
  // const ListDetailServices = useAppSelector(state => state.ServiceDetail.ServiceDetail);

  const [newListService, setNewListService] = useState<string[]>([]);
  const [capSo, setCapSo] = useState<string>('');
  const [chooseService, setChooseService] = useState<string>('');
  const [serviceId, setServiceId] = useState<string>('');
  //get data Services
  useEffect(() => {
    dispatch(GetDataServices());
  }, [dispatch]);

  useEffect(() => {
    const serviceName = ListServices.map(service => service.serviceName);
    if (serviceName) {
      setNewListService(serviceName);
      setChooseService(serviceName[0]);
    }
  }, [ListServices]);
  //check service ID
  useEffect(() => {
    if (chooseService && ListServices) {
      const checkId = ListServices.find(service => service.serviceName === chooseService);
      if (checkId) {
        setServiceId(checkId.serviceId);
      }
    }
  }, [ListServices, chooseService]);
  //check cap so STT
  // useEffect(() => {
  //   if (ListDetailServices) {
  //     const listData = ListDetailServices.filter(servicer => servicer.date === dateNow);
  //     const newlistData = listData.filter(data => data.serviceId === serviceId);
  //     const newNumber = NewNumber(newlistData, serviceId);
  //     setCapSo(newNumber);
  //   }
  // }, [ListDetailServices, dateNow, serviceId, chooseService]);
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Phòng Khám" />
      <div className="content-form-CapSo">
        <h3>Quản lí cấp số</h3>
        <div className="form-CapSo text-center">
          <h1>Cấp số mới</h1>
          <h5>Dịch vụ khách hàng lựa chọn</h5>
          <CustomSelect
            width={550}
            height={50}
            data={newListService}
            HandleChooseSelect={select => {
              setChooseService(select);
            }}
          />
          <div className="d-flex justify-content-center">
            <button onClick={() => props.HandleClickCancelCapSo()}>Hủy bỏ</button>
            <button
              onClick={() => props.HandleClickAddCapSo(capSo, datTimeNow, serviceId, chooseService)}
            >
              In số
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
