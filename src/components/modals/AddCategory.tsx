import { Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import { createCategory } from "../../services/CategorySv";
import { SuccessModal } from "../noti/SuccessModal";
import { ErrorModal } from "../noti/ErrorModal";

interface AddProductProp {
    open: boolean;
    onCancel: () => void;
}

type FieldCateType = {
    name?: string;
    description?: string;
    image?: string;
};

export const AddCategory: React.FC<AddProductProp> = ({ open, onCancel }) => {
    const [form] = useForm<FieldCateType>();
    const [modalSuccessAdd, setModalSuccessAdd] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [modalError, setModalError] = useState<boolean>(false)

    const onSubmit = async () => {
        onCancel();
        try {
            const values = await form.validateFields();
            form.resetFields();
            if (values.name) {
                const postCategory = await createCategory(values.name, values.description, values.image);
                if (postCategory.data.message == 'Create Category successful') {
                    setModalSuccessAdd(true);
                };
            }
            onCancel();
        } catch (error: any) {
            setModalError(true);
            setErrorMessage(error.response.data.message);
            console.log("Validate Failed:", error);
        }
    };

    return (
        <>
            <SuccessModal onClose={() => setModalSuccessAdd(false)} open={modalSuccessAdd} type="add" />
            <ErrorModal message={errorMessage} onClose={() => setModalError(false)} open={modalError} type="add" />
            <Modal
                open={open}
                title={<p className="text-[24px] text-center">Add Category</p>}
                onCancel={onCancel}
                onOk={onSubmit}
                okText="Submit"
                cancelText="Cancel"
                zIndex={9999}
            >
                <Form
                    form={form}
                    name="categoryForm"
                    className="p-5"
                    layout="vertical"
                >
                    <Form.Item<FieldCateType>
                        name="name"
                        label="Category name"
                        rules={[{ required: true, message: "Please input category name!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldCateType>
                        name="description"
                        label="Description"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item<FieldCateType>
                        name="image"
                        label="Image"
                    >
                        <Input accept="image/*" type="file" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};