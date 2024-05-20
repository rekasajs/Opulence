import { default as ReactModal } from 'react-responsive-modal';

import 'react-responsive-modal/styles.css';
import styles from './Modal.module.scss';
import { ReactNode } from 'react';
import classNames from 'classnames';
import { Button } from './../Button/Button';

export type ModalSizeType = 'medium';

export interface IModalProps {
    className?: string;
    children?: ReactNode;
    size?: ModalSizeType;
    isOpen: boolean;
    onClose: () => void;
}

export const Modal = ({ className, children, size, isOpen, onClose }: IModalProps): JSX.Element => {
    const defaultClassNames = {
        modal: classNames(styles.modalDefault, {
            [styles.medium]: size === 'medium',
        }),
        closeButton: classNames(styles.button),
        root: classNames(styles.container),
        className,
    };

    return (
        <ReactModal classNames={defaultClassNames} center open={isOpen} onClose={onClose}>
            <div className={styles.modal}>{children}</div>
        </ReactModal>
    );
};

export interface IModalHeaderProps {
    className?: string;
    children?: ReactNode;
    align?: 'start' | 'end' | 'center';
}

Modal.Header = ({ className, children, align }: IModalHeaderProps): JSX.Element => {
    return (
        <div
            className={classNames(styles.modalHeader, className, {
                [styles.modalHeaderStart]: align === 'start',
                [styles.modalHeaderCenter]: align === 'center',
                [styles.modalHeaderEnd]: align === 'end',
            })}
        >
            {children}
        </div>
    );
};

export interface IModalMainProps {
    className?: string;
    children?: ReactNode;
}

Modal.Main = ({ className, children }: IModalMainProps): JSX.Element => {
    return <div className={(styles.modalMain, className)}>{children}</div>;
};

export interface IModalFooterProps {
    className?: string;
    buttonSubmitText?: string;
    onSubmitModal?: () => void;
}

Modal.Footer = ({ className, buttonSubmitText, onSubmitModal }: IModalFooterProps): JSX.Element => {
    return (
        <div className={(styles.modalFooter, className)}>
            <Button type={'button'} onClick={onSubmitModal}>
                {buttonSubmitText}
            </Button>
        </div>
    );
};
