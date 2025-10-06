import React from 'react'

const DashboardCard = ({ children, colSpan = 1, className = "" }) => {
    return (
        <div className={`bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 max-sm:p-3 border border-gray-800 gap-4 col-span-${colSpan} max-sm:col-span-1 ${className}`}>
            {children}
        </div>
    )
}

export default DashboardCard