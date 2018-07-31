import format from 'date-fns/format';

import fr from 'date-fns/locale/fr';

let formatDate = (date, pattern) => {
  return format(date, pattern, {locale: fr});
};

export default formatDate;