import { Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { editCategory, getCategoryByID } from "../../services/CategorySv";
import { SuccessModal } from "../noti/SuccessModal";
import { ErrorModal } from "../noti/ErrorModal";

interface AddProductProp {
    open: boolean;
    onCancel: () => void;
    cateID: number;
}

type FieldCateType = {
    name?: string;
    description?: string;
    image?: string;
};

export const EditCategory: React.FC<AddProductProp> = ({ open, onCancel, cateID }) => {
    const [form] = useForm<FieldCateType>();
    const [modalSuccessEdit, setModalSuccessEdit] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [modalError, setModalError] = useState<boolean>(false)


    const getCateByID = async (cateID: number) => {
        try {
            const response = await getCategoryByID(cateID)
            const cate = response.data.categories;
            console.log(response.data.categories)
            form.setFieldValue("name", cate.name)
            form.setFieldValue("description", cate.description)
        } catch (error: any) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        console.log('cateID :', cateID)
        if (cateID) {
            getCateByID(cateID);
        }
    }, [open, cateID]);


    const onSubmit = async () => {
        onCancel();
        try {
            const values = await form.validateFields();
            form.resetFields();
            if (values.name) {
                const postCategory = await editCategory(cateID, values.name, values.description, values.image);
                if (postCategory?.data.success == true) {
                    setModalSuccessEdit(true);
                };
            }
            onCancel();
        } catch (error: any) {
            setModalError(true);
            setErrorMessage(error.response.data.message)
            console.log("Validate Failed:", error);
        }
    };

    return (
        <>
            <SuccessModal onClose={() => setModalSuccessEdit(false)} open={modalSuccessEdit} type="edit" />
            <ErrorModal message={errorMessage} onClose={() => setModalError(false)} open={modalError} type="edit" />

            <Modal
                open={open}
                title={<p className="text-[24px] text-center">Edit Category</p>}
                onCancel={onCancel}
                onOk={onSubmit}
                okText="Submit"
                cancelText="Cancel"

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