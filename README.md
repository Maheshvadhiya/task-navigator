
Explanation :- 

Install & setup :

   -git clone https://github.com/Maheshvadhiya/task-navigator
   -cd task-navigator
   -npm install
   -cd ios
    pod install
    cd ..
   -run on android : npx react-native run-android
   -run on ios : npx react-native run-ios

Tech Stack :

   React Native CLI (version 0.83.0)
   TypeScript
   React Navigation
   Axios
   AsyncStorage
   NetInfo
   React Hook Form
   SVG Icons
   Toast Massages
   Dropdown (react-native-select-dropdown)

Features :

   View todo list
   Add new todo
   Edit existing todo
   Delete todo
   View todo details
   Offline support (cached data)
   Deep linking support
   Pull-to-refresh
   Clean & modular architecture

 Deep linking :-

   Todo List : 	e.g : tasknavigator://todos
   Todo Detail : 	e.g : tasknavigator://todo/12
   Edit Todo :	   e.g : tasknavigator://todo/edit/12


Offline Support :-

   Implemented:
      -Todos are cached locally using AsyncStorage
      -If the device is offline:
      -Cached todos are displayed in home screen (TodoList)
      -Cached todo details are shown on todo detail screen
      -User is notified via toast
      -When delete to then store in AsyncStorage and when online then call api then delete this todo from api

   Not Implemented:
      -edit and add todo are not implemented for offline

Login to App :-

   Enter GoRest API Token 
   (e.g 6b01cd4869dc79104d7e99641d4623048c6dc1162b0fb320fa773631109c4e63)
   then click login 


Architecture Overview :-

   src/
   │
   ├── apis/         # Centralized Axios API layer
   │                 # - Common functions for View, Add, Edit, Delete Todos
   │                 # - Handles Bearer token injection
   │                 # - Auto-logout on token expiry or invalid token
   │
   ├── component/    # Reusable UI components
   │                 # - GoBack button
   │                 # - Loader / Spinner
   │                 # - Select Box
   │                 # - Toast Notifications
   │                 # - Todo List UI
   │                 # - Validation Components
   │
   ├── constant/     # App-wide constants
   │                 # - Theme colors
   │
   ├── icons/        # SVG icons
   │                 # - Implemented using react-native-svg
   │                 # - Centralized icon management
   │
   ├── navigation/   # Navigation & Deep Linking
   │                 # - Auth-based navigation flow
   │                 # - Redirects to Home if token exists
   │                 # - Redirects to Login if token is missing/invalid
   │                 # - Deep linking configuration
   │
   ├── screen/       # Application screens
   │                 # - Login
   │                 # - Home (Todo List)
   │                 # - Todo Detail
   │                 # - Add / Edit Todo
   │
   ├── storage/      # Local storage utilities
   │                 # - AsyncStorage helpers
   │                 # - Offline caching support