import { useEffect, useState } from 'react';
import NavBar from '../../../../../layout/navBar';
import './styles.scss';
import { Input } from 'antd';
import { Checkbox, Col, Row } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { ServiceInterface, UpdateServiceInterface } from '../../../../../@types';
import { useAppDispatch, useAppSelector } from '../../../../../shared/hooks/customRedux';
import { GetDataServices } from '../../../../../core/redux';

const { TextArea } = Input;

export default function CapNhapDichVu(props: UpdateServiceInterface) {
  const dispatch = useAppDispatch();
  const ListServices = useAppSelector(state => state.Service.Service);
  //get data Services
  useEffect(() => {
    dispatch(GetDataServices());
  }, [dispatch]);
  //find service
  const [services, setServices] = useState<ServiceInterface>();

  const [serviceId, setServiceId] = useState<string>('');
  const [serviceName, setServiceName] = useState<string>('');
  const [describe, setDescribe] = useState<string>('');
  const [rule, setRule] = useState<string[]>([]);

  useEffect(() => {
    if (props.id) {
      const newList = ListServices.find(service => service.key === props.id);
      setServices(newList);
    }
  }, [ListServices, props.id]);
  //set value
  useEffect(() => {
    if (services) {
      setServiceId(services.serviceId);
      setServiceName(services.serviceName);
      // setDescribe(services.describe);
      setRule(services.rule);
    }
  }, [services]);

  const onChange = (checkedValues: CheckboxValueType[]) => {
    const newCheckList: string[] = checkedValues as string[];
    setRule(newCheckList);
  };
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Phòng Khám" />
      <div className="content-update-service">
        <h3>Quản lí dịch vụ</h3>
        <div className="form-update-service">
          <h5>Thông tin dịch vụ</h5>
          <form className="d-flex justify-content-between">
            <div className="col-12">
              <div className="col-12 mb-3">
                <label className="form-label">Mã dịch vụ</label>
                <input
                  type="text"
                  className="form-control"
                  value={serviceId}
                  onChange={e => setServiceId(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Tên dịch vụ</label>
                <input
                  type="text"
                  className="form-control"
                  value={serviceName}
                  onChange={e => setServiceName(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Trạng thái</label>
                <input
                  type="text"
                  className="form-control"
                  value={serviceName}
                  onChange={e => setServiceName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="mb-3">
                <label className="form-label">Số phòng</label>
                <input
                  type="text"
                  className="form-control"
                  value={serviceName}
                  onChange={e => setServiceName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Giá dịch vụ</label>
                <input
                  type="text"
                  className="form-control"
                  value={serviceName}
                  onChange={e => setServiceName(e.target.value)}
                />
              </div>
            </div>
          </form>
          <h5 className="mt-3">Quy tắc cấp số</h5>
          <div className="choose-quy-tac">
            <Checkbox.Group style={{ width: '100%' }} onChange={onChange} value={rule}>
              <Row>
                <Col>
                  <Checkbox value="1">
                    <p>Tăng tự động từ:</p>
                    <input value={'0001'} type="text" disabled /> đến{' '}
                    <input value={'9999'} type="text" disabled />
                  </Checkbox>
                </Col>
                <Col>
                  <Checkbox value="2">
                    <p>Prefix</p>
                    <input value={'0001'} type="text" disabled />
                  </Checkbox>
                </Col>
                <Col>
                  <Checkbox value="3">
                    <p>Surfix</p>
                    <input value={'0001'} type="text" disabled />
                  </Checkbox>
                </Col>
                <Col>
                  <Checkbox value="4">Reset mỗi ngày</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={() => props.HandleClickCancelUpdateService()}>Hủy bỏ</button>
          <button
            onClick={() => props.HandleClickOkUpdateService(serviceId, serviceName, describe, rule)}
          >
            Cập nhập dịch vụ
          </button>
        </div>
      </div>
    </div>
  );
}
