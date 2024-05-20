import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../redux/features/auth/authSlice';
import { closeModal } from '../../redux/features/modal/modalSlice';
import { RootState } from '../../redux/store';
import { Modal } from '../../ui';

export const Logout = () => {
    const isModalOpen = useSelector((state: RootState) => state.modal.isModalOpen);
    const dispatch = useDispatch();

    const handleOnCloseModal = () => {
        dispatch(closeModal());
    };

    const handleOnSubmitModal = () => {
        window.localStorage.removeItem('token');
        dispatch(logOut());
        dispatch(closeModal());
    };

    return (
        <>
            <Modal isOpen={isModalOpen} onClose={handleOnCloseModal}>
                <Modal.Header>
                    <h2>Вы уверены?</h2>
                </Modal.Header>
                <Modal.Main></Modal.Main>
                <Modal.Footer buttonSubmitText={'Выйти'} onSubmitModal={handleOnSubmitModal}></Modal.Footer>
            </Modal>
        </>
    );
};
