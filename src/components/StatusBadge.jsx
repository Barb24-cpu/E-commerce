import React from 'react';

export default function StatusBadge({ status ="Protected" }) {
    return (
        <span classname="text-xs bg-amber-50 text-amber-800 border border-amber-200/60 px-2.5 py-1 rounded-full font-medium shadow-xs">
            {status}
        </span>
    );
}