# 📸 Zengram — Modern Social Media Application

Zengram is a fully-featured social media platform built with React and Appwrite.  
Users can upload posts, edit/delete posts, like content, save posts, update profiles, and browse an infinite scrolling feed.  
The app uses React Query for server state, Formik + Yup for form handling, and Chakra UI + Tailwind CSS for a clean design system.

---

## 🚀 Features

### 📤 Post Management
- Upload image posts with captions  
- Edit posts  
- Delete posts  
- Drag & drop upload using **React Dropzone**

### ❤️ User Interaction
- Like / Unlike posts  
- Save / Unsave posts  
- View saved posts  
- Real-time UI updates with **React Query**

### 👤 User Profile
- Edit profile (username, bio, avatar, etc.)  
- View all posts created by the user  
- Manage saved posts

### 🔄 Infinite Scrolling
- Smooth infinite scroll built using:  
  - **react-intersection-observer**  
  - **useInfiniteQuery**

### 📝 Form Handling
- Formik for creating forms  
- Yup for validation rules  
- Clean & accessible UX

### 🎨 UI/Design
- Chakra UI components  
- Tailwind CSS for utility styling  
- Fully responsive layout

---

## 🧰 Tech Stack

### 🖥️ Frontend
- ⚛️ React  
- 🔍 React Query (TanStack Query)  
- 👀 React Intersection Observer  
- 📁 React Dropzone  
- 📝 Formik + Yup  
- 🌈 Chakra UI  
- 🎨 Tailwind CSS  

### 🏗️ Backend
- 🛠️ Appwrite (Auth, Database, Storage)

### 🔧 Other Tools
- 🐙 Git & GitHub  
- ▲ Vercel (Deployment)

---

## 📦 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/bikash-kumar-kc/zengram.git
```
2. Navigate to the project folder:
``` bash
cd snapgram
```
3.Install dependencies:
``` bash
npm install
```
4.Add Environment Variables:
``` bash
VITE_APPWRITE_ENDPOINT = appwrite endpoint here
VITE_APPWRITE_PROJECT_ID = your project's project id here
VITE_APPWRITE_DATABASE_ID= your project's database id here
VITE_APPWRITE_STORAGE_ID= your project's storage id here
VITE_APPWRITE_USER_COLLECTION_ID= your database's user collection id here (for saving user information)
VITE_APPWRITE_POST_COLLECTION_ID= your databse's post collection id here (for saving posts)
VITIE_APPWRITE_SAVES_COLLECTION_ID= your database's saves collection id here(for saving saved posts)
```
5.Start the development server:
``` bash
npm start
```

## 🔗 Usage

- Log in or sign up with Appwrite
- Create, edit, delete, and explore posts
- Like and save your favorite posts
- Enjoy smooth infinite scrolling
- Update profile details
- Experience fast UI updates through React Query

## 📄 License
This project is licensed under the MIT License.

