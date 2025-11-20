import { AuthLayout } from './_auth'
import Signin from './_auth/forms/Signin'
import Signup from './_auth/forms/Singup'
import { Home,CreatePost, UpdatePage, SavePost, Profile, People, Explore } from './_root/Pages'
import RootLayout from './_root/RootLayout'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { EditProfile, LikedPosts, Posts } from './components'



function App() {
  return (
   <main className='flex h-screen'>

    <Routes>
      {/* public routes */}

      <Route element={<AuthLayout/>}>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>


      </Route>
   

   
      {/* private routes */}

      <Route  element={<RootLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="/create-post" element={<CreatePost/>} />
      <Route path="/update-post/:postId" element={<UpdatePage/>}/>
      <Route path="/saved" element={<SavePost/>}/>
      <Route path="/profile/:id/*" element={<Profile/>} />
      {/* <Route path="/posts/:id" element={<Posts/>}/> */}
      {/* <Route path="/likePosts/:id" element={<LikedPosts/>}/> */}
      <Route path="/edit-profile/:id" element={<EditProfile/>}/>
      <Route path="/all-users" element={<People/>}/>
      <Route path = "/explore" element = {<Explore/>}/>
      </Route>

    </Routes>

    <ToastContainer/>
   </main>
  )
}

export default App
