// import { Types } from 'mongoose';
// export type loginTypes = 'github';
// export type SerializedAXNode = {
//     role: string;
//     name?: string;
//     value?: string | number;
//     description?: string;
//     keyshortcuts?: string;
//     roledescription?: string;
//     valuetext?: string;
//     disabled?: boolean;
//     expanded?: boolean;
//     focused?: boolean;
//     modal?: boolean;
//     multiline?: boolean;
//     multiselectable?: boolean;
//     readonly?: boolean;
//     required?: boolean;
//     selected?: boolean;
//     checked?: boolean | 'mixed';
//     pressed?: boolean | 'mixed';
//     level?: number;
//     valuemin?: number;
//     valuemax?: number;
//     autocomplete?: string;
//     haspopup?: string;
//     children?: SerializedAXNode[];
// };
// export type AccessibilityNode = SerializedAXNode & {
//     compliance?: boolean;
//     complianceDetails?: string;
// };
// export type AccessibilityTree = AccessibilityNode & {
//     role: 'RootWebArea';
//     skipLink?: boolean;
//     h1?: boolean;
// };
// export type PageResults = {
//     _id: string;
//     url: string;
//     tree: AccessibilityTree | null;
//     skipLink: AccessibilityNode | null;
//     h1: string;
//     tabIndex: TabIndexEntry[];
// };
// export interface TabIndexEntry {
//     role: string;
//     name?: string;
// }
// export interface UserInfo {
//     githubId: string;
//     username: string;
//     profileUrl?: string;
//     avatarUrl?: string;
//     projects?: Types.ObjectId[];
// }
// export interface Project {
//     _id: string;
//     userGithubId: string;
//     projectName: string;
//     pages: PageResults[];
// }
// export interface ProjectFormProps {
//     userInfo: UserInfo;
//     selectedProject: Project | null;
//     setSelectedProject: (project: Project | null) => void;
// }
// export interface ProfilePageProps {
//     userInfo: UserInfo;
// }
// export interface MainDashboardProps {
//     userInfo: UserInfo;
// }
// export interface DisplayElementsProps {
//     title: string;
//     children: React.ReactElement[] | React.ReactElement;
//     aside: React.ReactElement;
// }
// export interface ElementProps {
//     node: AccessibilityNode;
// }
// export interface URLInputFormProps {
//     setPageResults: (pageResults: PageResults | null) => void;
// }
// export interface PageFormProps {
//     setPageResults: (pageResults: PageResults | null) => void;
//     pageResults: PageResults | null;
//     selectedProject: Project;
// }
// export interface ProfileFormProps {
//     userInfo: UserInfo;
//     selectedProject: Project | null;
//     setSelectedProject: (project: Project | null) => void;
// }
// export interface FormContainerProps {
//     setPageResults: (pageResults: PageResults | null) => void;
//     pageResults: PageResults | null;
//     userInfo: UserInfo;
// }
// export interface ProfileContainerProps {
//     userInfo: UserInfo;
// }
// export interface DisplayA11yTreeProps {
//     pageResults: PageResults | null;
//     activeTab: string;
// }
// export interface TabNavigationProps {
//     activeTab: string;
//     pageResults: PageResults;
//     handleTabChange: (activeTab: string) => void;
// }
// export interface AccountMenuProps {
//     userInfo: UserInfo;
//     handleLogout: () => void;
// }
// export interface DirectLinkGeneratorProps {
//     pageId: string;
// }
// export interface DBProject {
//     _id: string;
//     userGithubId: string;
//     projectName: string;
//     pages: DBPage[];
// }
// export interface DBPage {
//     _id: string;
//     url: string;
//     tree: string;
//     skipLink: string;
//     h1: string;
//     tabIndex: string[];
// }
