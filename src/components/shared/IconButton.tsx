import { Link } from 'react-router-dom';

interface IconButtonProps {
  label: string;
  href: string;
  color?: string;
  external?: boolean;
}

export default function IconButton({ label, href, color = 'primary', external = false }: IconButtonProps) {
  const buttonContent = (
    <span className="Button_btn_wrap__DW66V false">
      <button className={`fs_18 font_primary fw_400 Button_btn_common_styles__ddJx7 bg_${color}`}>
        <span>{label}</span>
      </button>
    </span>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {buttonContent}
      </a>
    );
  }

  return <Link to={href}>{buttonContent}</Link>;
}
