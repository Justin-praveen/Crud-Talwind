import React, { FC } from 'react'
import { Fragment, Suspense, useCallback, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { JobsService } from './api-services/Axios'
import DataTable from 'react-data-table-component'
import { FaRegEdit, FaDatabase } from "react-icons/fa";



const Crud: FC = (): JSX.Element => {

    interface CreateJobInterface {
        Product_Code: number,
        Product_title: string,
        Description: string,
        Price: number,
        Quantity: number,
        id?: number

    }
    const customStyles = {
        rows: {
            style: {},
        },
        headCells: {
            style: {
                backgroundColor: "gray",
                text: "bold",
            },
        },
        cells: {
            style: {},
        },
    };

    const ProductColumn: any = [
        {
            name: <>S.No</>,
            selector: (row: any, sno: any) => sno + 1,
            sortable: true,
            wrap: true,
            grow: 1
        },
        {
            name: <>Product_Code</>,
            selector: (row: any) => row.Product_Code,
            sortable: true,
            wrap: true,
            grow: 1
        },
        {
            name: <>Product_Title</>,
            selector: (row: any) => row.Product_title,
            sortable: true,
            wrap: true,
            grow: 1
        },
        {
            name: <>Description</>,
            selector: (row: any) => row.Description,
            sortable: true,
            wrap: true,
            grow: 1
        },
        {
            name: <>Price</>,
            selector: (row: any) => row.Price,
            sortable: true,
            wrap: true,
            grow: 1
        },
        {
            name: <>Quantity</>,
            selector: (row: any) => row.Quantity,
            sortable: true,
            wrap: true,
            grow: 1
        },
        {
            name: <>Edit</>,
            selector: (row: any) => {
                return (
                    <FaRegEdit
                        onClick={() => {
                            setProductEdit({
                                Product_Code: row.Product_Code,
                                Product_title: row.Product_title,
                                Description: row.Description,
                                Price: row.Price,
                                Quantity: row.Quantity,
                                id: 0
                            })
                            openModal2()
                        }}
                    />
                )
            },
            sortable: true,
            wrap: true,
            grow: 1
        },
        {
            name: <>Delete</>,
            selector: (row: any) => <FaDatabase
                onClick={() => {
                    alert("Delete")
                }}
            />,
            sortable: true,
            wrap: true,
            grow: 1
        },

    ];
    const [FirstModal, setFirstModal] = useState<boolean>(false)
    const [SecondModal, setSecondModal] = useState<boolean>(false)

    const [submit, setSubmit] = useState<boolean>(false)
    const [Edited, setEdited] = useState<boolean>(false)

    const [JobsList, setJobsList] = useState<object[]>([])

    const [CreateJob, setCreateJob] = useState<CreateJobInterface>({
        Product_Code: 0,
        Product_title: "",
        Description: "",
        Price: 0,
        Quantity: 0,
    })
    const [ProductEdit, setProductEdit] = useState<any>({

    })


    const closeModal = (): void => {

        setFirstModal(false)
    }

    const openModal = (): void => {
        setFirstModal(true)

    }

    const closeModal2 = (): void => {

        setSecondModal(false)
    }

    const openModal2 = (): void => {
        setSecondModal(true)

    }



    // Fetch

    useEffect(() => {
        (
            async function () {
                try {
                    const { data } = await JobsService.ProductList()
                    setJobsList(data)
                } catch (err) {
                    console.log(err)
                }
            }
        )()

    }, [submit])

    // Create


    useEffect(() => {
        if (submit) {
            console.log(CreateJob)
            JobsService.ProductCreate(CreateJob).then(() => {
                setSubmit(false)
                alert("Create Sucessfully...!")
                closeModal()

            }).catch((err) => {
                console.log(err)
            })
            setSubmit(false)
            closeModal()
        }


        console.log(CreateJob)

    }, [submit])

    // Edit

    useEffect(() => {
        if (Edited) {
            // console.log(ProductEdit)
            // JobsService.ProductCreate(ProductEdit).then(() => {
            //     setSubmit(false)
            //     alert("Create Sucessfully...!")
            //     closeModal()

            // }).catch((err) => {
            //     console.log(err)
            // })
            // setSubmit(false)
            alert("Edited")
            closeModal()
        }


        console.log(ProductEdit)

    }, [Edited])

    const Modal1 = useCallback((): JSX.Element => {


        if (FirstModal) {
            return (
                <Transition appear show={FirstModal} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-w-full min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <div className='flex justify-between py-2'>
                                            <h1 className='text-3xl'>Create a Product</h1>
                                        </div>


                                        {/* Form */}

                                        <div className='w-full max-w-sm'>
                                            <form className='m-2' onSubmit={(e) => {
                                                e.stopPropagation()
                                                e.preventDefault()
                                                setSubmit(!submit)
                                            }}>
                                                <div className='mb-4'>
                                                    <label className='block text-gray-700 text-base ' htmlFor="userName">
                                                        Product Code
                                                    </label>
                                                    <input required
                                                        onChange={(e) => {
                                                            setCreateJob((pre) => {
                                                                return {
                                                                    ...pre, Product_Code: parseInt(e.target.value)
                                                                }
                                                            })

                                                        }}
                                                        className=' required: appearance-none border rounded w-full py-3 m-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type={"text"} id='userName' placeholder='ex : 909937382' />
                                                </div>
                                                <div className='mb-4'>
                                                    <label className='block text-gray-700 text-base ' htmlFor="CompanyName">
                                                        Product Title
                                                    </label>
                                                    <input required
                                                        onChange={(e) => {
                                                            setCreateJob((pre) => {
                                                                return {
                                                                    ...pre, Product_title: e.target.value
                                                                }
                                                            })

                                                        }}
                                                        className=' appearance-none border rounded w-full py-3 m-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type={"text"} id='CompanyName' placeholder='ex :Bikes Parts' />
                                                </div>
                                                <div className='mb-4'>
                                                    <label className='block text-gray-700 text-base ' htmlFor="Industry">
                                                        Description
                                                    </label>
                                                    <input required
                                                        onChange={(e) => {
                                                            setCreateJob((pre) => {
                                                                return {
                                                                    ...pre, Description: e.target.value
                                                                }
                                                            })

                                                        }}
                                                        className=' appearance-none border rounded w-full py-3 m-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type={"text"} id='Industry' placeholder='ex :Good product' />
                                                </div>
                                                {/* 2 */}
                                                <div className='flex justify-evenly gap-3'>
                                                    <div className=''>
                                                        <label className='block text-gray-700 text-base ' htmlFor="Location">
                                                            Price
                                                        </label>
                                                        <input required
                                                            onChange={(e) => {
                                                                setCreateJob((pre) => {
                                                                    return {
                                                                        ...pre, Price: parseInt(e.target.value)
                                                                    }
                                                                })

                                                            }}
                                                            className=' appearance-none border rounded w-full py-3 m-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type={"text"} id='Location' placeholder='ex : 100000' />
                                                    </div>
                                                    <div className=''>
                                                        <label className='block text-gray-700 text-base ' htmlFor="Remote">
                                                            Quantity
                                                        </label>
                                                        <input required
                                                            onChange={(e) => {
                                                                setCreateJob((pre) => {
                                                                    return {
                                                                        ...pre, Quantity: parseInt(e.target.value)
                                                                    }
                                                                })

                                                            }}
                                                            className=' appearance-none border rounded w-full py-3 m-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type={"text"} id='Remote' placeholder='ex : 1' />
                                                    </div>
                                                </div>
                                                {/* 2-end */}
                                                <div className='flex justify-end'>
                                                    <button className='bg-blue-500 hover:bg-blue-700 text-white  rounded mt-10 font-bold focus:outline-none focus:shadow-outline py-2 px-4'

                                                        type='submit'>Add</button>
                                                </div>
                                            </form>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            )
        } else {
            return (
                <></>
            )
        }


    }, [FirstModal])

    return (
        <Fragment>
            <div>
                <div className=" mt-10 inset-0 flex justify-center">
                    <button
                        type="button"
                        onClick={openModal}
                        className="rounded-md bg-green-500 px-4 py-2 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                    >
                        + Create Product
                    </button>
                </div>
            </div>

            <div className='mt-10'>

                <DataTable
                    data={JobsList}
                    columns={ProductColumn}
                    pagination
                    customStyles={customStyles}

                />
            </div>

            <Modal1 />

            <Transition appear show={SecondModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal2}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-w-full min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <div className='flex justify-between py-2'>
                                        <h1 className='text-3xl'>Create a Product</h1>
                                    </div>


                                    {/* Form */}

                                    <div className='w-full max-w-sm'>
                                        <form className='m-2' onSubmit={(e) => {
                                            e.stopPropagation()
                                            e.preventDefault()
                                            setEdited(!Edited)
                                        }}>
                                            <div className='mb-4'>
                                                <label className='block text-gray-700 text-base ' htmlFor="userName">
                                                    Product Code
                                                </label>
                                                <input required
                                                    value={ProductEdit.Product_Code}
                                                    onChange={(e) => {
                                                        setProductEdit((pre: any) => {
                                                            return {
                                                                ...pre, Product_Code: parseInt(e.target.value)
                                                            }
                                                        })

                                                    }}
                                                    className=' required: appearance-none border rounded w-full py-3 m-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type={"text"} id='userName' placeholder='ex : 909937382' />
                                            </div>
                                            <div className='mb-4'>
                                                <label className='block text-gray-700 text-base ' htmlFor="CompanyName">
                                                    Product Title
                                                </label>
                                                <input required
                                                    value={ProductEdit.Product_title}
                                                    onChange={(e) => {
                                                        setProductEdit((pre: any) => {
                                                            return {
                                                                ...pre, Product_title: e.target.value
                                                            }
                                                        })

                                                    }}
                                                    className=' appearance-none border rounded w-full py-3 m-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type={"text"} id='CompanyName' placeholder='ex :Bikes Parts' />
                                            </div>
                                            <div className='mb-4'>
                                                <label className='block text-gray-700 text-base ' htmlFor="Industry">
                                                    Description
                                                </label>
                                                <input required
                                                    value={ProductEdit.Description}
                                                    onChange={(e) => {
                                                        setProductEdit((pre: any) => {
                                                            return {
                                                                ...pre, Description: e.target.value
                                                            }
                                                        })

                                                    }}
                                                    className=' appearance-none border rounded w-full py-3 m-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type={"text"} id='Industry' placeholder='ex :Good product' />
                                            </div>
                                            {/* 2 */}
                                            <div className='flex justify-evenly gap-3'>
                                                <div className=''>
                                                    <label className='block text-gray-700 text-base ' htmlFor="Location">
                                                        Price
                                                    </label>
                                                    <input required
                                                        value={ProductEdit.Price}
                                                        onChange={(e) => {
                                                            setProductEdit((pre: any) => {
                                                                return {
                                                                    ...pre, Price: parseInt(e.target.value)
                                                                }
                                                            })

                                                        }}
                                                        className=' appearance-none border rounded w-full py-3 m-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type={"text"} id='Location' placeholder='ex : 100000' />
                                                </div>
                                                <div className=''>
                                                    <label className='block text-gray-700 text-base ' htmlFor="Remote">
                                                        Quantity
                                                    </label>
                                                    <input required
                                                        value={ProductEdit.Quantity}
                                                        onChange={(e) => {
                                                            setProductEdit((pre: any) => {
                                                                return {
                                                                    ...pre, Quantity: parseInt(e.target.value)
                                                                }
                                                            })

                                                        }}
                                                        className=' appearance-none border rounded w-full py-3 m-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type={"text"} id='Remote' placeholder='ex : 1' />
                                                </div>
                                            </div>
                                            {/* 2-end */}
                                            <div className='flex justify-end'>
                                                <button className='bg-blue-500 hover:bg-blue-700 text-white  rounded mt-10 font-bold focus:outline-none focus:shadow-outline py-2 px-4'

                                                    type='submit'>Add</button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </Fragment>
    )
}

export default Crud