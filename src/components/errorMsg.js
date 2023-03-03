import React from 'react'

const errorMsg = () => {
  return (
    <div class="toast toast-top toast-end" role="alert">
      <div class="alert alert-info bg-red-600 text-white text-sm">
        <strong class="font-bold">Whoops!</strong>
        <span class="block sm:inline">
          There were some problems with your input.
        </span>
      </div>
    </div>
  )
}

export default errorMsg
