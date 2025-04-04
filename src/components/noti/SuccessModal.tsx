import { Button, Modal } from "antd"
import { useEffect } from "react";


interface SuccessModalProop {
    open: boolean,
    type: 'add' | 'edit' | 'delete',
    onClose: () => void;
}

export const SuccessModal: React.FC<SuccessModalProop> = ({ open, type = 'add', onClose }) => {

useEffect(() => {
    setTimeout(() => {
        onClose();
    }, 1500)
}, [open])


    return (
        <Modal
            open={open}
            footer={false}
            closeIcon={false}
        >
            <div className={`flex flex-col text-center  justify-center 
                ${type == 'add' && 'text-blue-500'} 
                ${type == 'edit' && 'text-yellow-500'}
                ${type == 'delete' && 'text-red-500'}
                `}>
                <span className="flex items-center justify-center py-2">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16 animate-bounce">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>

                </span>
                <p className="text-[32px] font-semibold">  Successe {type} data ! </p>
            </div>
        </Modal>
    )
} 