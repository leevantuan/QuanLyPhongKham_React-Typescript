import './styles.scss';
import { Table } from 'antd';
import { DataTableInterface } from '../../../@types';

export default function CustomTable(props: DataTableInterface) {
  const data = props.data;
  const columns = props.columns;
  return (
    <Table
      columns={columns}
      pagination={{ pageSize: 10, showSizeChanger: false, position: ['bottomRight'] }}
      dataSource={data}
    />
  );
}
