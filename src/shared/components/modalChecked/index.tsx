import { ModalCheckedInterface } from '../../../@types';
import './styles.scss';
import { Modal } from 'antd';
import { Checkbox, Row } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useState } from 'react';

export default function ModalChecked(props: ModalCheckedInterface) {
  const check = props.text;
  const [checked, setChecked] = useState<CheckboxValueType[]>(['Tất cả']);
  const onChange = (checkedValues: CheckboxValueType[]) => {
    if (checkedValues.find(check => check === 'Tất cả')) {
      setChecked(['Tất cả']);
    } else {
      setChecked(checkedValues);
    }
  };
  return (
    <>
      <Modal
        open={props.open}
        title={props.title}
        centered
        onCancel={props.HandleClickCancel}
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
          <Checkbox.Group style={{ width: '100%' }} onChange={onChange} value={checked}>
            <Row>
              {props.data.map(event => {
                return (
                  <div
                    className={
                      check.find(check => check === 'Tất cả')
                        ? 'content-filter active-filter'
                        : 'content-filter'
                    }
                    key={event}
                    onClick={() => props.HandleClickSetValue(checked)}
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
    </>
  );
}
