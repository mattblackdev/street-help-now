import React from 'react'

export const Show: React.FC<{ when: boolean }> = ({ when, children }) => {
  if (!when) return null
  return <>{children}</>
}
