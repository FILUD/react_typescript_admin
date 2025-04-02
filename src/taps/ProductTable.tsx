import { Button, Table, TableColumnsType, TableProps } from 'antd';
import { deleteProduct, getAllProduct } from '../services/ProductSv';
import { useEffect, useState } from 'react';
import { ProductType } from '../components/types/ProductType';
import { ConfirmModal } from '../components/modals/ConfirmModal';
import { SuccessModal } from '../components/noti/SuccessModal';
import { EditProduct } from '../components/modals/EditProduct';


interface ProductTableProop {
    totalProduct: (value: number) => void;
    reloadData: boolean;
    onSuccess?: () => void;
}

export const ProductTable: React.FC<ProductTableProop> = ({ totalProduct, reloadData, onSuccess }) => {
    const [productData, setProductData] = useState<ProductType[]>([])

    const [modalConfirmEdit, setModalConfirmEdit] = useState<boolean>(false)
    const [modalConfirmDelete, setModalConfirmDelete] = useState<boolean>(false)
    const [modalEditPro, setModalEditPro] = useState<boolean>(false)
    const [editProID, setEditProID] = useState<number>(0)
    const [deleteProID, setDeleteProID] = useState<number>(0)
    const [successDelete, setSuccessDelete] = useState<boolean>(false)


    const getAllProducts = async () => {
        try {
            const response = await getAllProduct();
            setProductData(response.data.products);
            totalProduct(response.data.total);
        } catch (error: any) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [reloadData, onSuccess, successDelete, modalEditPro])


    const columns: TableColumnsType<any> = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Category',
            dataIndex: ['category', ['name']],
        },
        {
            title: 'Description',
            dataIndex: 'description',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: {
                compare: (a, b) => a.english - b.english,
                multiple: 1,
            },
        },
        {
            title: 'Active',
            dataIndex: 'is_available',
            render: (value: boolean) => (
                <p className={`${!value && 'text-red-500'}`}>{value ? 'Enable' : 'Disable'}</p>
            )
        },
        {
            title: 'Points Earned',
            dataIndex: 'points_earned',
            sorter: {
                compare: (a, b) => a.english - b.english,
                multiple: 1,
            },
        },
        {
            title: 'IMG link',
            dataIndex: 'image',
        },
        {
            title: 'Manage',
            dataIndex: 'english',
            align: "center",
            width: 100,
            className: "text-center flex justify-center",
            render: (_: any, record: ProductType) => (
                <div className="flex space-x-2">
                    <Button onClick={() => { setEditProID(record.product_id), console.log(record.product_id), handleRowClick(record.product_id)}} variant="solid" color="yellow" size="small">Edit</Button>
                    <Button onClick={() => { setDeleteProID(record.product_id), setModalConfirmDelete(true) }} danger size="small">Delete</Button>
                </div>
            ),
        },
    ];

    const onChange: TableProps<any>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    const handleRowClick = (product_id: number) => {
        if (product_id) {
            setModalEditPro(true);
        }
    };

    const handleDeleteProduct = async (product_id: number) => {
        setModalConfirmDelete(false);
        if (!product_id) return;
        try {
            const response = await deleteProduct(product_id);
            if (response.data.message == 'Product deleted successfully') {
                setSuccessDelete(true);
            }
        } catch (error: any) {
            console.log(error.response.data.message);
        }
    }

    return (

        <div>
            <ConfirmModal onCancel={() => setModalConfirmEdit(false)} onOk={() => true} open={modalConfirmEdit} type='edit' />
            <ConfirmModal onCancel={() => setModalConfirmDelete(false)} onOk={() => handleDeleteProduct(deleteProID)} open={modalConfirmDelete} type='delete' />
            <SuccessModal onClose={() => setSuccessDelete(false)} open={successDelete} type='delete' />

                <EditProduct pro_id={editProID} onCancel={() => setModalEditPro(false)} open={modalEditPro}/>

            <Table<ProductType>
                rowKey='product_id'
                columns={columns}
                dataSource={productData}
                onChange={onChange} />
        </div>
    )
}
