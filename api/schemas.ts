import { z, ZodObject } from 'zod';

export const createBaseResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    errors: z.string().nullish(),
    isSuccess: z.boolean(),
    message: z.string().nullish(),
    statusCode: z.number(),
    propertyErrors: z.record(z.string(), z.array(z.string())).nullish(),
    resCode: z.number().nullish(),
  });

const basePaginationResponseObjectSchema = z.object({
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
});

export const filteringDataItemSchema = z.object({
  id: z.guid(),
  name: z.string(),
  count: z.number().nonnegative(),
});

export const filteringDataVariantItemSchema = z.object({
  id: z.guid(),
  value: z.string(),
  count: z.number().nonnegative(),
});

export const filteringDataOptionSchema = z.object({
  id: z.guid(),
  name: z.string(),
  values: z.array(filteringDataVariantItemSchema),
});

export const filteringDataSchema = z.object({
  minPrice: z.number().nonnegative(),
  maxPrice: z.number().nonnegative(),
  categories: z.array(filteringDataItemSchema),
  brands: z.array(filteringDataItemSchema),
  variantAttributes: z.array(filteringDataOptionSchema),
  attributes: z.array(filteringDataOptionSchema),
});

export const createPaginationWrapSchema = <T extends ZodObject>(objectSchema: T) =>
  basePaginationResponseObjectSchema.extend(objectSchema);

export const createExtendedPaginationWrapSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  basePaginationResponseObjectSchema.extend({
    items: z.array(itemSchema),
    filteringData: filteringDataSchema,
  });

export const createPaginationResponseSchema = <T extends z.ZodRawShape>(
  schema: z.ZodObject<T>
) => {
  return basePaginationResponseObjectSchema.extend(schema.shape);
};

export const createExtendedPaginationResponseSchema = <T extends z.ZodTypeAny>(schema: T) => {
  return createBaseResponseSchema(createExtendedPaginationWrapSchema(schema));
};

export const paginationQueryParamsSchema = z.object({
  limit: z.number().optional(),
  skip: z.number().optional(),
});

export const createQueryParamsWithPagination = <T extends ZodObject>(itemSchema: T) =>
  paginationQueryParamsSchema.extend(itemSchema);

export const booleanBaseResponseSchema = createBaseResponseSchema(z.boolean());

export const guidBaseResponseSchema = createBaseResponseSchema(z.guid());

export const urlBaseResponseSchema = createBaseResponseSchema(z.string().url());

export const reactNativeFileSchema = z.object({
  uri: z.string(),
  name: z.string(),
  type: z.string(),
});
