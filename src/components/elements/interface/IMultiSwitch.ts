export interface IMultiSwitch {
    onCallback: (value: string) => void;
    initialValue: string;
    values: string[];
}