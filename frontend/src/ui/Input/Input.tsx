import { DetailedHTMLProps, ForwardedRef, HTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';
import styles from './Input.module.scss';

export interface IInputProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    className: string;
    name: string;
    type?: string;
    error?: string;
}

export const Input = forwardRef(
    ({ className, name, type, error, ...rest }: IInputProps, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {
        return (
            <>
                <input
                    className={classNames(className, styles.input, {
                        [styles.error]: error,
                    })}
                    name={name}
                    type={type}
                    ref={ref}
                    {...rest}
                />
            </>
        );
    }
);

Input.displayName = 'Input';
