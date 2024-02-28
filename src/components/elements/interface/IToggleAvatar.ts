export interface IToggleAvatar {
  src: string;
  alt: string;
  isOpen: boolean;
  onToggle: () => void;
}