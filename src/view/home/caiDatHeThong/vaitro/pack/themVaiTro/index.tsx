import { useState } from 'react';
import './styles.scss';
import { Input } from 'antd';
import { Checkbox, Col, Row } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import NavBar from '../../../../../../layout/navBar';
import { AddModalRoleInterface } from '../../../../../../@types';

const { TextArea } = Input;

export default function ThemVaiTro(props: AddModalRoleInterface) {
  const [roleName, setRoleName] = useState<string>('');
  const [describe, setDescribe] = useState<string>('');
  const [authorization, setAuthorization] = useState<string[]>([]);
  const [authorization2, setAuthorization2] = useState<string[]>([]);

  const onChange = (checkedValues: CheckboxValueType[]) => {
    if (checkedValues.find(value => value === '0') || checkedValues.length === 3) {
      const newCheckList: string[] = ['0'];
      setAuthorization(newCheckList);
    } else {
      const newCheckList: string[] = checkedValues as string[];
      setAuthorization(newCheckList);
    }
  };
  const onChange2 = (checkedValues: CheckboxValueType[]) => {
    if (checkedValues.find(value => value === '0') || checkedValues.length === 3) {
      const newCheckList: string[] = ['0'];
      setAuthorization2(newCheckList);
    } else {
      const newCheckList: string[] = checkedValues as string[];
      setAuthorization2(newCheckList);
    }
  };
  return (
    <div className="col-10 d-flex position-relative">
      <NavBar text="Vai trò" />
      <div className="content-add-role">
        <h3>Quản lí vai trò</h3>
        <div className="form-add-role">
          <h5>Thông tin vai trò</h5>
          <form className="d-flex justify-content-between">
            <div className="col-6">
              <div className="col-12 mb-3">
                <label className="form-label">Tên vai trò</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập tên vai trò"
                  onChange={e => setRoleName(e.target.value)}
                />
              </div>
              <div className="col-12 mb-3">
                <label className="form-label">Mô tả</label>
                <TextArea
                  onChange={e => setDescribe(e.target.value)}
                  placeholder="Nhập mô tả"
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </div>
              <p className="p-sao">Là trường hợp bắt buộc</p>
            </div>
            <div className="col-12">
              <div className="mb-3">
                <label className="form-label">Phân quyên chức năng</label>
                <div className="form-phan-quyen">
                  <div>
                    <h5>Nhóm chức năng chính</h5>
                    <Checkbox.Group
                      style={{ width: '100%' }}
                      value={authorization}
                      onChange={onChange}
                    >
                      <Row>
                        <Col>
                          <Checkbox value="0">Tất cả</Checkbox>
                        </Col>
                        <Col>
                          <Checkbox value="1">Cài đặt hệ thống</Checkbox>
                        </Col>
                        <Col>
                          <Checkbox value="2">Dịch vụ</Checkbox>
                        </Col>
                        <Col>
                          <Checkbox value="3">Thiết bị</Checkbox>
                        </Col>
                      </Row>
                    </Checkbox.Group>
                  </div>
                  <div>
                    <h5>Nhóm chức năng phụ</h5>
                    <Checkbox.Group
                      style={{ width: '100%' }}
                      value={authorization2}
                      onChange={onChange2}
                    >
                      <Row>
                        <Col>
                          <Checkbox value="0">Tất cả</Checkbox>
                        </Col>
                        <Col>
                          <Checkbox value="1">Cấp số</Checkbox>
                        </Col>
                        <Col>
                          <Checkbox value="2">Báo cáo</Checkbox>
                        </Col>
                        <Col>
                          <Checkbox value="3">Dashboard</Checkbox>
                        </Col>
                      </Row>
                    </Checkbox.Group>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="d-flex justify-content-center">
          <button onClick={() => props.HandleClickCancelAddRole()}>Hủy bỏ</button>
          <button
            onClick={() =>
              props.HandleClickOkAddRole(roleName, describe, authorization, authorization2)
            }
          >
            Thêm vai trò
          </button>
        </div>
      </div>
    </div>
  );
}
