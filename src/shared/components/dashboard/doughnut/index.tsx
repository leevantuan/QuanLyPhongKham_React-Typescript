import { CustomDoughutInterface } from '../../../../@types';
import './styles.scss';

export default function CustomDoughnut(props: CustomDoughutInterface) {
  const percent = props.percent;
  const color1 = props.colorOne;
  const color2 = props.colorTwo;
  return (
    <div
      className="custom-doughnut"
      style={{ background: `conic-gradient(${color1} ${percent * 3.6}deg, #eaeaec 0deg)` }}
    >
      <div
        className="content"
        style={{
          background: `conic-gradient(${color2} ${(100 - percent) * 3.6}deg, #eaeaec 0deg)`,
        }}
      >
        <span>{percent}%</span>
      </div>
    </div>
  );
}
