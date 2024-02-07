export interface UserInfo {
  name: string,
  profileUrl: string,
  gravatar: string,
}

export interface UserInfoProps {
  user: UserInfo,
  isCollapsed?: boolean,
  isCollapsable?: boolean,
}
