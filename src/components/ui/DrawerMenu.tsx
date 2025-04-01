import React, { useState } from 'react';
import { Button, Drawer, Space } from 'antd';
import { useLocation } from 'react-router-dom';
import LanguageButton from '../languages/LanguageButton';
import { useNavigate } from 'react-router-dom';

const DrawerMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      <Space className='w-full border-2 flex justify-between px-5'>
        <p className='text-[24px] flex items-center gap-5 cursor-pointer' onClick={showDrawer}>
          Menu Bar
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 mt-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </p>
        <div className='flex items-center gap-5 text-[18px] font-semibold'>
          <p>Admin 001</p>
          <Button onClick={() => navigate('/')} color='danger'  variant='solid'>Login out</Button>
          <LanguageButton />
        </div>
      </Space>
      <Drawer
        title={<p className='text-[24px] flex items-center gap-5'>Menu Bar
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 mt-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </p>}
        placement={'left'}
        closable={false}
        onClose={onClose}
        open={open}
        key={'left'}
      >
        <div className='bg-gray font-semibold rounded-md py-5 flex flex-col ring-8 text-[18px] ring-zinc-200'>
          <p onClick={() => navigate('/dashboard')} className={`hover:bg-zinc-200 px-5 py-3 cursor-pointer duration-300 ${isActive('/dashboard') ? 'bg-zinc-200' : ''}`}>Dashboard</p>
          <p onClick={() => navigate('/product')} className={`hover:bg-zinc-200 px-5 py-3 cursor-pointer duration-300 ${isActive('/product') ? 'bg-zinc-200' : ''}`}>Product</p>
          <p onClick={() => navigate('/member')} className={`hover:bg-zinc-200 px-5 py-3 cursor-pointer duration-300 ${isActive('/customer') ? 'bg-zinc-200' : ''}`}>Customer</p>
          <p onClick={() => navigate('/promotion')} className={`hover:bg-zinc-200 px-5 py-3 cursor-pointer duration-300 ${isActive('/promotion') ? 'bg-zinc-200' : ''}`}>Promotion</p>
        </div>
      </Drawer>
    </>
  );
};

export default DrawerMenu;