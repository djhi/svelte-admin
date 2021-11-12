import type { QueryStatus } from "@sveltestack/svelte-query";
import { UseGetListResult } from "./useGetList";

export type DataProvider = {
  getList: <RecordType extends ResourceRecord = ResourceRecord>(
    resource: string,
    params: GetListParams
  ) => Promise<GetListResult<RecordType>>;

  getOne: <RecordType extends ResourceRecord = ResourceRecord>(
    resource: string,
    params: GetOneParams
  ) => Promise<GetOneResult<RecordType>>;

  getMany: <RecordType extends ResourceRecord = ResourceRecord>(
    resource: string,
    params: GetManyParams
  ) => Promise<GetManyResult<RecordType>>;

  getManyReference: <RecordType extends ResourceRecord = ResourceRecord>(
    resource: string,
    params: GetManyReferenceParams
  ) => Promise<GetManyReferenceResult<RecordType>>;

  update: <RecordType extends ResourceRecord = ResourceRecord>(
    resource: string,
    params: UpdateParams
  ) => Promise<UpdateResult<RecordType>>;

  updateMany: (
    resource: string,
    params: UpdateManyParams
  ) => Promise<UpdateManyResult>;

  create: <RecordType extends ResourceRecord = ResourceRecord>(
    resource: string,
    params: CreateParams
  ) => Promise<CreateResult<RecordType>>;

  delete: <RecordType extends ResourceRecord = ResourceRecord>(
    resource: string,
    params: DeleteParams
  ) => Promise<DeleteResult<RecordType>>;

  deleteMany: (
    resource: string,
    params: DeleteManyParams
  ) => Promise<DeleteManyResult>;

  [key: string]: any;
};

export interface GetListParams {
  pagination: PaginationPayload;
  sort: SortPayload;
  filter: any;
}
export interface GetListResult<RecordType = ResourceRecord> {
  data: RecordType[];
  total: number;
  validUntil?: ValidUntil;
}

export interface GetOneParams {
  id: Identifier;
}
export interface GetOneResult<RecordType = ResourceRecord> {
  data: RecordType;
  validUntil?: ValidUntil;
}

export interface GetManyParams {
  ids: Identifier[];
}
export interface GetManyResult<RecordType = ResourceRecord> {
  data: RecordType[];
  validUntil?: ValidUntil;
}

export interface GetManyReferenceParams {
  target: string;
  id: Identifier;
  pagination: PaginationPayload;
  sort: SortPayload;
  filter: any;
}
export interface GetManyReferenceResult<RecordType = ResourceRecord> {
  data: RecordType[];
  total: number;
  validUntil?: ValidUntil;
}

export interface UpdateParams<T = any> {
  id: Identifier;
  data: T;
  previousData: ResourceRecord;
}
export interface UpdateResult<RecordType = ResourceRecord> {
  data: RecordType;
  validUntil?: ValidUntil;
}

export interface UpdateManyParams<T = any> {
  ids: Identifier[];
  data: T;
}
export interface UpdateManyResult {
  data?: Identifier[];
  validUntil?: ValidUntil;
}

export interface CreateParams<T = any> {
  data: T;
}
export interface CreateResult<RecordType = ResourceRecord> {
  data: RecordType;
  validUntil?: ValidUntil;
}

export interface DeleteParams {
  id: Identifier;
  previousData: ResourceRecord;
}
export interface DeleteResult<RecordType = ResourceRecord> {
  data?: RecordType;
}

export interface DeleteManyParams {
  ids: Identifier[];
}
export interface DeleteManyResult {
  data?: Identifier[];
}

export type DataProviderResult<RecordType = ResourceRecord> =
  | CreateResult<RecordType>
  | DeleteResult<RecordType>
  | DeleteManyResult
  | GetListResult<RecordType>
  | GetManyResult<RecordType>
  | GetManyReferenceResult<RecordType>
  | GetOneResult<RecordType>
  | UpdateResult<RecordType>
  | UpdateManyResult;

export interface SortPayload {
  field: string;
  order: string;
}
export interface FilterPayload {
  [k: string]: any;
}
export interface PaginationPayload {
  page: number;
  perPage: number;
}
export type ValidUntil = Date;

export type Identifier = string | number;

export interface ResourceRecord {
  id?: Identifier;
  [key: string]: any;
}

export type ResourceRecordMap = Record<Identifier, ResourceRecord>;

export type QueryContext = {
  status: QueryStatus;
  error: Error;
};

export interface ListContext<
  RecordType extends ResourceRecord = ResourceRecord,
  FilterType = any
> extends QueryContext {
  data: RecordType[];
  total: number;
  pagination: PaginationPayload;
  sort: SortPayload;
  filter: FilterType;
  setPagination: (newPagination: Partial<PaginationPayload>) => void;
  setSort: (newSort: Partial<SortPayload>) => void;
  setFilter: (newFilter: FilterType) => void;
}

export interface ReferenceInputContext extends UseGetListResult {
  source: string;
}
