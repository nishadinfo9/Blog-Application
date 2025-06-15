import React from 'react'

const Textaeria = ({label, className='', ...props}) => {
  return (
    <div className="form-control">
          <label className="label">
            <span className="label-text text-white">{label}</span>
          </label>
          <textarea
          {...props}
            // placeholder="Write your content here..."
            className={`textarea textarea-bordered w-full bg-gray-700 text-white min-h-[120px]${className}`}
          />
        </div>
  )
}

export default Textaeria