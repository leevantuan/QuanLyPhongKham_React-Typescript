import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { CategoryScale, LinearScale, PointElement, LineElement, Title, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

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

const data = {
  labels: ['01', '08', '15', '22', '31'],
  datasets: [
    {
      fill: true,
      label: 'Doanh thu (Tr)',
      data: [50, 20, 40, 70, 20],
      backgroundColor: createGradient(),
      spanGaps: true,
      tension: 0.5,
      borderColor: '#5185F7',
      pointBorderColor: 'transparent',
      pointBackgroundColor: 'transparent',
    },
  ],
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
export default function LineChart() {
  return <Line data={data} options={options} />;
}
