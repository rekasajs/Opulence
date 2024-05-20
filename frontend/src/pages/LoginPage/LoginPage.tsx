import { Link, useNavigate } from 'react-router-dom';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './LoginPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { checkIsAuth, loginUser } from '../../redux/features/auth/authSlice';
import { useEffect, useState } from 'react';
import { RootState } from '../../redux/store';
import { Button, FormField } from '../../ui';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { AnimatedPage } from '../AnimatedPage/AnimatedPage';

export interface ILoginForm extends FieldValues {
    username: string;
    password: string;
}

const schema = yup.object({
    username: yup.string().required('Укажите логин'),
    password: yup.string().required('Укажите пароль'),
});

export const LoginPage = () => {
    const [isFocused, setIsFocused] = useState({
        username: false,
        email: false,
        password: false,
        cpassword: false,
        role: false,
    });
    const dispatch = useDispatch<AppDispatch>();
    const isAuth = useSelector(checkIsAuth);
    const navigate = useNavigate();
    const { status } = useSelector((state: RootState) => state.auth);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isDirty },
    } = useForm<ILoginForm>({
        resolver: yupResolver(schema),
        mode: 'onChange',
    });
    const watchAllFields = watch();

    useEffect(() => {
        if (isAuth) navigate('/');
    }, [status, isAuth, navigate]);

    const submitForm: SubmitHandler<ILoginForm> = async (data) => {
        try {
            const { username, password } = data;
            dispatch(loginUser({ username, password }));
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
                        Opulence <span>вход в аккаунт</span>
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
                        <Button className={styles.submitButton} type={'submit'} isDisabled={!isDirty}>
                            Войти в аккаунт
                        </Button>

                        <div className={styles.auth}>
                            <span>Нет аккаунта?</span>
                            <Link className={styles.link} to={'/register'}>
                                Регистрация
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AnimatedPage>
    );
};
