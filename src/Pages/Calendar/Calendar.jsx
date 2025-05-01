import { useState } from 'react';
import styles from './calendar.module.css'
import { Calendar } from 'antd';
import dayjs from 'dayjs';


const CalendarComponent = () => {

    const [value, setValue] = useState(() => dayjs(new Date()));
  
    const onSelect = newValue => {
        setValue(newValue);
    };
    const onPanelChange = newValue => {
        setValue(newValue);
    };

  return (
    <div className={styles.calendar_container}>
          
          <Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} />
    </div>
  );
}

export default CalendarComponent;
