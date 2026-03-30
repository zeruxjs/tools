import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";
import { useThemeSettings } from "@/utils/theme/ThemeContext";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "220px",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
}));

const Logo = () => {
  const { currentMode } = useThemeSettings();
  
  // dark-logo.svg is for light mode (black text)
  // light-logo.svg is for dark mode (white text)
  const logoSrc = currentMode === 'dark' ? "/images/logos/light-logo.svg" : "/images/logos/dark-logo.svg";

  return (
    <LinkStyled href="/">
      <Image src={logoSrc} alt="logo" height={40} width={220} priority />
    </LinkStyled>
  );
};

export default Logo;
