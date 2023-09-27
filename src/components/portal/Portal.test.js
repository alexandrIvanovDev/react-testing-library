import {render, screen} from '@testing-library/react';
import {Modal} from './Portal';
import userEvent from '@testing-library/user-event';

describe('Portal test', () => {
    it('should show modal', () => {
        const handleClose = jest.fn()
        const {getByText} = render(
            <Modal onClose={handleClose}>
                <div>My Modal</div>
            </Modal>
        )
        expect(getByText('My Modal')).toBeInTheDocument();
        userEvent.click(getByText('Close'));
        expect(handleClose).toHaveBeenCalledTimes(1);
    });
    it('should be unmounted', () => {
        const {getByText, queryByText, unmount} = render(
            <Modal>
                <div>Modal</div>
            </Modal>
        )
        expect(getByText('Modal')).toBeInTheDocument();
        unmount();
        expect(queryByText('Modal')).not.toBeInTheDocument();
    });
})