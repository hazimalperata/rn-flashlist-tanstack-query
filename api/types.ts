import { z } from 'zod';
import {
  booleanBaseResponseSchema,
  filteringDataItemSchema,
  filteringDataOptionSchema,
  filteringDataSchema,
  filteringDataVariantItemSchema,
  guidBaseResponseSchema,
  paginationQueryParamsSchema,
  reactNativeFileSchema,
  urlBaseResponseSchema,
} from '@/api/schemas';
import { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

export type MutationProps<T> = Omit<
  UseMutationOptions<T, any, any, any>,
  'mutationFn' | 'mutationKey'
>;

export type QueryProps<T> = Pick<UseQueryOptions<T>, 'enabled' | 'gcTime'>;

export type PaginationQueryParams = z.infer<typeof paginationQueryParamsSchema>;

export type BooleanBaseResponse = z.infer<typeof booleanBaseResponseSchema>;

export type GuidBaseResponse = z.infer<typeof guidBaseResponseSchema>;

export type UrlBaseResponse = z.infer<typeof urlBaseResponseSchema>;

export type ReactNativeFile = z.infer<typeof reactNativeFileSchema>;

export type FilteringDataItem = z.infer<typeof filteringDataItemSchema>;

export type FilteringDataVariantItem = z.infer<
  typeof filteringDataVariantItemSchema
>;

export type FilteringDataOption = z.infer<typeof filteringDataOptionSchema>;

export type FilteringData = z.infer<typeof filteringDataSchema>;
