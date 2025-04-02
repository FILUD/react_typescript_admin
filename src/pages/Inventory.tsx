import { Button, Input, Table, TableColumnsType } from 'antd'
import { ProductType } from '../components/types/ProductType'
import DrawerMenu from '../components/ui/DrawerMenu'
import { getAllInventory } from '../services/InventorySv'
import { useEffect, useState } from 'react'
import { paginationType } from '../components/types/pagiantion'
import { CategoryDropdown } from '../components/dropdown/CategoryDropdown'

function Inventory() {
  const [paginatData, setPaginatData] = useState<paginationType>({
    currentPage: 1,
    hasNextPage: false,
    hasPrevPage: false,
    pageSize: 10,
    totalItems: 0,
    totalPages: 0
  })
  const getInventory = async () => {
    try {
      const response = await getAllInventory();
      setPaginatData(response.data.pagination)
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    getInventory();
  }, [])

  const columns: TableColumnsType<any> = [
    {
      title: 'Product name',
      dataIndex: 'name',
    },
    {
      title: 'Category',
      dataIndex: ['category', ['name']],
    },
    {
      title: 'Quantity',
      dataIndex: 'description',
    },
    {
      title: 'min stock',
      dataIndex: 'price',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
    {
      title: 'Last restock date',
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
          <Button onClick={() => true} variant="solid" color="yellow" size="small">Edit</Button>
          <Button onClick={() => true} danger size="small">Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <main className="bg-stone-200 h-[100vh]">
      <header className="px-[1vw] pt-5">
        <DrawerMenu />
      </header>
      <div className="px-[10vw] flex flex-col gap-10 pt-5">
        <section className="grid gap-10 grid-cols-4">

        </section>
        <section>
          <div className='flex justify-between bg-slate-400 p-2 rounded-[10px]'>
            <span className='w-[300px]'>
              <Input placeholder='Search'></Input>
            </span>
            <span className='w-[300px]'>
              <CategoryDropdown label={false} onSelect={(value) => console.log(value)} />
            </span>
          </div>
          <div className='bg-slate-300 rounded-[10px] flex justify-between pr-10 p-2 mb-1'>
            <p className='flex gap-5 items-center'>
              <Button size='large'>+ Add stock</Button>
              total items: {paginatData.totalItems}
            </p>
            <p className='flex items-center'>
              total pages: {paginatData.totalPages}
            </p>

          </div>
          <Table<ProductType>
            rowKey='product_id'
            columns={columns}
          // dataSource={productData}
          // onChange={onChange}
          />
        </section>
      </div>

    </main>
  )
}

export default Inventory