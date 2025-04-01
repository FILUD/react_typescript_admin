import { useEffect, useState } from 'react'
import DrawerMenu from '../components/ui/DrawerMenu'
import { Button, message, Tabs, TabsProps } from 'antd';
import { ProductTable } from '../taps/ProductTable';
import Input from 'antd/es/input';
import { AddCategory } from '../components/modals/AddCategory';
import { CategoryType } from '../components/types/ProductType';
import { getAllCategory } from '../services/CategorySv';
import { ManageCategory } from '../components/modals/ManageCategory';
import { AddProduct } from '../components/modals/AddProduct';


function Product() {
  const [modalAdd, setModalAdd] = useState<boolean>(false)
  const [modalAddProduct, setModalAddProduct] = useState<boolean>(false)
  const [modalManageCate, setModalManageCate] = useState<boolean>(false)
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [totalCate, setTotalCate] = useState<number>(0)
  const [totalPro, setTotalPro] = useState<number>(0)
  const [reloadData, setReloadData] = useState<boolean>(false)



  const getCategory = async () => {
    try {
      const response = await getAllCategory();
      setTotalCate(response.data.total);
      const formattedCategories = response.data.categories.map((cat: any) => ({
        category_id: cat.category_id,
        name: cat.name,
        description: cat.description,
        image: cat.image || ''
      }));
      setCategories(formattedCategories);
    } catch (error: any) {
      message.error(error.message || 'Failed to fetch categories');
    }
  }

  useEffect(() => {
    getCategory();
  }, [modalManageCate, modalAdd])

  const renderTabContent = (type: string) => {
    switch (type.toLowerCase()) {
      default:
        return <ProductTable reloadData={reloadData} totalProduct={(value) => setTotalPro(value)} />;
    }
  };

  const generateTabs = (): NonNullable<TabsProps['items']> => {
    if (!Array.isArray(categories)) {
      return [];
    }

    return categories.map(category => ({
      key: category.category_id.toString(),
      label: <p className='text-[18px]'>{category.name}</p>,
      children: renderTabContent(category.name)
    }));
  };

  useEffect(() => {
    setReloadData(!reloadData);
  }, [modalAddProduct])

  return (
    <main className="bg-stone-200 h-[100vh]">
      <AddCategory onCancel={() => setModalAdd(false)} open={modalAdd} />
      <AddProduct onSucess={() => setReloadData(!reloadData)} onCancel={() => { setModalAddProduct(false) }} open={modalAddProduct} />
      <ManageCategory onAdd={() => setModalAdd(true)} onCancel={() => setModalManageCate(false)} open={modalManageCate} />

      <header className="px-[1vw] pt-5">
        <DrawerMenu />
      </header>
      <div className='bg-slate-50 mt-5 justify-between flex rounded-[11px] mx-[10vw]'>
        <div className='flex items-center text-start m-2 flex-col gap-3'>
          <p className='text-[24px] font-bold'>My Product</p>
          <div className='flex flex-col px-5 justify-start items-start w-full'>
            <li className='flex gap-3 text-[18px] whitespace-nowrap'>● Products: <p>{totalPro}</p></li>
            <li className='flex gap-3 text-[18px] whitespace-nowrap'>● Categories: <p>{totalCate}</p></li>
          </div>
        </div>
        <div className='flex items-center px-10 gap-5 w-full justify-end'>
          <Button onClick={() => setModalAddProduct(true)} size='large' color='purple' variant='solid'>Add Product</Button>
        </div>
      </div>
      <div className='flex pt-5 justify-between px-[10vw]'>
        <div className='flex gap-2'>

          <Button variant='solid' color='blue' onClick={() => setModalAdd(true)} size='large'>+ Add Category</Button>
          <Button onClick={() => setModalManageCate(true)} color='cyan' variant='solid' className='text-custom_brown' size='large'>
            Manage Category
          </Button>

        </div>
        <Input
          placeholder="input search text"
          className="w-[500px]"
          size='large'
          suffix={
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          }
        />
      </div>
      <div className="px-[10vw] flex flex-col gap-10 pt-5">
        <Tabs className='h-[60vh] overflow-y-auto' tabPosition='left' items={generateTabs()} />
      </div>
    </main>
  )
}

export default Product