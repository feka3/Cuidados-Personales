import { useState } from 'react'
import { Dialog, Popover } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/userSlice';



export default function Example() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const username = useSelector(state => state.user.username);

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <header className="bg-white">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link to='/home' className='-m-1.5 p-1.5'>
                        <span className='sr-only'>Your Company</span>
                        <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                    </Link>

                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <Popover className="hidden lg:flex lg:gap-x-12">
                    <Link to="/home" className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                        Servicios
                    </Link>
                    {isAuthenticated ? (
                        <Link onClick={() => setMobileMenuOpen(false)} to="/appointments" className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                            Turnos
                        </Link>

                    ) : null}


                    <Link to="#" className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                        About
                    </Link>

                </Popover>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">

                    {isAuthenticated ? (
                        // <li><button onClick={handleLogout}>Cerrar sesión</button></li>
                        <Link to="/home" onClick={handleLogout} className='hidden lg:flex lg:flex-1 lg:justify-end font-semibold text-gray-900 b'>Cerrar sesión</Link>


                    ) : (
                        <div className="flex justify-end space-x-4">
                            <Link to="/users/login" className='flex items-center px-4 py-2 border border-indigo text-indigo rounded-lg hover:bg-indigo-400 hover:text-white transition duration-300'>
                                Iniciar sesión
                            </Link>
                            <Link to="/users/register" className='flex items-center px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition duration-300'>

                                Registrarse
                            </Link>


                        </div>

                    )}




                </div>
            </nav>
            <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </a>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">

                                <Link to="/home" className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                                    Servicios
                                </Link>

                                <Link onClick={() => setMobileMenuOpen(false)} to="/appointments" className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                                    Turnos
                                </Link>

                                <Link to="/about" className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                                    About
                                </Link>

                            </div>
                            <div className="py-6">
                                <Link onClick={() => setMobileMenuOpen(false)} to="/users/login" className='-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50'>
                                    Log in

                                </Link>

                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}
