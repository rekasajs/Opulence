import classNames from 'classnames';
import styles from './FormField.module.scss';
import { Input } from '../../ui';
import { Path, UseFormRegister } from 'react-hook-form';
import { IRegisterForm } from '../../pages/RegisterPage/RegisterPage';
import { useState } from 'react';
import { ILoginForm } from '../../pages/LoginPage/LoginPage';

export type FormFieldType = 'text' | 'password';

export interface IFormFieldProps<T extends ILoginForm | IRegisterForm> {
    className?: string;
    error?: string;
    label?: string;
    name: Path<T>;
    type: FormFieldType;
    register: UseFormRegister<T>;
    isFocused?: boolean;
    isRequired?: boolean;
    onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const FormField = <T extends ILoginForm | IRegisterForm>({
    className,
    error,
    label,
    name,
    register,
    type,
    isFocused,
    isRequired,
    onBlur,
    onFocus,
}: IFormFieldProps<T>): JSX.Element => {
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);

    const handleShowPassword = () => {
        setIsVisiblePassword((prev) => !prev);
    };

    const handleType = (type: FormFieldType) => {
        if (type === 'text') {
            return 'text';
        }
        if (type === 'password') {
            type = isVisiblePassword ? 'text' : 'password';
            return type;
        }
    };

    return (
        <div
            className={classNames(styles.formField, className, {
                [styles.FieldActive]: isFocused,
            })}
        >
            <label
                className={classNames(styles.label, {
                    [styles.labelError]: error,
                })}
                htmlFor={name}
            >
                {label}
                {isRequired && <span className={styles.required}> *</span>}
            </label>
            {type === 'text' && (
                <>
                    <Input
                        className={classNames({
                            [styles.InputActive]: isFocused,
                            [styles.error]: error,
                        })}
                        {...(register ? register(name) : register)}
                        name={name}
                        id={name}
                        type={handleType(type)}
                        error={error}
                        onFocus={onBlur}
                        onBlur={onFocus}
                    />
                    {error && <div className={styles.errorMessage}>{error}</div>}
                </>
            )}
            {type === 'password' && (
                <>
                    <Input
                        className={classNames({
                            [styles.InputActive]: isFocused,
                            [styles.error]: error,
                        })}
                        {...(register ? register(name) : register)}
                        name={name}
                        id={name}
                        type={handleType(type)}
                        error={error}
                        onFocus={onBlur}
                        onBlur={onFocus}
                    />
                    <div
                        className={classNames(styles.visibility, {
                            [styles.visibilityError]: error,
                        })}
                        onClick={handleShowPassword}
                    >
                        {isVisiblePassword ? (
                            <button type="button" onClick={() => handleType('text')}>
                                <img src="/visibility.svg" alt="" />
                            </button>
                        ) : (
                            <button type="button" onClick={() => handleType('password')}>
                                <img src="/visibilityOff.svg" alt="" />
                            </button>
                        )}
                    </div>
                    {error && <div className={styles.errorMessage}>{error}</div>}
                </>
            )}
        </div>
    );
};
