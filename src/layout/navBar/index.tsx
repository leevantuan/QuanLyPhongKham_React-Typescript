import './styles.scss';
import { TextNavbarType } from '../../@types';

export default function NavBar(props: TextNavbarType) {
  return (
    <div className="nav-bar position-absolute">
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <h4>{props.textLv1}</h4>
          <h4>{props.textLv2}</h4>
          <h4>{props.textLv3}</h4>
        </div>
      </div>
    </div>
  );
}
