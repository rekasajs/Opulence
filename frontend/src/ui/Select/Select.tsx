import classNames from 'classnames';
import { FC, FocusEventHandler } from 'react';
import { ActionMeta, GroupBase, OnChangeValue, StylesConfig } from 'react-select';
import ReactSelect from 'react-select';
import styles from './Select.module.scss';

export interface ISelectOptions {
    value: string;
    label: string;
}

export interface ISelectProps {
    name: string;
    className?: string;
    options: ISelectOptions[];
    style?: StylesConfig<ISelectOptions, false, GroupBase<ISelectOptions>> | undefined;
    value?: ISelectOptions;
    error?: string;
    onBlur?: FocusEventHandler;
    onFocus?: FocusEventHandler;
    onChange?: (value: OnChangeValue<ISelectOptions, false>, action: ActionMeta<ISelectOptions>) => void;
}

export const Select: FC<ISelectProps> = ({ name, className, options, style, value, error, onBlur, onFocus, onChange }) => {
    return (
        <div>
            <ReactSelect
                className={classNames(styles.select, className)}
                name={name}
                options={options}
                styles={style}
                value={value}
                onBlur={onBlur}
                onFocus={onFocus}
                onChange={onChange}
                defaultValue={value}
                placeholder={'Выберите роль'}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        neutral0: 'rgba(255, 255, 255, 0.08)',
                        neutral20: 'rgba(255, 255, 255, 0.08)',
                        neutral40: 'rgba(255, 255, 255, 0.08)',
                        neutral50: 'rgba(125, 125, 125, 1)',
                        neutral80: 'rgba(125, 125, 125, 1)',
                        primary: 'rgba(255, 255, 255, 0.08)',
                    },
                })}
            />
            {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
    );
};
