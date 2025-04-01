import { Button, Modal } from "antd";

interface ConfirmModalProps {
    open: boolean;
    onOk: () => void;
    onCancel: () => void;
    type: 'add' | 'edit' | 'delete';
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, onCancel, onOk, type = 'add' }) => {

    const buttonColor = type === 'add' ? 'blue' :
        type === 'edit' ? 'yellow' :
            'red';

    return (
        <Modal
            open={open}
            footer={false}
            closeIcon={false}
            maskClosable={false}
            centered
        >
            <div className={`flex flex-col justify-center items-center gap-4
                ${type == 'add' && 'text-blue-500'}
                ${type == 'edit' && 'text-yellow-500'}
                ${type == 'delete' && 'text-red-500'}
                `}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-14 animate-bounce">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>

                <p className="text-[24px] font-semibold">Confirm {type} data?</p>

                <div className="flex gap-5 justify-center">
                    <Button size="large" onClick={onCancel}>Cancel</Button>
                    <Button
                        size="large"
                        type="primary"
                        color={buttonColor}
                        onClick={onOk}
                        danger={type === 'delete'}
                        className="px-8"
                    >
                        OK
                    </Button>
                </div>
            </div>
        </Modal>
    )
}