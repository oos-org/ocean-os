export type TDrop = {
    id: string;
    content: any;
    metas: TMeta[];
}

export type TMeta = {
    id?: string;
    type:string;
    value:string;
}

export interface MetasState {
    metas: TMeta[];
    addMetas: () => void;
    metaTypes: () => string[];
    getMetasType: (type:string) => TMeta[]
}

export interface DropsState {
    drops: TDrop[];
    addDrop: (drop:TDrop) => void;
}

export interface MenuItem {
    name: string;
    url?: string;
    icon?: string;
    avatar?: string;
    items?: MenuItem[];
}