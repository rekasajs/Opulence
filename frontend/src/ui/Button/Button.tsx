import classNames from 'classnames';
import styles from './Button.module.scss';
import { DOMAttributes, FC } from 'react';

export type ButtonType = 'button' | 'submit' | 'reset';

export interface IButtonProps extends DOMAttributes<HTMLButtonElement> {
    className?: string;
    isDisabled?: boolean;
    type: ButtonType;
    onClick?: (event: React.MouseEvent) => void;
}

export const Button: FC<IButtonProps> = ({ className, children, isDisabled, type, onClick, ...rest }) => {
    return (
        <button
            className={classNames(styles.button, className, {
                [styles.disabled]: isDisabled,
            })}
            type={type}
            disabled={isDisabled}
            onClick={onClick}
            {...rest}
        >
            <span>{children}</span>
        </button>
    );
};
