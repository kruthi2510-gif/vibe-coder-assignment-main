Changes Made

1. Add to List Functionality
- Implemented the "Add to List" feature.
- Used Zustand to store selected creators.
- Added functionality to add creators from both the Search page and Profile Detail page.

2. Selected Profiles Sidebar
- Created a sidebar to display all selected creators.
- Displayed creator profile picture, name and username.
- Added a count showing the number of selected creators.
- Added an empty state when no creators are selected.

3. Remove Selected Profiles
- Added functionality to remove creators from the selected list.
- Updated the UI immediately after removing a creator.

4. Prevent Duplicate Profiles
- Prevented users from adding the same creator multiple times.
- Disabled the "Add to List" button once a creator has already been added.
- Displayed an alert message if the user tries to add an existing creator again.

5. Persist Selected Profiles
- Stored selected creators using localStorage.
- Restored the selected list automatically after refreshing the page.

6. Search Page Improvements
- Improved spacing and layout.
- Redesigned the selected profiles panel.
- Added profile images to the sidebar.
- Improved the styling of buttons and cards.
- Updated typography and overall visual consistency.

7. Profile Detail Page Improvements
- Redesigned the profile details page.
- Displayed creator information including:
  - Followers
  - Engagement Rate
  - Posts
  - Average Likes
  - Average Comments
  - Average Views
- Added a direct link to the creator's original profile.
- Updated the Add to List button state based on whether the creator is already selected.

8. Loading and Unavailable States
- Added a loading screen while profile data is being fetched.
- Added a "Coming Soon" page for creators whose detailed information is currently unavailable.

9. General Improvements
- Improved UI consistency across the application.
- Updated layouts to make the application cleaner and easier to use.
- Fixed state management issues and improved user experience.
