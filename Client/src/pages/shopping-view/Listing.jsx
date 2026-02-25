import ProductFilter from '@/components/shopping-view/filter'
import ShoppingProductTile from '@/components/shopping-view/shopping-product-tile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSubContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config/config'
import { getAllFilteredProducts } from '@/store/shop/product-slice'
import { ArrowUpDown, ArrowUpDownIcon } from 'lucide-react'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'


function CreateQueryHelper(filterQueries)
{
    const queryParams = []

    for(const [key,value] of Object.entries(filterQueries))
    
    {
        if(Array.isArray(value) && value.length > 0)
        {
            const paramValue = value.join(',')
            queryParams.push(`${key}=${encodeURI(paramValue)}`)
        }
    }

    return(queryParams.join('&'))
    
}

const Listing = () => {

    const dispatch = useDispatch()
    const {productList} = useSelector(state=>state.shopProducts)
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState('price-lowtohigh')
    const [searchParams,setsSearchParams] = useSearchParams()

    function handleSort(value)
    {

        setSort(value)

    }

    function handleFilter(currentSectionId,currentOption){

        console.log(currentSectionId,currentOption)

        let cpyFilters = {...filters}
        const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(currentSectionId);

        if(indexOfCurrentSection === -1)
        {
            cpyFilters = {
                ...cpyFilters,
                [currentSectionId]:[currentOption]
            }
        }
        else
        {
            const indexOfCurrentOption = cpyFilters[currentSectionId].indexOf(currentOption)
            if(indexOfCurrentOption === -1)
            {
                cpyFilters[currentSectionId].push(currentOption)
            }
            else
            {
                cpyFilters[currentSectionId].splice(indexOfCurrentOption,1)
            }
        }

        console.log(cpyFilters)
        setFilters(cpyFilters)
        sessionStorage.setItem('filters',JSON.stringify(cpyFilters))

    }


    useEffect(() => {
    
        setSort('price-lowtohigh')
        setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
    
    }, [])

    useEffect(() => {
 
        if(filters && Object.keys(filters).length > 0)
        {
            const queryString = CreateQueryHelper(filters)
            setsSearchParams(new URLSearchParams(queryString))
        }

    }, [filters])
    
    


    useEffect(() => {
        if(filters !== null && sort !== null)
        dispatch(getAllFilteredProducts({filterParams:filters,sortParams:sort}))
    }, [dispatch,sort,filters])

    console.log(productList)
    


    return (
        <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6'>

            <ProductFilter filters={filters} handleFilter={handleFilter}/>
            <div className='bg-background w-full rounded-lg shadow-sm'>

                <div className='p-4 border-b flex items-center justify-between'>
                    <h2 className='text-xl font-extrabold'>All Products</h2>
                    <div className='flex gap-3 items-center'>
                        <span className='text-muted-foreground'>{productList.length} Products</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='outline' size='sm' className="flex items-center gap-1">
                                    <ArrowUpDownIcon className='h-4 w-4' />
                                    <span>Sort By</span>
                                </Button>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent algin="end" className="w-50">
                                <DropdownMenuRadioGroup value={sort}onValueChange={handleSort}>
                                    {
                                        sortOptions.map(sortItem=><DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                                            {sortItem.label}
                                        </DropdownMenuRadioItem>)
                                    }
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
                {
                    productList && productList.length > 0 ?
                    productList.map(productItem=><ShoppingProductTile product={productItem}/>) : null
                }
            </div>

            </div>

        </div>
    )
}

export default Listing