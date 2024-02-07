export interface NavigationBranding {
  logo: string,
  name: string,
}

export interface NavigationProps {
  isCollapsed: boolean,
  isCollapsable: boolean,
  branding: NavigationBranding,
  showBrandingLogo?: boolean,
}
