import React, { FC } from 'react';

import '../styles/components/shimmer.css'

const Shimmer: FC = ({ children }) => {
  return (
    <div className="shimmer-effect-component">
      { children }
    </div>
  )
}

export default Shimmer