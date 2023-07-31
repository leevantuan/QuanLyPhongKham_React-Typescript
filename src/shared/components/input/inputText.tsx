import { Input } from 'antd';
import { InputTypeInterface } from '../../../@types';

export default function InputText(props: InputTypeInterface) {
  const width = props.width;
  const height = props.height;
  const placeholder = props.placeholder;
  const border = props.border;
  return (
    <Input
      placeholder={placeholder}
      onChange={event => props.HandleChangeInput(event)}
      style={{ width: `${width}px`, height: `${height}px`, border: `${border}` }}
    />
  );
}
