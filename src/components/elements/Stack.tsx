import React from 'react'
import { twMerge } from 'tailwind-merge'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Stack = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={twMerge(
        'grid grid-cols-3 grid-rows-1 w-full h-full',
        className
      )}
      {...props}
    >
      {React.Children.map(
        children,
        (child: React.ReactNode): React.ReactNode => {
          if (React.isValidElement(child)) {
            const modifiedClassName = twMerge(
              child.props.className,
              'row-start-1 row-end-1 col-start-1 col-end-[-1] z-10'
            )

            return React.cloneElement(child, {
              className: modifiedClassName,
            } as React.HTMLAttributes<HTMLElement>)
          } else
            throw new Error('Stack error: this child is not a valid element.')
        }
      )}
    </div>
  )
}

export default Stack