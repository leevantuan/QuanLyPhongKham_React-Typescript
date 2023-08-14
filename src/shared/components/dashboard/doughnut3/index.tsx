import { CustomDoughutThreeInterface } from '../../../../@types';
import './styles.scss';

export default function CustomDoughnutThree(props: CustomDoughutThreeInterface) {
  const percent = props.percent;
  const percent2 = props.percentTwo;
  const color1 = props.colorOne;
  const color2 = props.colorTwo;
  const color3 = props.colorThree;
  return (
    <div
      className="custom-doughnut"
      style={{ background: `conic-gradient(${color1} ${percent * 3.6}deg, #eaeaec 0deg)` }}
    >
      <div
        className="content"
        style={{
          background: `conic-gradient(${color2} ${percent2 * 3.6}deg, #eaeaec 0deg)`,
        }}
      >
        <div
          className="page-3"
          style={{
            background: `conic-gradient(${color3} ${
              (100 - percent - percent2) * 3.6
            }deg, #eaeaec 0deg)`,
          }}
        >
          <span>{percent}%</span>
        </div>
      </div>
    </div>
  );
}
