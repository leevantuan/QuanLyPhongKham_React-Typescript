import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Input } from 'antd';
import { InputTypeInterface } from '../../../@types';

export default function InputPassword(props: InputTypeInterface) {
  const width = props.width;
  const height = props.height;
  const placeholder = props.placeholder;
  const border = props.border;
  return (
    <Input.Password
      placeholder={placeholder}
      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
      onChange={event => props.HandleChangeInput(event)}
      style={{ width: `${width}px`, height: `${height}px`, border: `${border}` }}
    />
  );
}
