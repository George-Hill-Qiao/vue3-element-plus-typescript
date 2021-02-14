import request from '../utils/request'
import { ListQuery, IdQuery, TableList } from '../typings'

export function getList<T> (params: ListQuery) {
  return request.get<T, T>(`/getList?pageNo=${params.pageNo}&pageSize=${params.pageSize}&goodsName=${params.goodsName}`)
}
export function deleteItem<T> (params: IdQuery) {
  return request.get<T, T>(`/deleteItem?id=${params.id}`)
}
export function addItem<T> (params: TableList) {
  return request.put<T, T>('/addItem', params)
}
export function updateItem<T> (params: TableList) {
  return request.post<T, T>('/updateItem', params)
}
