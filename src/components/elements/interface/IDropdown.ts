import { IDropdownOption } from "./IDropdownOption";

export interface IDropdown {
    options: IDropdownOption[];
    onSelect: (option: IDropdownOption) => void;
    initialValue: IDropdownOption
  }