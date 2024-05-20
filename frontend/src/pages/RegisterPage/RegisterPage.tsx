/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from 'react-router-dom';
import styles from '../LoginPage/LoginPage.module.scss';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsAuth, registerUser } from '../../redux/features/auth/authSlice';
import { AppDispatch } from '../../redux/store';
import { FC, useEffect, useState } from 'react';
import { RootState } from '../../redux/store';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, FormField } from '../../ui';
import { Select } from './../../ui';
import classNames from 'classnames';
import { SelectStyles } from './styles';
import { AnimatedPage } from '../AnimatedPage/AnimatedPage';

export interface IRegisterForm extends FieldValues {
    username: string;
    password: string;
    cpassword: string;
    email: string;
    role: string;
}

const schema = yup.object({
    username: yup
        .string()
        .matches(/^([^0-9]*)$/, 'Логин не должен содержать цифры')
        .required('Укажите логин'),
    email: yup.string().required('Введите почту').email('Некорректно введена почта'),
    password: yup
        .string()
        .required('Укажите пароль')
        .test('hasUpperCase', 'Пароль должен состоять только из латинских символов', (value) => {
            return /[A-Z]/.test(value) || /[a-z]/.test(value);
        })
        .test('hasUpperCase', 'Пароль должен иметь хотя бы однин символ верхнего регистра', (value) => {
            return /[A-Z]/.test(value);
        })
        .test('hasUpperCase', 'Пароль должен иметь хотя бы однy цифру', (value) => {
            return /[0-9]/.test(value);
        })
        .test('hasUpperCase', 'Пароль должен иметь хотя бы один специальный символ ( !@#%& )', (value) => {
            return /[!@#%&]/.test(value);
        })
        .min(8, 'Пароль слишком короткий'),
    cpassword: yup
        .string()
        .required('Обязательно подтвердите пароль')
        .test('passwords-match', 'Пароли должны совпадать', function (value) {
            return this.parent.password === value;
        }),
    role: yup.string().required('Выберите роль'),
});

const roles = [
    { value: 'USER', label: 'Пользователь' },
    { value: 'ADMIN', label: 'Админ' },
];

export const RegisterPage: FC = () => {
    const [isFocused, setIsFocused] = useState({
        username: false,
        email: false,
        password: false,
        cpassword: false,
        role: false,
    });

    const isAuth = useSelector(checkIsAuth);
    const navigate = useNavigate();
    const { status } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();

    const {
        register,
        handleSubmit,
        watch,
        control,
        formState: { errors, isDirty },
    } = useForm<IRegisterForm>({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });

    const watchAllFields = watch();

    useEffect(() => {
        if (isAuth) navigate('/');
    }, [status, isAuth, navigate]);

    const submitForm = (data: IRegisterForm) => {
        const { username, password, email, role } = data;
        try {
            dispatch(registerUser({ username, password, email, role }));
        } catch (error) {
            console.log(error);
        }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setIsFocused({ ...isFocused, [event.target.name]: true });
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
        if (watchAllFields[event.target.name] !== '') {
            setIsFocused({ ...isFocused, [event.target.name]: true });
        } else {
            setIsFocused({ ...isFocused, [event.target.name]: false });
        }
    };

    return (
        <AnimatedPage>
            <div className={styles.page}>
                <div className={styles.formWrapper}>
                    <h1 className={styles.title}>
                        Opulence <span>регистрация</span>
                    </h1>
                    <form onSubmit={handleSubmit(submitForm)} className={styles.form}>
                        <FormField
                            label={'Логин'}
                            name={'username'}
                            type={'text'}
                            register={register}
                            error={errors.username && errors.username.message}
                            isFocused={isFocused.username}
                            isRequired={true}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <FormField
                            label={'Почта'}
                            name={'email'}
                            type={'text'}
                            register={register}
                            error={errors.email && errors.email.message}
                            isFocused={isFocused.email}
                            isRequired={true}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <FormField
                            label={'Пароль'}
                            name={'password'}
                            type={'password'}
                            register={register}
                            error={errors.password && errors.password.message}
                            isFocused={isFocused.password}
                            isRequired={true}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <FormField
                            label={'Подтверждение пароля'}
                            name={'cpassword'}
                            type={'password'}
                            register={register}
                            error={errors.cpassword && errors.cpassword.message}
                            isFocused={isFocused.cpassword}
                            isRequired={true}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                        <Controller
                            control={control}
                            name={'role'}
                            render={({ field: { value, name, onChange } }) => (
                                <Select
                                    name={name}
                                    options={roles}
                                    className={classNames(styles.select)}
                                    style={SelectStyles}
                                    value={roles.find((c) => c.value === value)}
                                    onChange={(c) => onChange(c?.value)}
                                    error={errors.role && errors.role.message}
                                />
                            )}
                        />

                        <Button className={styles.submitButton} type={'submit'} isDisabled={!isDirty}>
                            Зарегистрироваться{' '}
                        </Button>

                        <div className={styles.auth}>
                            <span>Уже есть аккаунт?</span>
                            <Link className={styles.link} to={'/login'}>
                                Войти
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AnimatedPage>
    );
};
