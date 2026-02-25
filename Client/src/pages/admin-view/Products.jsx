import { AdminProductTile } from '@/components/admin-view/add-product-tile'
import UploadProductImage from '@/components/admin-view/image-upload'
import Form from '@/components/common/Form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { createProductFormConfig } from '@/config/config'
import { createProduct, deleteProduct, editProduct, getAllProducts } from '@/store/admin/productSlice'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from "sonner"



const initialFormData = {
  image: "",
  title: "",
  description: "",
  category: "",
  brand: "",
  price: 0,
  salesPrice: 0,
  totalStock: 0,
}

const AdminProducts = () => {

  const [openCreateProuductDialog, setopenCreateProuductDialog] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [imageFile, setImageFile] = useState(null)
  const [currentEditedId, setCurrentEditedId] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState('')
  const { productList } = useSelector(state => state.adminProducts)
  const dispatch = useDispatch()



  function handleCreateProduct(event) {

    event.preventDefault();

    console.log(formData,"main data")

    currentEditedId !== null ?
      dispatch(editProduct({ id: currentEditedId, formData })
    ).then((data) => {
        console.log(data,"edited Product")

        if (data.payload.success) {
          dispatch(getAllProducts())
          setopenCreateProuductDialog(false)
          setFormData(initialFormData)
          setCurrentEditedId(null)
          toast({
            title: "Product Product Edited Successfully"
          })
        }
      })
      :
      dispatch(createProduct({ ...formData, image: uploadedImageUrl })
      ).then((data) => {
        if (data.payload.success) {
          dispatch(getAllProducts())
          setopenCreateProuductDialog(false)
          setImageFile(null)
          setFormData(initialFormData)
          toast({
            title: "Product Added Successfully"
          })
        }
      })


  }

  function isFormValid() {

    return Object.keys(formData).map(key => formData[key] !== "").every(item => item)

  }


  function handleDelete(id) {

    dispatch(deleteProduct(id)).then((data) => {
      if (data?.payload.success) {
        dispatch(getAllProducts())
      }
    })
  }

  useEffect(() => {

    dispatch(getAllProducts())

  }, [dispatch])


  return (<Fragment>

    <div className='mb-5 w-full flex justify-end'>
      <Button onClick={() => setopenCreateProuductDialog(true)}>Add Product</Button>
    </div>
    <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
      {

        productList && productList.length > 0 ?
          productList.map(productItem => <AdminProductTile key={productItem?._id} product={productItem} setCurrentEditedId={setCurrentEditedId} setopenCreateProuductDialog={setopenCreateProuductDialog} setFormData={setFormData} handleDelete={handleDelete} />) : <div>No Products To Show</div>
      }
    </div>

    <Sheet
      open={openCreateProuductDialog}
      onOpenChange={() => {
        setopenCreateProuductDialog(false)
        setCurrentEditedId(null)
        setFormData(initialFormData)
      }}>

      <SheetContent side='right' className="overflow-auto">
        <SheetHeader>
          <SheetTitle>{currentEditedId !== null ? "Edit" : "Add New Product"}</SheetTitle>
        </SheetHeader>
        <UploadProductImage isEditMode={currentEditedId !== null} imageFile={imageFile} setImageFile={setImageFile} setUploadedImageUrl={setUploadedImageUrl} />
        <div className='py-6'>
          <Form formControls={createProductFormConfig} formData={formData} setFormData={setFormData} handleSubmit={handleCreateProduct} buttonText={currentEditedId !== null ? "Edit" : "Add"} isBtnDisabled={!isFormValid()} />
        </div>
      </SheetContent>
    </Sheet>
  </Fragment>)
}


export default AdminProducts