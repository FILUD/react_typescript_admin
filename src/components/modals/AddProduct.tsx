import { Form, Input, Modal, Radio } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import React, { useState } from "react";
import { SuccessModal } from "../noti/SuccessModal";
import { CategoryDropdown } from "../dropdown/CategoryDropdown";
import { FormatNumber } from "../format/FormatNumber";
import { createProduct } from "../../services/ProductSv";
import { ErrorModal } from "../noti/ErrorModal";

interface AddProductProp {
    open: boolean;
    onCancel: () => void;
}

type FieldCateType = {
    name: string;
    category_id: number
    description: string;
    image: string;
    price: number;
    is_available: boolean;
    points_earned: number;
};

export const AddProduct: React.FC<AddProductProp> = ({ open, onCancel }) => {
    const [form] = useForm<FieldCateType>();
    const [modalSuccessAdd, setModalSuccessAdd] = useState<boolean>(false);
    const [ModalError, setModalError] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>('')

    const onSubmit = async () => {
        try {
            const values = await form.validateFields();
            const postProduct = await createProduct({
                category_id: values.category_id,
                name: values.name,
                description: values.description,
                price: values.price,
                image: values.image,
                is_available: values.is_available,
                points_earned: values.points_earned
            });

            if (postProduct.data.success == true) {
                setModalSuccessAdd(true);
                form.resetFields();
            }
            onCancel();
        } catch (error: any) {
            setModalError(true);
            setMessageError(error.response.data.message)
            console.log("Validate Failed:", error);
        }
    };

    const name = useWatch('name', form);
    const price = useWatch('price', form) || 0;
    const isActive = useWatch('is_available', form)
    const point = useWatch('points_earned', form)
    const [cateName, setCateName] = useState<string>('-')

    return (
        <>
            <SuccessModal onClose={() => setModalSuccessAdd(false)} open={modalSuccessAdd} type="add" />
            <ErrorModal onClose={() => setModalError(false)} open={ModalError} type="add" message={messageError} />

            <Modal
                open={open}
                title={<p className="text-[24px] text-center">Add Product</p>}
                onCancel={onCancel}
                onOk={onSubmit}
                okText="Submit"
                cancelText="Cancel"
                width={"70vw"}
            >
                <Form
                    form={form}
                    name="categoryForm"
                    className="p-5"
                    layout="vertical"
                >
                    <div className="grid grid-cols-2 gap-10">
                        <div className="grid border p-3 rounded-[11px] grid-cols-2 gap-5">

                            <Form.Item<FieldCateType>
                                name="name"
                                label="Product name"
                                rules={[{ required: true, message: "Please input category name!" }]}
                            >
                                <Input onChange={(e) => form.setFieldValue("name", e.target.value)} />
                            </Form.Item>

                            <Form.Item<FieldCateType>
                                name="description"
                                label="Description"
                            >
                                <Input onChange={(e) => form.setFieldValue("description", e.target.value)} />
                            </Form.Item>



                            <Form.Item<FieldCateType>
                                name="price"
                                label="Price"
                                rules={[{ required: true, message: "Please input Price!" }]}
                            >
                                <Input type="number" onChange={(e) => form.setFieldValue("price", Number(e.target.value))} />
                            </Form.Item>

                            <Form.Item
                                name="category_id"
                                rules={[{ required: true, message: "Please Select Category!" }]}
                            >
                                <CategoryDropdown onSelect={(value) => {
                                    setCateName(value.name)
                                    form.setFieldValue("category_id", value.category_id)
                                    console.log("value.category_idvalue.category_id", value.category_id)
                                }} />
                            </Form.Item>

                            <div className="pb-4 flex flex-col gap-2">
                                <p>Is available ?</p>
                                <Form.Item
                                name="is_available"
                                initialValue={true}
                                >
                                    <Radio.Group buttonStyle="solid" defaultValue={true} >
                                        <Radio.Button value={true}>Enable</Radio.Button>
                                        <Radio.Button className="text-red-500" value={false}>Disable</Radio.Button>
                                    </Radio.Group>
                                </Form.Item>
                            </div>

                            <Form.Item
                            label='Point / Order'
                            initialValue={0}
                            name="points_earned"
                            >
                                <Input type="number" onChange={(e) => Number(e.target.value)}></Input>
                            </Form.Item>

                            <Form.Item<FieldCateType>
                                name="image"
                                label="Image"
                                className="col-span-2"
                            >
                                <Input accept="image/*" type="file" />
                            </Form.Item>
                        </div>

                        <div className="grid border rounded-[11px]">
                            <p className="col-span-2 text-[24px] text-center flex flex-col justify-end font-semibold underline">Product Detail:</p>
                            <div className="col-span-2 grid grid-cols-2 border m-3 rounded-[8px] items-center">
                                <span className="flex flex-col justify-start text-[18px] font-semibold items-end pr-10">
                                    
                                    <li>Product name :</li>
                                    <li>Category name :</li>
                                    <li>Active :</li>
                                    <li>Price :</li>
                                    <li>Point per Order :</li>

                                </span>
                                <span className="flex flex-col justify-start text-[18px] items-start pl-10">
                                    
                                    <li>{name || '-'}</li>
                                    <li>{cateName || '-'}</li>
                                    <li>{isActive ? 'Yes' : 'No'}</li>
                                    <li><FormatNumber value={price} /></li>
                                    <li><FormatNumber value={point}/></li>

                                </span>
                            </div>
                        </div>
                    </div>
                </Form>
            </Modal>
        </>
    );
};