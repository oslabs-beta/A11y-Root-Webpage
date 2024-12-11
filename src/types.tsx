import { Types } from 'mongoose';

export type SerializedAXNode = {
  role: string; // The role of the node
  name?: string; // The accessible name of the node
  value?: string | number; // The accessible value of the node
  description?: string; // The accessible description of the node
  keyshortcuts?: string; // Keyboard shortcuts associated with the node
  roledescription?: string; // A description of the role
  valuetext?: string; // The text alternative of a value
  disabled?: boolean; // Whether the node is disabled
  expanded?: boolean; // Whether the node is expanded
  focused?: boolean; // Whether the node is focused
  modal?: boolean; // Whether the node is a modal
  multiline?: boolean; // Whether the node supports multiline text
  multiselectable?: boolean; // Whether the node supports multiple selections
  readonly?: boolean; // Whether the node is read-only
  required?: boolean; // Whether the node is required
  selected?: boolean; // Whether the node is selected
  checked?: boolean | 'mixed'; // Whether the node is checked, or mixed for tri-state checkboxes
  pressed?: boolean | 'mixed'; // Whether the node is pressed, or mixed for toggle buttons
  level?: number; // The level of the node in a hierarchy
  valuemin?: number; // The minimum value for the node
  valuemax?: number; // The maximum value for the node
  autocomplete?: string; // Autocomplete hints for text input nodes
  haspopup?: string; // The type of popup triggered by the node
  children?: SerializedAXNode[]; // Children of this node in the accessibility tree
};

//add additional properties to the SerializedAXNode to create our AccessibilityNode
export type AccessibilityNode = SerializedAXNode & {
  compliance?: boolean; // Optional: Indicates compliance status
  complianceDetails?: string; // Optional: Additional details about compliance
};

//add additional properties to the AccessibilityNode to create our AccessibilityTree
export type AccessibilityTree = AccessibilityNode & {
  role: 'RootWebArea';
  skipLink?: boolean; // flag for if tree contains a skipLink
  h1?: boolean; // flag for if tree contains one unique h1 (placed above main content)
};

export type PageResults = {
  url: string; // The URL of the analyzed page
  tree: AccessibilityTree | null; // The accessibility tree
  skipLink: AccessibilityNode | null; // Information about skip links
  h1: string; // Information about the main heading (h1)
  tabIndex: TabIndexEntry[]; // List of tab index entries
};

// Supporting interfaces

export interface TabIndexEntry {
  role: string;
  name?: string;
}

export interface UserInfo {
  githubId: string; // Required and unique
  username: string; // Required
  profileUrl?: string; // Optional
  avatarUrl?: string; // Optional
  projects?: Types.ObjectId[]; // Array of ObjectIds referencing the 'Project' collection
}

export interface Project {
  _id: string;
  userGithubId: string;
  projectName: string;
  pages: PageResults[];
}

//prop passing interfaces
export interface ProjectFormProps {
  userInfo: UserInfo;
}

export interface MainDashboardProps {
  userInfo: UserInfo;
}

export interface DisplayElementsProps {
  title: string;
  children: React.ReactElement[] | React.ReactElement;
  aside: React.ReactElement;
}

export interface ElementProps {
  node: AccessibilityNode;
}

export interface URLInputFormProps {
  setPageResults: (pageResults: PageResults) => void;
}

export interface PageFormProps {
  setPageResults: (pageResults: PageResults) => void;
}

export interface FormContainerProps {
  setPageResults: (pageResults: PageResults) => void;
  userInfo: UserInfo;
}

export interface DisplayA11yTreeProps {
  pageResults: PageResults | null;
  activeTab: string;
}

export interface TabNavigationProps {
  activeTab: string;
  pageResults: PageResults;
  handleTabChange: (activeTab: string) => void;
}
