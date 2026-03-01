import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import {
    Select, SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'




const Form = ({ formControls, formData, setFormData, buttonText, handleSubmit, isBtnDisabled }) => {


    const renderFormElement = (formItem) => {

        let element = null
        let value = formData[formItem.name]

        switch (formItem.componentType) {

            case "input":

                element = (<Input

                    type={formItem.type}
                    name={formItem.name}
                    id={formItem.id}
                    placeholder={formItem.placeholder}
                    className={formItem.className ? formItem.className : ""}
                    value={value}
                    onChange={(e) => 
                  
                            setFormData({
                                ...formData,
                                [formItem.name]: e.target.value
                            })
                        }


                />)

                break;

            case "textarea":

                element = (<Textarea

                    type={formItem.type}
                    name={formItem.name}
                    id={formItem.id}
                    placeholder={formItem.placeholder}
                    rows={formItem.rows}
                    className={formItem.className ? formItem.className : ""}
                    value={value}
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            [formItem.name]: e.target.value
                        })
                    }}

                />)

                break;

            case "select":
                element = (
                    <Select onValueChange={(value) => {
                        setFormData({
                            ...formData,
                            [formItem.name]: value

                        })
                    }}>
                        <SelectTrigger className="w-full border border-blue-800 text-black">
                            <SelectValue placeholder={formItem.label} />
                        </SelectTrigger>
                        <SelectContent position='popper'>
                            <SelectGroup>
                                {
                                    formItem.options.map((option) => {
                                        return (<SelectItem key={option.label} value={option.value}>{option.label}</SelectItem>)
                                    })

                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                )

                break;

            default:

                element = (<Input

                    type={formItem.type}
                    name={formItem.name}
                    id={formItem.id}
                    placeholder={formItem.placeholder}
                    value={value}
                    onChange={(e) => {
                        setFormData({
                            ...formData,
                            [formItem.name]: e.target.value
                        })
                    }}

                />
                )
                break;
        }



        return (element)
    }


    return (
        <form action="POST" onSubmit={handleSubmit} className='w-full px-6 gap-3 text-black flex flex-col justify-center items-center'>

            {
                formControls.map((formItem) => {

                    return (
                        <div key={formItem.id} className='flex flex-col justify-center m-auto w-full gap-2 pt-2 p-2'>
                            <Label>{formItem.label}</Label>
                            {renderFormElement(formItem)}
                        </div>
                    )

                })
            }
            <Button type="submit" className="w-full cursor-pointer bg-blue-700 transition-colors hover:bg-blue-900 flex justify-center items-center m-auto gap-2 pt-2 p-2">{buttonText ? buttonText.toUpperCase() : "submit"}</Button>
        </form>
    )
}

export default Form