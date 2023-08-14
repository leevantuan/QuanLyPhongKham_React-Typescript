import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { CategoryScale, LinearScale, PointElement, LineElement, Title, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartInterface } from '../../../../@types';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/customRedux';
import { GetDataServicDetail } from '../../../../core/redux';
import moment from 'moment';
import { ConvertToTimestamp, SoSanhMonth } from '../../../../HandleLogic';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  Tooltip,
  Filler,
  Legend,
);

const createGradient = () => {
  const ctx = document.createElement('canvas').getContext('2d');
  if (!ctx) return;
  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, 'rgba(92, 136, 255)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)');

  return gradient;
};

const options = {
  scales: {
    x: {
      grid: {
        display: false, // Tắt lưới dọc (trục y)
        color: '#5185F7',
      },
    },
    y: {
      grid: {
        display: true,
        color: 'rgba(0,0,0,0.1)',
      },
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false, // tắt label
    },
  },
};
export default function LineChart(props: ChartInterface) {
  const checked = props.select;
  const monthNow = moment().format('MM/YYYY');
  const yearNow = moment().format('YYYY');
  const dispatch = useAppDispatch();
  const listData = useAppSelector(state => state.ServiceDetail.ServiceDetail);

  useEffect(() => {
    dispatch(GetDataServicDetail());
  }, [dispatch]);

  const [listDays] = useState<string[]>(['01', '08', '15', '22', '31']);
  const [listWeeks] = useState<string[]>(['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4']);
  const [listMonths] = useState<string[]>([
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ]);

  const [totalDays, setTotalDays] = useState<number[]>([]);
  const [totalWeeks, setTotalWeeks] = useState<number[]>([]);
  const [totalMonths, setTotalMonths] = useState<number[]>([]);

  useEffect(() => {
    //custom days
    const customListDays = listDays.map(days => {
      switch (days) {
        case '01': {
          const check = listData.filter(data => data.date === `01/${monthNow}`);
          return check.length;
        }
        case '08': {
          const check = listData.filter(
            data =>
              ConvertToTimestamp(data.date, '00:00:00') >
                ConvertToTimestamp(`01/${monthNow}`, '00:00:00') &&
              ConvertToTimestamp(data.date, '00:00:00') <=
                ConvertToTimestamp(`08/${monthNow}`, '00:00:00'),
          );
          return check.length;
        }
        case '15': {
          const check = listData.filter(
            data =>
              ConvertToTimestamp(data.date, '00:00:00') >
                ConvertToTimestamp(`08/${monthNow}`, '00:00:00') &&
              ConvertToTimestamp(data.date, '00:00:00') <=
                ConvertToTimestamp(`15/${monthNow}`, '00:00:00'),
          );
          return check.length;
        }
        case '22': {
          const check = listData.filter(
            data =>
              ConvertToTimestamp(data.date, '00:00:00') >
                ConvertToTimestamp(`15/${monthNow}`, '00:00:00') &&
              ConvertToTimestamp(data.date, '00:00:00') <=
                ConvertToTimestamp(`22/${monthNow}`, '00:00:00'),
          );
          return check.length;
        }
        default:
          const check = listData.filter(
            data =>
              ConvertToTimestamp(data.date, '00:00:00') >
                ConvertToTimestamp(`22/${monthNow}`, '00:00:00') &&
              ConvertToTimestamp(data.date, '00:00:00') <=
                ConvertToTimestamp(`31/${monthNow}`, '00:00:00'),
          );
          return check.length;
      }
    });
    //custom weeks
    const customListWeeks = listWeeks.map(weeks => {
      switch (weeks) {
        case 'Tuần 1': {
          const check = listData.filter(
            data =>
              ConvertToTimestamp(data.date, '00:00:00') >
                ConvertToTimestamp(`01/${monthNow}`, '00:00:00') &&
              ConvertToTimestamp(data.date, '00:00:00') <=
                ConvertToTimestamp(`08/${monthNow}`, '00:00:00'),
          );
          return check.length;
        }
        case 'Tuần 2': {
          const check = listData.filter(
            data =>
              ConvertToTimestamp(data.date, '00:00:00') >
                ConvertToTimestamp(`08/${monthNow}`, '00:00:00') &&
              ConvertToTimestamp(data.date, '00:00:00') <=
                ConvertToTimestamp(`15/${monthNow}`, '00:00:00'),
          );
          return check.length;
        }
        case 'Tuần 3': {
          const check = listData.filter(
            data =>
              ConvertToTimestamp(data.date, '00:00:00') >
                ConvertToTimestamp(`15/${monthNow}`, '00:00:00') &&
              ConvertToTimestamp(data.date, '00:00:00') <=
                ConvertToTimestamp(`22/${monthNow}`, '00:00:00'),
          );
          return check.length;
        }
        default:
          const check = listData.filter(
            data =>
              ConvertToTimestamp(data.date, '00:00:00') >
                ConvertToTimestamp(`22/${monthNow}`, '00:00:00') &&
              ConvertToTimestamp(data.date, '00:00:00') <=
                ConvertToTimestamp(`31/${monthNow}`, '00:00:00'),
          );
          return check.length;
      }
    });
    //custom months
    const customListMonths = listMonths.map(months => {
      const check = listData.filter(data => {
        const checkDate = SoSanhMonth(data.date, `01/${months}/${yearNow}`);
        if (checkDate) {
          return data;
        } else {
          return '';
        }
      });
      return check.length;
    });

    setTotalDays(customListDays);
    setTotalWeeks(customListWeeks);
    setTotalMonths(customListMonths);
  }, [listDays, listMonths, listWeeks, monthNow, listData, yearNow]);

  const data = {
    labels: listDays,
    datasets: [
      {
        fill: true,
        label: 'Doanh thu (SL)',
        data: totalDays,
        backgroundColor: createGradient(),
        spanGaps: true,
        tension: 0.5,
        borderColor: '#5185F7',
        pointBorderColor: 'transparent',
        pointBackgroundColor: 'transparent',
      },
    ],
  };
  const data1 = {
    labels: listWeeks,
    datasets: [
      {
        fill: true,
        label: 'Doanh thu (Sl)',
        data: totalWeeks,
        backgroundColor: createGradient(),
        spanGaps: true,
        tension: 0.5,
        borderColor: '#5185F7',
        pointBorderColor: 'transparent',
        pointBackgroundColor: 'transparent',
      },
    ],
  };
  const data2 = {
    labels: listMonths,
    datasets: [
      {
        fill: true,
        label: 'Doanh thu (Sl)',
        data: totalMonths,
        backgroundColor: createGradient(),
        spanGaps: true,
        tension: 0.5,
        borderColor: '#5185F7',
        pointBorderColor: 'transparent',
        pointBackgroundColor: 'transparent',
      },
    ],
  };
  return (
    <div>
      {checked === 'Ngày' ? (
        <Line data={data} options={options} />
      ) : checked === 'Tuần' ? (
        <Line data={data1} options={options} />
      ) : (
        <Line data={data2} options={options} />
      )}
    </div>
  );
}
