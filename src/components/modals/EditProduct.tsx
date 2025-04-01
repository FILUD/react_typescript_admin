import { Form, Input, Modal } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { SuccessModal } from "../noti/SuccessModal";
import { CategoryDropdown } from "../dropdown/CategoryDropdown";
import { FormatNumber } from "../format/FormatNumber";
import { createProduct, getProductByID } from "../../services/ProductSv";
import { ErrorModal } from "../noti/ErrorModal";

interface AddProductProp {
    open: boolean;
    onCancel: () => void;
    pro_id: number;
}

type FieldCateType = {
    name: string;
    category_id: number
    description: string;
    image: string;
    price: number;
    is_available: number;
    points_earned: number;
};

export const EditProduct: React.FC<AddProductProp> = ({ open, onCancel, pro_id }) => {
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
    const qty = useWatch('is_available', form) || 0;
    const price = useWatch('price', form) || 0;
    const totalPrice = qty * price;
    const [cateName, setCateName] = useState<string>('-')


    const getProductData = async (pro_id: number) => {
        try {
            const response = await getProductByID(pro_id);
            const product = response.data.product;
            console.log("Product detail 4 edit", response.data.product)
            if (product) {
                form.setFieldValue("name", product.name)
                form.setFieldValue("description", product.description);
                form.setFieldValue("is_available", product.is_available);
                form.setFieldValue("price", product.price);
                form.setFieldValue("points_earned", product.points_earned);
                form.setFieldValue("category_id", product.category_id);
            }
        } catch (error: any) {
            console.log(error.response.data.message)
        }
    }

    useEffect(() => {
        if (pro_id) {
            getProductData(pro_id)
        }
    }, [pro_id])


    return (
        <>
            <SuccessModal onClose={() => setModalSuccessAdd(false)} open={modalSuccessAdd} type="edit" />
            <ErrorModal onClose={() => setModalError(false)} open={ModalError} type="edit" message={messageError} />

            <Modal
                open={open}
                title={<p className="text-[24px] text-center">Edit Product</p>}
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
                        <div className="grid grid-cols-2 gap-5">

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
                                name="is_available"
                                label="Qty"
                                rules={[{ required: true, message: "Please input Qty!" }]}
                            >
                                <Input type="number" onChange={(e) => form.setFieldValue("is_available", Number(e.target.value))} />
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
                                }}
                                selectedCategoryId={form.getFieldValue("category_id")}
                                />
                            </Form.Item>

                            <Form.Item<FieldCateType>
                                name="image"
                                label="Image"
                                className="col-span-2"
                            >
                                <Input accept="image/*" type="file" />
                            </Form.Item>
                        </div>

                        <div className="grid border">
                            <p className="col-span-2 text-[24px] text-center flex flex-col justify-end font-semibold underline">Product Detail:</p>
                            <div className="col-span-2 grid grid-cols-2 border m-3 rounded-[8px] items-center">
                                <span className="flex flex-col justify-start text-[18px] font-semibold items-end pr-10">
                                    <li>Product name :</li>
                                    <li>Category name :</li>
                                    <li>Qty :</li>
                                    <li>Price :</li>
                                    <li>Total Price( Qty * Price ) :</li>

                                </span>
                                <span className="flex flex-col justify-start text-[18px] items-start pl-10">

                                    <li>{name || '-'}</li>
                                    <li>{cateName || '-'}</li>
                                    <li><FormatNumber value={qty} /></li>
                                    <li><FormatNumber value={price} /></li>
                                    <li><FormatNumber value={totalPrice} /></li>

                                </span>
                            </div>
                        </div>
                    </div>
                </Form>
            </Modal>
        </>
    );
};