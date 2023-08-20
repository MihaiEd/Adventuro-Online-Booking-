import { Equal, LessThanOrEqual, Like, MoreThanOrEqual } from 'typeorm';

/**
 * Parse query params
 */
export class QueryParamsParser {
    public async filter(params: any){
        const filteredParams = {};
        delete params.page;
        delete params.limit;

        for(let param in params){
            switch(typeof params[param]){
                case 'string':
                    filteredParams[param] = Like(`%${params[param]}%`);
                    break;
                case 'boolean':
                    filteredParams[param] = Equal(params[param]);
                    break;
                case 'object':
                    if (params.startDate != null) {
                        filteredParams["startDate"] = MoreThanOrEqual(params.startDate);
                        delete params.startDate;
                    }

                    if (params.endDate != null) {
                        filteredParams["endDate"] = LessThanOrEqual(params.endDate);
                        delete params.endDate;
                    }

                    break;
                default:
                    filteredParams[param] = params[param];
                    break;
            }
        }
        return filteredParams;
    }
}
