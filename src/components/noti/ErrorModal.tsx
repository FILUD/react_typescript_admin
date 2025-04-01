import { Button, Modal } from "antd"
import { useEffect } from "react";


interface ErrorModalProop {
    open: boolean,
    type: 'add' | 'edit' | 'delete',
    onClose: () => void;
    message?: string;
}

export const ErrorModal: React.FC<ErrorModalProop> = ({ open, type = 'add', onClose, message = '' }) => {



    return (
        <Modal
            open={open}
            footer={false}
            closeIcon={false}
            zIndex={99999}
        >
            <div className={`flex flex-col text-center  justify-center 
                ${type == 'add' && 'text-red-500'} 
                ${type == 'edit' && 'text-red-500'}
                ${type == 'delete' && 'text-red-500'}
                `}>
                <span className="flex items-center justify-center py-2">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-16">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                    </svg>

                </span>
                <p className="text-[24px] font-semibold">  Error {type} data ! </p>
                <p className="text-[16px]">{message}</p>
                <Button onClick={onClose} variant="solid" color="cyan" className="text-[24px] font-semibold mt-5" size="large" >Ok</Button>
            </div>
        </Modal>
    )
} 