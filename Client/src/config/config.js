

export const forgotPasswordControls = [
    {
        name: "email",
        id: "email",
        placeholder: "Enter Email :",
        type: "email",
        componentType: "input",
        label: "Email :",
        className: "border border-blue-600"
    }
]


export const resetPasswordControls = [
    {
        name: "password",
        id: "password",
        placeholder: "Enter password :",
        type: "password",
        componentType: "input",
        label: "Password :",
        className: "border border-blue-600"
    },
    {
        name: "confirmPassword",
        id: "confirmPassword",
        placeholder: "Retype password :",
        type: "password",
        componentType: "input",
        label: "Confirm Password :",
        className: "border border-blue-600"
    },

]




export const loginControls = [
    {
        name: "email",
        id: "email",
        placeholder: "Enter Email :",
        type: "email",
        componentType: "input",
        label: "Email :",
        className: "border border-blue-600"
    },
    {
        name: "password",
        id: "password",
        placeholder: "Enter password :",
        type: "password",
        componentType: "input",
        label: "Password :",
        className: "border border-blue-600"
    },

]


export const registersControls = [
    {
        name: "userName",
        id: "username",
        placeholder: "Enter User Name :",
        type: "text",
        componentType: "input",
        label: "User Name :",
        className: "border border-blue-600"
    },
    {
        name: "email",
        id: "email",
        placeholder: "Enter Email :",
        type: "email",
        componentType: "input",
        label: "Email :",
        className: "border border-blue-600"
    },
    {
        name: "password",
        id: "password",
        placeholder: "Enter password :",
        type: "password",
        componentType: "input",
        label: "Password :",
        className: "border border-blue-600"
    },

]




export const createProductFormConfig = [
    {
        componentType: "input",
        type: "text",
        name: "title",
        id: "title",
        label: "Product Title",
        placeholder: "Enter product title",
        className: "border border-blue-600"
    },
    {
        componentType: "textarea",
        name: "description",
        id: "description",
        label: "Description",
        placeholder: "Enter product description",
        required: true,
        rows: 4,
        className: "border border-blue-600"
    },

    {
        componentType: "select",
        name: "category",
        id: "category",
        label: "Category",
        required: true,
        options: [
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Kids", value: "kids" },
        ],
    },
    {
        componentType: "select",
        name: "brand",
        id: "brand",
        label: "Brand",
        required: true,
        options: [
            { label: "Zara", value: "zara" },
            { label: "Puma", value: "puma" },
            { label: "Raymond", value: "raymond" },
            { label: "Linen", value: "linen" },
        ],
    },
    {
        componentType: "input",
        type: "number",
        name: "price",
        id: "price",
        label: "Price",
        placeholder: "Enter price",
        className: "border border-blue-600"
    },
    {
        componentType: "input",
        type: "number",
        name: "salesPrice",
        id: "salesPrice",
        label: "Sales Price",
        placeholder: "Enter Sales Price",
        required: true,
        min: 0,
        className: "border border-blue-600"
    },
     {
        componentType: "input",
        type: "number",
        name: "totalStock",
        id: "totalStock",
        label: "Total Stock",
        placeholder: "Enter Total Stock",
        required: true,
        min: 0,
        className: "border border-blue-600"
    },
];


export const shoppingViewHeaderMenuItems = [
    {
        id : "home",
        label : "Home",
        path : "/shop/home"
    },
    {
        id : "men",
        label : "Men",
        path : "/shop/listing"
    },
    {
        id : "women",
        label : "Women",
        path : "/shop/listing"
    },
    {
        id : "kids",
        label : "Kids",
        path : "/shop/listing"
    },
]


export const filterOptions = {

    category : [
        { id : "men" , label : "Men"},
        { id : "women" , label : "Women"},
        { id : "kids" , label : "Kids"},
    ],
    brand : [
        { id : "zara" , label : "Zara"},
        { id : "linen" , label : "Linen"},
        { id : "cotton" , label : "Cotton"},
    ]
}


export const sortOptions = [
    {id : "price-lowtohigh" , label : "Price : Low to High"},
    {id : "price-hightolow" , label : "Price : High to Low"},
    {id : "title-atoz" , label : "Title : A to Z"},
    {id : "title-ztoa" , label : "Title : Z to A"},
]

