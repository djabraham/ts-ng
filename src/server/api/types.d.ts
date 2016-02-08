
declare interface IConfig {
    listen: number;
    proxy: string;
    host: string;
    url: string;
    logging: boolean;
    path: string;
}

declare interface ITypedConfigInfo {
    fullpath: {
        data: string
    }
}
