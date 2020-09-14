import {IRecipe} from './recipe';

export interface IPagination {
    pageIndex: number;
    pageSize: number;
    count: number;
    data: IRecipe[];
}