"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumb: React.FC = () => {
    const pathname = usePathname();
    const pathSegments = pathname.split('/').filter(segment => segment);

    if (pathSegments.length === 0) {
        return null; // Hide breadcrumb on home page
    }

    return (
        <nav className="flex container mx-auto px-4 py-4" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
                {pathSegments.map((segment, index) => {
                    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathSegments.length - 1;
                    return (
                        <React.Fragment key={segment}>
                            {index > 0 && <span className="text-gray-400 text-lg">/</span>}
                            <li>
                                <Link
                                    href={href}
                                    className={`text-lg font-medium ${isLast ? 'text-gray-500 cursor-default' : 'text-[#004080] hover:text-electric-blue'
                                        }`}
                                    aria-current={isLast ? 'page' : undefined}
                                >
                                    {segment.toUpperCase().replace(/-/g, ' ')}
                                </Link>
                            </li>
                        </React.Fragment>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;