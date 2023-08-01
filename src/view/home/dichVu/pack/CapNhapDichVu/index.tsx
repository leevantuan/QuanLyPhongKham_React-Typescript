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
  const ListServices = useAppSelector(state => state.queuing_system.Service);
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
      setDescribe(services.describe);
      setRule(services.rule);
    }
  }, [services]);

  const [perfix, setPerfix] = useState<string>('0001');
  const [surfix, setSurfix] = useState<string>('0001');
  const [numberAutoFrom, setNumberAutoFrom] = useState<string>('0001');
  const [numberAutoTo, setNumberAutoTo] = useState<string>('9999');

  const onChange = (checkedValues: CheckboxValueType[]) => {
    const newCheckList: string[] = checkedValues as string[];
    setRule(newCheckList);
  };
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar textLv1="Dịch vụ >" textLv2="Danh sách dịch vụ >" textLv3="Cập nhập" />
      <div className="content-update-service">
        <h3>Quản lí dịch vụ</h3>
        <div className="form-update-service">
          <h5>Thông tin dịch vụ</h5>
          <form className="d-flex justify-content-between">
            <div className="col-6">
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
            </div>
            <div className="col-12">
              <div className="mb-3">
                <label className="form-label">Mô tả</label>
                <TextArea
                  onChange={e => setDescribe(e.target.value)}
                  value={describe}
                  autoSize={{ minRows: 3, maxRows: 5 }}
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
                    <input
                      value={numberAutoFrom}
                      type="text"
                      onChange={e => setNumberAutoFrom(e.target.value)}
                    />{' '}
                    đến{' '}
                    <input
                      value={numberAutoTo}
                      type="text"
                      onChange={e => setNumberAutoTo(e.target.value)}
                    />
                  </Checkbox>
                </Col>
                <Col>
                  <Checkbox value="2">
                    <p>Prefix</p>
                    <input value={perfix} type="text" onChange={e => setPerfix(e.target.value)} />
                  </Checkbox>
                </Col>
                <Col>
                  <Checkbox value="3">
                    <p>Surfix</p>
                    <input value={surfix} type="text" onChange={e => setSurfix(e.target.value)} />
                  </Checkbox>
                </Col>
                <Col>
                  <Checkbox value="4">Reset mỗi ngày</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </div>
          <p>Là trường hợp bắt buộc</p>
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={() => props.HandleClickCancelUpdateService()}>Hủy bỏ</button>
          <button onClick={() => props.HandleClickOkUpdateService()}>Cập nhập dịch vụ</button>
        </div>
      </div>
    </div>
  );
}
