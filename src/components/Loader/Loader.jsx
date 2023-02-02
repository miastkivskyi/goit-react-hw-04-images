import css from './Loader.module.css';
import { FallingLines } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={css.wrapperLoader}>
      <FallingLines
        color="#4fa94d"
        width="100"
        visible={true}
        ariaLabel="falling-lines-loading"
      />
    </div>
  );
};

export default Loader;
