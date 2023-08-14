import { AiOutlineCalendar } from 'react-icons/ai';
import { AiOutlineCarryOut } from 'react-icons/ai';
import { BsPass } from 'react-icons/bs';
import { LuPhoneCall } from 'react-icons/lu';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { AiOutlineArrowUp } from 'react-icons/ai';
import './styles.scss';
import { BDCapSoType } from '../../../../@types';

export default function BDCapSo(props: BDCapSoType) {
  const activeColor = props.activeColor;
  return (
    <div className="bd-cap-so m-3 p-4">
      <div className="d-flex">
        <i className={`icons-bd-cap-so ${activeColor}`}>
          {props.icons === 1 ? (
            <AiOutlineCalendar />
          ) : props.icons === 2 ? (
            <AiOutlineCarryOut />
          ) : props.icons === 3 ? (
            <BsPass />
          ) : (
            <LuPhoneCall />
          )}
        </i>
        <h5>{props.text}</h5>
      </div>
      <div className="d-flex mt-3">
        <h1>{props.data}</h1>
        {props.percentStatus ? (
          <p className="activePercent-1">
            <AiOutlineArrowUp />
            {props.percent}%
          </p>
        ) : (
          <p className="activePercent-2">
            <AiOutlineArrowDown />
            {props.percent}%
          </p>
        )}
      </div>
    </div>
  );
}
