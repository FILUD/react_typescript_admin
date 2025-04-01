import { Modal, Table, Button } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import useMessage from "antd/es/message/useMessage";
import { deleteCategory, getAllCategory } from "../../services/CategorySv";
import { CategoryType } from "../types/ProductType";
import { ConfirmModal } from "./ConfirmModal";
import { SuccessModal } from "../noti/SuccessModal";
import { EditCategory } from "./EditCategory";
import { ErrorModal } from "../noti/ErrorModal";

interface AddProductProp {
    open: boolean;
    onCancel: () => void;
    onAdd: () => void;
}

type FieldCateType = {
    name?: string;
    description?: string;
    image?: string;
};

export const ManageCategory: React.FC<AddProductProp> = ({ open, onCancel, onAdd }) => {
    const [form] = useForm<FieldCateType>();
    const [categoriesData, setCategoriesData] = useState<CategoryType[]>([]);

    const [editCateID, setEditCateID] = useState<number>(0);
    const [deleteCateID, setDeleteCateID] = useState<number>(0);

    const [modalConfirmDeleteCate, setModalConfirmDeleteCate] = useState<boolean>(false);
    const [modalSuccessDeleteCate, setModalSuccessDeleteCate] = useState<boolean>(false);

    const [modalEditCate, setModalEditCate] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [modalError, setModalError] = useState<boolean>(false)


    const getCateData = async () => {
        try {
            const response = await getAllCategory();
            setCategoriesData(response.data.categories)
        } catch (error: any) {
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        getCateData();
    }, [modalSuccessDeleteCate, open, modalEditCate])

    const handleDeleteCate = async (category_id: number) => {
        setModalConfirmDeleteCate(false);
        if (!category_id) return;
        try {
            const response = await deleteCategory(category_id);
            console.log(response);
            if (response.data.success === true) {
                setModalSuccessDeleteCate(true)
            }
        } catch (error: any) {
            setModalError(true);
            setErrorMessage(error.response.data.message);
            console.log(error.response.data);
        }
    }

    const columns = [
        {
            title: 'ID',
            className: "text-center flex justify-center",
            dataIndex: 'category_id',
            key: 'category_id',
            width: 50,
        },
        {
            title: 'Category Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            className: "whitespace-nowrap"
        },
        {
            title: 'Image Link',
            dataIndex: 'image',
            key: 'image',
            className: "whitespace-nowrap",
            render: (text: string | null) => text || '-',
        },
        {
            title: 'Manage',
            dataIndex: 'address',
            key: 'address',
            className: "text-center flex justify-center",
            render: (_: any, record: CategoryType) => (
                <div className="flex space-x-2">
                    <Button onClick={() => { setEditCateID(record.category_id), console.log(record.category_id), setModalEditCate(true)}} variant="solid" color="yellow" size="small">Edit</Button>
                    <Button onClick={() => { setDeleteCateID(record.category_id), setModalConfirmDeleteCate(true) }} danger size="small">Delete</Button>
                </div>
            ),
        },
    ];

    return (
        <>
            <ConfirmModal onCancel={() => setModalConfirmDeleteCate(false)} onOk={() => handleDeleteCate(deleteCateID)} open={modalConfirmDeleteCate} type="delete" />
            <SuccessModal open={modalSuccessDeleteCate} type="delete" onClose={() => setModalSuccessDeleteCate(false)} />
            <ErrorModal message={errorMessage} onClose={() => setModalError(false)} open={modalError} type="delete" />
            <EditCategory cateID={editCateID} onCancel={() => setModalEditCate(false)} open={modalEditCate}/>


            <Modal
                open={open}
                title={<p className="flex justify-center py-2 text-[20px]">Manage Category</p>}
                onCancel={onCancel}
                okText="Submit"
                cancelText="Cancel"
                footer={false}
                width={'50vw'}

            >
                <div className="flex  flex-col">

                    <Table
                        columns={columns}
                        dataSource={categoriesData}
                        scroll={{ y: 47 * 9 }}
                    >
                    </Table>
                    <div className="flex justify-between pt-5">

                        <Button variant="solid" color="blue" size="large" onClick={onAdd}>+ Add Category</Button>
                        <Button size="large" onClick={onCancel}>Close</Button>
                    </div>
                </div>
            </Modal>
        </>

    );
};