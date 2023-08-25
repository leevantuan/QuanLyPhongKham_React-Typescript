import { TbBrandWechat } from 'react-icons/tb';
import CustomDoughnut from '../doughnut';
import './styles.scss';
import { BsDot } from 'react-icons/bs';
import { DoughtnutInterface } from '../../../../@types';

export default function DashBoardDoughnut(props: DoughtnutInterface) {
  return (
    <div className="BD-percent ms-4 d-flex">
      <div style={{ width: 150, height: 115 }}>
        <CustomDoughnut
          colorOne={`${props.colorOne}`}
          colorTwo={`${props.colorTwo}`}
          percent={props.percent}
        />
      </div>
      <div style={{ width: 105, height: 115, marginTop: 24 }}>
        <h3 className="fw-bold">{20 + 40}</h3>
        <p style={{ color: `${props.colorOne}`, fontSize: 20 }}>
          <span className="me-2" style={{ fontSize: 20 }}>
            <TbBrandWechat />
          </span>
          {props.textTitle}
        </p>
      </div>
      <div style={{ height: 115, marginTop: 24 }}>
        <p className=" d-flex">
          <span style={{ color: `${props.colorOne}`, fontSize: 20 }} className="col-1 ">
            <BsDot />
          </span>
          <p className="col-9 ms-2">{props.textOne}</p>
          <p style={{ color: `${props.colorOne}`, fontWeight: 'bold' }} className="col-2">
            {props.quantityTrue}
          </p>
        </p>
        <p className="mt-2 d-flex">
          <span style={{ color: '#7e7d88', fontSize: 20 }} className="col-1">
            <BsDot />
          </span>
          <p className="col-9 ms-2">{props.textTwo}</p>
          <p style={{ color: `${props.colorOne}`, fontWeight: 'bold' }} className="col-2">
            {props.quantityFalse}
          </p>
        </p>
      </div>
    </div>
  );
}
