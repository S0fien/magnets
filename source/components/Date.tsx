import React from 'react';
import formatDistance from 'date-fns/formatDistance';
import {enUS} from 'date-fns/locale';

interface Props {
  date: number;
}

const DateComponent: React.FC<Props> = ({date}) => {
  const distance = formatDistance(date, new Date(), {locale: enUS});
  return <span>{`Added ${distance} ago`}</span>;
};

export default DateComponent;
