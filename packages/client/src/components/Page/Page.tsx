import React, { useEffect } from 'react';

export interface PageProps {
  type: string;
  title: string
}

export const Page: React.FunctionComponent<PageProps> = ({
  type,
  title,
  children
}) => {

  // Update the window title
  useEffect(() => {
    window.document.title = title
  }, [title])
  return <main className={`page ${type}`}>
    {children}
  </main>
}
