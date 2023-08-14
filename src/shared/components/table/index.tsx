import './styles.scss';
import { Table } from 'antd';

export default function CustomTable(props: any) {
  const data = props.data;
  const columns = props.columns;
  return (
    <Table
      columns={columns}
      pagination={{ pageSize: 12, showSizeChanger: false, position: ['bottomRight'] }}
      dataSource={data}
    />
  );
}
