export class QueryStatusCheck {
    static showData(parsedData: any) {
        const checkStatus = (res: any) => {
            if (res.status >= 200 && res.status < 300) {
                return res;
            }
            return parsedData(res).then((res: any) => {
                throw res;
            });
        };
    }

    static parseJSON(parseJSON: any) {
        parseJSON = (res: any) => (res.json ? res.json() : res);
    }
}
