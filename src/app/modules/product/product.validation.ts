import { z } from "zod";

export const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    price: z.number(),
    stockQuantity: z.number(),
    description: z.string(),
    category: z.string(),
    ratings: z.number().max(5, "Ratings must be less than or equal to 5"),
  }),
});
export const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    price: z.number().optional(),
    stockQuantity: z.number().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    ratings: z.number().optional(),
  }),
});

export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
