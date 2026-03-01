import z from "zod";

export const productSchema = z.object({

    image: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    brand: z.string(),
    price:z.number(),
    salesPrice:z.number(),
    totalStock: z.number()

})

export const editProductSchema = z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    brand: z.string(),
    price:z.number(),
    salesPrice:z.number(),
    totalStock:z.number(),
})

