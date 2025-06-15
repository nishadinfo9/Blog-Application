import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-base-200 text-center py-6 text-sm text-gray-500">
      <p>© {new Date().getFullYear()} BlogApp. All rights reserved.</p>
    </footer>
  )
}

export default Footer