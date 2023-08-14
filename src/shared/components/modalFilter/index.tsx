import { ModalFilterInterface } from '../../../@types';
import './styles.scss';
import { Modal } from 'antd';

export default function ModalFilter(props: ModalFilterInterface) {
  const check = props.text;
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
          {props.data.map(event => {
            return (
              <div
                className={check === event ? 'content-filter active-filter' : 'content-filter'}
                key={event}
                onClick={() => props.HandleClickSetValue(event)}
              >
                <h4>{event}</h4>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
}
