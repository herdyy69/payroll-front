import React, { useEffect, useState } from 'react'
import { CiWarning } from 'react-icons/ci'

const InputError = ({ messages = [], className = '' }) => {
  return (
    <>
      {messages.length > 0 && (
        <>
          {messages.map((message, index) => (
            <div id="toast-container" className={`toast toast-top toast-end`}>
              <div
                key={index}
                className="alert alert-info bg-red-600 text-white text-sm">
                <div>
                  <CiWarning className="w-6 h-6" />
                  <span>
                    {message === 'These credentials do not match our records.'
                      ? 'Email atau password salah'
                      : message}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  )
}

export default InputError
