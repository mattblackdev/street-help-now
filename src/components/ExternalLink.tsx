import React from 'react'

export const ExternalLink: React.FC<{ to: string; className?: string }> = ({
  to,
  className,
  children,
}) => {
  return (
    <a
      className={className}
      href={to}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}
