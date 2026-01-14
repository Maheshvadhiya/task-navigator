# React Native Coding Challenge: Task Navigator

Welcome to the **Task Navigator** coding challenge!  
This challenge will test your React Native skills—including authentication, deep linking, offline caching, testing, and more—using the publicly available [GoRest API](https://gorest.co.in/).

---

## Table of Contents
1. [Overview](#overview)
2. [Requirements](#requirements)
3. [Features to Implement](#features-to-implement)
4. [Technical Details](#technical-details)
5. [Evaluation Criteria](#evaluation-criteria)
6. [Setup & Submission](#setup--submission)
7. [Additional Notes](#additional-notes)

---

## Overview
In this challenge, you’ll build a **React Native** application called **Task Navigator** that interacts with the [GoRest API](https://gorest.co.in/). The primary goal is to demonstrate how you handle:

1. **Authentication** using a Bearer token.  
2. **CRUD operations** on to-do items (fetched from GoRest’s `/todos` endpoint).  
3. **Deep Linking** (open a specific to-do screen via a URL).  
4. **Offline** data access (basic caching, potentially queuing updates offline).  
5. **Testing** (at least some unit tests, additional tests optional).  
6. **UI/UX** best practices in React Native.

By the end of this challenge, we should see a working mobile app with a clean structure, showcasing your knowledge of React Native’s key concepts.

---

## Requirements

### 1. Authentication
- **Bearer Token**:  
  - The app should prompt for a GoRest API token.  
  - Store the token securely (e.g., `AsyncStorage` or a more secure storage library).  
  - Every request to the GoRest endpoints must include the header:  
    ```
    Authorization: Bearer <YOUR_GOREST_TOKEN>
    ```
- **Protected Screens**:  
  - If a token is missing or invalid, redirect the user to a Login/Token screen.

### 2. To-do CRUD
- **List To-dos**: Fetch from `GET /public/v2/todos`.  
- **Create To-do**: `POST /public/v2/todos` with required fields (e.g., `title`, `status`).  
- **Edit To-do**: `PATCH /public/v2/todos/:id`.  
- **Delete To-do**: `DELETE /public/v2/todos/:id`.  
- **UI**: Provide appropriate screens/forms for each operation.

### 3. Deep Linking
- **Basic Deep Linking**:  
  - Configure an app URL scheme, e.g. `tasknavigator://todo/:todoId`.  
  - Opening `tasknavigator://todo/123` should navigate to the detail screen for the to-do with ID `123`.
- **Handling App Launch**:  
  - If the app is backgrounded or closed, it should still handle the link properly when opened.

### 4. Offline Handling
- **Cache**:  
  - Store fetched to-dos in local storage (AsyncStorage or another DB) so previously loaded items are viewable offline.
- **Sync**:  
  - Optional but nice-to-have: If a user creates or edits a to-do while offline, queue the request and send it when back online.

### 5. Testing
- **Unit Tests**:  
  - At least one or two unit tests (e.g., a reducer or a core component) using Jest.
- **Integration or E2E Tests** (Optional):  
  - If you have time, showcase tests that simulate user flows (e.g., logging in, creating a to-do, etc.).

### 6. UI/UX
- **Styling**:  
  - Use any design library (React Native Paper, NativeBase) or custom styles, but keep it consistent and responsive.
- **UX Considerations**:  
  - Handle loading states, error states, and empty states gracefully.  
  - Provide meaningful form validation messages.

---

## Features to Implement

1. **Login/Token Screen**:  
   - A screen where the user inputs their GoRest token.  
   - Validate the token by making a test request or storing it, and then navigate to the main app if valid.

2. **Main Screen (To-do List)**:  
   - Displays a list of existing to-dos from the API.  
   - Provide a button to create a new to-do.

3. **To-do Details Screen**:  
   - Shows detailed information about a single to-do (title, status, etc.).  
   - Option to **Edit** (update status/title) and **Delete** the to-do.
   - This screen should support **deep linking** (e.g., if the user opens `tasknavigator://todo/:id`, go here).

4. **Create/Edit Screen**:  
   - A form to create a new to-do or edit an existing one.  
   - Required fields: `title`, `status`.  
   - Validate inputs (e.g., `title` cannot be empty).

5. **Offline State** (Basic):
   - Cache the to-dos so they remain visible if the app is offline.  
   - If you have extra time, queue offline edits and apply them when online again.

6. **Testing**:  
   - A small suite of tests (unit or integration) showcasing your testing approach.

---

## Technical Details

1. **Platform**: React Native (0.70+ recommended).
2. **Language**: TypeScript or JavaScript—choose whichever you’re comfortable with.
3. **State Management**: Redux, Context + Hooks, or React Query—any robust solution is acceptable.
4. **Networking**: `fetch` or `axios`—use whichever you prefer.
5. **Navigation**: [React Navigation](https://reactnavigation.org/) recommended.
6. **Deep Linking Config**: [React Navigation Deep Linking Guide](https://reactnavigation.org/docs/deep-linking/).
7. **Offline Storage**: 
   - Use [`AsyncStorage`](https://reactnative.dev/docs/asyncstorage) or a similar local database.  
   - Keep it simple unless you want to showcase more advanced solutions.
8. **Testing Tools**: Jest, React Native Testing Library, Detox (optional for E2E).

---

## Evaluation Criteria

Your submission will be evaluated on:
1. **Code Quality & Organization**  
   - Clean, modular structure.  
   - Appropriate file/folder organization.
2. **Correctness & Functionality**  
   - Properly fetching data from GoRest with Bearer token.  
   - CRUD operations working as intended.  
   - Deep linking navigates to the correct screen.  
   - Offline caching works for previously fetched data.
3. **Error Handling & Validation**  
   - Meaningful error messages for network or validation failures.
4. **UI/UX**  
   - Consistent design, responsive layouts, clear user flows.
5. **Testing Approach**  
   - At least basic unit test coverage.  
   - Optional integration/E2E tests are a bonus.
6. **Performance**  
   - Efficient rendering of lists (`FlatList` or similar).  
   - Minimizing unnecessary re-renders.
7. **Documentation**  
   - A clear README explaining setup, usage, and architectural decisions.

---

## Setup & Submission

1. **Clone this Repo** (or start your own).  
2. **Initialize the Project**:  
   ```bash
   npx react-native init TaskNavigator
   cd TaskNavigator
   # or use expo if you prefer


Explanation :- 

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

Install & setup :

   -git clone https://github.com/bhargavjoshi/coding-challenge-task-navigator.git
   -cd coding-challenge-task-navigator
   -npm install
   -cd ios
    pod install
    cd ..
   -run on android : npx react-native run-android
   -run on ios : npx react-native run-ios

 Deep linking :-

   Todo List : 	tasknavigator://todos
   Todo Detail : 	tasknavigator://todo/12
   Edit Todo :	tasknavigator://todo/edit/12


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
   - apis/       # API calls (Axios) create common api function for view,add,edit,delete todo and if token invalid or not get then logout
   - component/  # Reusable UI components (goback, loader, select box, toast, todolist, validation component)
   - constant/   # Theme (add some theme colors)
   - icons/      # Svg icons (add icon using react-native-svg)
   - navigation/ # Navigation setup & deep linking (create common navigation if token then so home otherwise show login page )
   - screen/     # Screens (Login, home(TodoList), TodoDetailList, AddEditTodo)
   - storage/    # AsyncStorage helpers (offline cache) 
   
   