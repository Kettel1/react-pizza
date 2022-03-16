import React, {FC, ReactNode} from 'react';
import styles from './AddButton.module.scss'

const AddButton: FC<{
    onClick: any,
    children: ReactNode
}> = ({
          onClick,
          children
      }) => {

    return (
        <button onClick={onClick} type={'button'} className={styles.button}>
            {children}
        </button>
    );
};

export default AddButton;
