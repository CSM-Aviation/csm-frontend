import React from 'react';

const ContactInfo = () => {
    // const departments = [
    //     {
    //         name: 'CHARTER SALES',
    //         email: 'charter@csmaviation.com',
    //         office: '5594929403',
    //         direct: '5598900421',
    //         hours: '24/7 On-Demand'
    //     },
    //     {
    //         name: 'DISPATCH',
    //         email: 'dispatch@csmaviation.com',
    //         office: '5594929403',
    //         direct: '8884359276',
    //         hours: '24/7 Flight Following/Dispatch'
    //     },
    //     {
    //         name: 'ACCOUNTING',
    //         email: 'accounting@csmaviation.com',
    //         office: '5594929403',
    //         direct: '5598900038',
    //         hours: 'Mon - Fri: 7:30 AM - 4:00 PM'
    //     }
    // ];

    const locations = [
        {
            name: 'FRESNO',
            company: 'CSM Aviation',
            airport: 'KFAT',
            office: 'Corporate Office',
            address: '3050 North Winery Ave.',
            city: 'Fresno, CA 93703',
            phone: '8884359276',
            email: 'dispatch@csmaviation.com',
            bgColor: 'bg-deep-blue',
            textColor: 'text-white'
        },
        {
            name: 'VISALIA',
            company: 'CSM Aviation',
            airport: 'KVIS',
            address: '9301 W. Airport Drive',
            city: 'Visalia, CA 93277',
            phone: '8884359276',
            email: 'dispatch@csmaviation.com',
            bgColor: 'bg-electric-blue',
            textColor: 'text-black'
        },
        {
            name: 'MADERA',
            company: 'CSM Aviation',
            airport: 'KMAE',
            address: '4181 Airport Drive',
            city: 'Madera, CA 93277',
            phone: '8884359276',
            email: 'dispatch@csmaviation.com',
            bgColor: 'bg-sky-blue',
            textColor: 'text-black'
        },
        {
            name: 'SACRAMENTO',
            company: 'CSM Aviation',
            airport: 'KMCC',
            address: '3028 Peacekeeper Way',
            city: 'McClellan Park, CA 95652',
            phone: '8884359276',
            email: 'dispatch@csmaviation.com',
            bgColor: 'bg-platinum',
            textColor: 'text-black'
        },
        {
            name: 'RENO',
            company: 'CSM Aviation',
            airport: 'KRNO',
            address: '595 Humboldt St. Suite 100',
            city: 'Reno, NV 89509',
            phone: '8884359276',
            email: 'dispatch@csmaviation.com',
            bgColor: 'bg-charcoal',
            textColor: 'text-white'
        }
    ];

    const formatPhoneNumber = (phoneNumberString: string) => {
        const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return '(' + match[1] + ') ' + match[2] + '-' + match[3];
        }
        return null;
    };

    const getGoogleMapsUrl = (address: string, city: string) => {
        const encodedAddress = encodeURIComponent(`${address}, ${city}`);
        return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    };

    return (
        <div className="w-full">
            <div className="bg-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* {departments.map((dept, index) => (
                            <div key={index} className="text-center text-black">
                                <h3 className="text-xl font-bold mb-4">{dept.name}</h3>
                                <p><a href={`mailto:${dept.email}`} className="hover:underline">{dept.email}</a></p>
                                <p>O: <a href={`tel:+1${dept.office}`} className="hover:underline">{formatPhoneNumber(dept.office)}</a></p>
                                <p>D: <a href={`tel:+1${dept.direct}`} className="hover:underline">{formatPhoneNumber(dept.direct)}</a></p>
                                <p>Hours of Operation:</p>
                                <p>{dept.hours}</p>
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {locations.map((location, index) => (
                    <div key={index} className={`${location.bgColor} ${location.textColor} p-8`}>
                        <h3 className="text-xl font-bold mb-4">{location.name}</h3>
                        <p>{location.company}</p>
                        <p>{location.airport}</p>
                        {location.office && <p>{location.office}</p>}
                        <p>
                            <a
                                href={getGoogleMapsUrl(location.address, location.city)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                            >
                                {location.address}<br />
                                {location.city}
                            </a>
                        </p>
                        <p><a href={`tel:+1${location.phone}`} className="hover:underline">(888) I-FLY-CSM</a></p>
                        <p><a href={`mailto:${location.email}`} className="hover:underline">{location.email}</a></p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContactInfo;