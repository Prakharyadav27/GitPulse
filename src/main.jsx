import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Graph from './components/About/Graph.jsx'
import Contributor from './components/About/Contributor.jsx'
import ViewRepo from './components/About/ViewRepo.jsx'

import User from './components/User/User.jsx'
import Contact from './components/contact/Contact.jsx'
import { ChakraProvider } from '@chakra-ui/react'

// const router = createBrowserRouter([
//   {
//     path:'/',
//     element: <Layout />,
//     children: [
//       {
//         path:'',
//         element:<Home/>
//       },
//       {
//         path:'about',
//         element:<About/>
//       }
    

//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
   < Route path='/' element = {<Layout/>}>
    <Route path='' element={<Home/>} />
    <Route path='about' element={<About/>} />
    <Route path="/about/:username" element={<About />} />
    <Route path='user' element={<User/>} />
    <Route path='contact' element={<Contact/>} />
    <Route path='/Graph/:username/:repoName' element={<Graph/>} />
    <Route path='/Contributor/:username/:repoName' element={<Contributor/>} />
    <Route path='/ViewRepo/:username/:repoName' element={<ViewRepo/>} />


    {/* <Route path="/graph/:repo" element={<About />} /> */}
   </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
   <RouterProvider router = {router}/>
    </ChakraProvider>
  </React.StrictMode>,
)
