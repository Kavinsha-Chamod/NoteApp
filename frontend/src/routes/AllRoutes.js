import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from '../pages/LoginPage/LoginPage'
import RegisterPage from '../pages/RegisterPage/RegisterPage'
import NotesPage from '../pages/NotesPage/NotesPage'

export default function AllRoutes() {
  return (
    <Routes>
    <Route path='/' element={<Navigate to ='/login'/>}/>
    <Route path='/login' element={<LoginPage/>}/>
    <Route path='/register' element={<RegisterPage/>}/>
    <Route path='/notes' element={<NotesPage/>}/>
    </Routes>
  )
}
