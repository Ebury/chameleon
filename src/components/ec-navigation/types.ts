export interface NavigationBranding {
  logo: string,
  name: string,
  link?: string,
}

export interface NavigationProps {
  isCollapsed: boolean,
  isCollapsable: boolean,
  branding: NavigationBranding,
  showBrandingLogo?: boolean,
  isResponsive?: boolean,
  isInLightMode?: boolean,
}
