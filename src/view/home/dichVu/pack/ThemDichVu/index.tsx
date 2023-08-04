import { useState } from 'react';
import NavBar from '../../../../../layout/navBar';
import './styles.scss';
import { Input } from 'antd';
import { Checkbox, Col, Row } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { AddServiceInterface } from '../../../../../@types';

const { TextArea } = Input;

export default function ThemDichVu(props: AddServiceInterface) {
  const [serviceId, setServiceId] = useState<string>('');
  const [serviceName, setServiceName] = useState<string>('');
  const [describe, setDescribe] = useState<string>('');
  const [rule, setRule] = useState<string[]>([]);

  const onChange = (checkedValues: CheckboxValueType[]) => {
    const newCheckList: string[] = checkedValues as string[];
    setRule(newCheckList);
  };
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar textLv1="Dịch vụ >" textLv2="Danh sách dịch vụ >" textLv3="Thêm dịch vụ" />
      <div className="content-add-service">
        <h3>Quản lí dịch vụ</h3>
        <div className="form-add-service">
          <h5>Thông tin dịch vụ</h5>
          <form className="d-flex justify-content-between">
            <div className="col-6">
              <div className="col-12 mb-3">
                <label className="form-label">Mã dịch vụ</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập mã dịch vụ"
                  onChange={e => setServiceId(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Tên dịch vụ</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập tên dịch vụ"
                  onChange={e => setServiceName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-12">
              <div className="mb-3">
                <label className="form-label">Mô tả</label>
                <TextArea
                  onChange={e => setDescribe(e.target.value)}
                  placeholder="Nhập mô tả"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </div>
            </div>
          </form>
          <h5 className="mt-3">Quy tắc cấp số</h5>
          <div className="choose-quy-tac">
            <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
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
          <p>Là trường hợp bắt buộc</p>
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={() => props.HandleClickCancelAddService()}>Hủy bỏ</button>
          <button
            onClick={() => props.HandleClickOkAddService(serviceId, serviceName, describe, rule)}
          >
            Thêm dịch vụ
          </button>
        </div>
      </div>
    </div>
  );
}
