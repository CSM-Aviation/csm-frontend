'use client'
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
        <div className="absolute top-29 md:mt-5  w-1/5  z-10 px-4 py-4 " aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-2">
                {pathSegments.map((segment, index) => {
                    const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathSegments.length - 1;
                    return (
                        <React.Fragment key={segment}>
                            {index > 0 && <span className="text-black text-lg">/</span>}
                            <li>
                                <Link
                                    href={href}
                                    className={`md:text-3xl  font-medium ${
                                        isLast ? 'text-black cursor-default' : 'text-black hover:text-red-500'
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
        </div>
    );
};

export default Breadcrumb;