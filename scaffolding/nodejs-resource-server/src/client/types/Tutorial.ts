export default interface Tutorial {
    id: null;
    title: string;
    description: string;
    published: boolean;
}

export interface RowClickArg {
    row: Tutorial;
    renderRowIndex: number;
    flattenRowIndex: number;
}