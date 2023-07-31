import { SearchOutlined } from '@ant-design/icons';

interface InputSearchProps {
  width: number | undefined;
  placeholder: string;
  HandleInputSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function InputSearch(props: InputSearchProps) {
  const width = props.width;
  const placeholder = props.placeholder;
  return (
    <div className="position-relative" style={{ width: `${width}px` }}>
      <input
        style={{ paddingTop: 10, paddingBottom: 10, borderRadius: 8 }}
        className="form-control"
        placeholder={placeholder}
        onChange={props.HandleInputSearch}
      />
      <i className="position-absolute " style={{ top: 8, right: 16, color: '#FF7506' }}>
        <SearchOutlined />
      </i>
    </div>
  );
}
