import { CustomSelectType } from '../../../@types';
import './styles.scss';

export default function CustomSelect(props: CustomSelectType) {
  const width = props.width;
  const height = props.height;
  const data = props.data;

  const handleChange = (value: string) => {
    console.log(value);
  };
  return (
    <select
      className="custom-select"
      style={{ width: `${width}px`, height: `${height}px` }}
      onChange={e => handleChange(e.target.value)}
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
