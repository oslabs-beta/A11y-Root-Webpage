# CSS Style Guide

This document is intended to guide future developers during the onboarding and iteration process. Please continue to add and appropriately adjust notes within this style guide so that others may easily navigate and debug the css files.

# Tips:

- If you don't have any styling tools, use a border to find your current container for easy debugging, e.g. add for visual testing to element's css => border: 3px solid red;
- If using external tools (such as MUI or React ARIA Components) scroll to section below for notes.

# Styling Hierarchy (in order of highest precedence):

!important Declaration > Inline Style > ID Selector > Class Selector > Tag Selector > Universal

    Hierarchy Examples:
      !important Declaration => p { color: black !important; }
      ID Selector => #id
      Class/Pseudo-class Selector => .class
      Tag Selector => div or p
      Universal Selector => *

# Reset Browser Styles & Apply Custom Default Styles

- Responsive designs for mobile, tablet, and all other screens are first set in [index.css].
- Important Explanations:
  -> 1rem === 10px | root em (rem) is set to 10px to easily adjust and avoid overtly large sizing; if you adjust the [rem] or [em] keep in mind that it is currently affecting the sizing of font, padding, margin, & many other types of elements, therefore the overall layout as well.
  -> box-sizing model to border-box for all elements, making element width and height calculations more predictable by including padding and borders in the specified width and height.
  -> In the [body], max-height is set to 100vh (the entire viewport's height) and max-width is set to 100% (the full parent element's (html's) width; we use '%' instead of 'vw' in this case, to avoid the potential horizontal scroll bar that will appear if the height expands past the 'vh'. This occurs because the vertical scroll bar takes up an additional 10px of width, making the 'vw' wider.)

# Considerations Per Styling Tool

# MUI

- mui elements have a built in class. Therefore, you need to use an ID to call on it

# React ARIA Components

- These elements have a built in class that can be overridden to be called on; use the class attribute to customize.
- For Flexbox and Grid effects, be mindful that some parts of the elements won't be targeted since they don't exist within the container; confirm by inspecting elements with the Chrome developer tools.

# Responsive Design Requirements

# WCAG Level A Requirements

- 44px | min-width & min-height for touch-friendly targets, such as buttons.
