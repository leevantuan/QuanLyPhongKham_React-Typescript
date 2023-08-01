import { CustomSelectType } from '../../../@types';
import './styles.scss';

export default function CustomSelect(props: CustomSelectType) {
  const width = props.width;
  const height = props.height;
  const data = props.data;

  return (
    <select
      className="custom-select"
      style={{ width: `${width}px`, height: `${height}px` }}
      onChange={e => props.HandleChooseSelect(e.target.value)}
    >
      {data.map(data => {
        return (
          <option key={data} value={data}>
            {data}
          </option>
        );
      })}
    </select>
  );
}
