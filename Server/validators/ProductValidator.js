import z from "zod";

export const productSchema = z.object({

    image: z.string(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    brand: z.string(),
    price: z.string(),
    salesPrice: z.string(),
    totalStock: z.string(),

})
export const editProductSchema = z.object({

    title: z.string(),
    description: z.string(),
    category: z.string(),
    brand: z.string(),
    price: z.number(),
    salesPrice: z.number(),
    totalStock: z.string(),
})

