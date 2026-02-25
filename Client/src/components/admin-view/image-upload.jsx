import React, { useEffect, useRef, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { CloudUpload, FileIcon, XIcon } from 'lucide-react'
import axios from 'axios'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'
import { toast } from 'sonner'





function UploadProductImage({
    imageFile,
    setImageFile,
    setUploadedImageUrl,
    isEditMode }) {

    const [isUploading, setIsUploading] = useState(false)

    async function uploadImageToServer() {

        setIsUploading(true)
        const formData = new FormData();
        formData.append("my-file", imageFile)
        setIsUploading(true)
        console.log(formData)
        const response = await axios.post("http://localhost:5000/admin/api/products/upload-image", formData, {
            withCredentials: true
        }).then((response) => {
            if (response?.data?.success) {
                setUploadedImageUrl(response.data.result.secure_url)
                setIsUploading(false)
            }
        }).catch((err)=>{
            if(!err.response.data.success)
            {
                toast(err.response.data.message)
            }
            setIsUploading(false)
            setImageFile(null)
        })
    }

    // new creation

    const imageRef = useRef(null)


    const handleFileChange = (event) => {

        event.preventDefault()
        const selectedFile = event.target.files[0]
        console.log(event.target.files[0])
        if (selectedFile) {
            setImageFile(selectedFile)
        }
    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }


    const handleOnDrop = (e) => {

        e.preventDefault();

        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) {
            setImageFile(droppedFile)
        }


    }


    function handleRemoveImage() {
        setImageFile(null)
        if (imageRef.current) {
            imageRef.current.value = ""
        }
    }


    useEffect(() => {

        if (imageFile !== null) {
            uploadImageToServer()
        }

    }, [imageFile])

    return (

        <div className='w-full max-w-md mx-auto mt-4'>
            <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>

            <div
                onDragOver={handleDragOver}
                onDrop={handleOnDrop}
                // onClick={() => imageRef.current.click()}
                className={`${isEditMode ? "opacity-60" : ""} border-2 border-dashed border-black rounded-lg p-4 lg:p-6`}>
                <Input
                    type="file"
                    id="image-upload"
                    className="hidden"
                    ref={imageRef}
                    onChange={handleFileChange}
                    disabled={isEditMode}
                />
                {
                    !imageFile ? (
                        <Label htmlFor="image-upload" className={`${isEditMode ? "cursor-not-allowed" : ""} flex flex-col items-center justify-center h-32 cursor-pointer`}>
                            <CloudUpload className='w-10 h-10 text-muted-foreground mb-2' />
                            <span>Drag and Drop Or Click To Upload Image</span>
                        </Label>) :
                        (
                            isUploading ?
                                <Skeleton className="h-10 bg-gray-400" /> :
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <FileIcon className='w-8 text-primary mr-2 h-8' />
                                    </div>
                                    <p className='text-sm font-medium'>{imageFile.name}</p>
                                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" onClick={handleRemoveImage}>
                                        <XIcon className='w-4 h-4' />
                                        <span className='sr-only'>Remove File</span>
                                    </Button>
                                </div>
                        )
                }
            </div>
        </div>
    )
}

export default UploadProductImage