export interface ProductFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  borderColor: string;
  href?: string;
  onClick?: () => void;
}

export interface ProductDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export interface MobileProductCardsProps {
  isOpen: boolean;
  className?: string;
  onClose?: () => void;
}
