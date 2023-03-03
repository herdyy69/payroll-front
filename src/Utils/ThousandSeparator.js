import React from 'react'

const ThousandSeparator = ({ money }) => {
  return (
    <span>
      {new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(money)}
    </span>
  )
}

export default ThousandSeparator
