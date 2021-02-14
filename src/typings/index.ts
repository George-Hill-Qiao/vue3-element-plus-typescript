export interface TableList {
    id: string;
    goodsName: string;
    englishName: string;
    shortName: string;
    goodsDesc: string;
    goodsbrand: string;
    goodsSpec: string;
}
export interface ListQuery {
    pageNo: number;
    pageSize: number;
    goodsName?: string;
}
export interface IdQuery {
    id: string;
}
export interface DataList {
    code: string;
    msg: string;
    data: {
        list: TableList[];
        ageNo: string;
        pageSize: string;
        totalCount: number;
    };
}
