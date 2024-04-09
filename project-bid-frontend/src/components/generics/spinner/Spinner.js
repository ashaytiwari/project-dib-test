import react from 'react';
import { BeatLoader } from 'react-spinners';

import styles from './Spinner.module.scss';

function Spinner() {

  const loaderAttributes = {
    size: 30,
    color: '#ccc'
  };

  return (
    <div className={styles.spinnerMain}>
      <BeatLoader {...loaderAttributes} />
    </div>
  );

}

export default Spinner;