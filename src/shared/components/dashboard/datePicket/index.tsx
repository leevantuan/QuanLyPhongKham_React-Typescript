import './styles.scss';
import { Calendar, theme } from 'antd';
import type { CalendarMode } from 'antd/es/calendar/generateCalendar';
import type { Dayjs } from 'dayjs';

export default function DatePicketDashboard() {
  const { token } = theme.useToken();

  const wrapperStyle: React.CSSProperties = {
    width: 480,
    margin: 'auto',
    padding: 16,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const onPanelChange = (value: Dayjs, mode: CalendarMode) => {
    console.log(value.format('DD-MM-YYYY'), mode);
  };
  return (
    <div style={wrapperStyle} className="mt-4">
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </div>
  );
}
