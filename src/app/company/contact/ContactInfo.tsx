import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
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
            // address: '3050 North Winery Ave.',
            // city: 'Fresno, CA 93703',
            phone: '8884359276',
            email: 'charter@csmaviation.com',
            bgColor: 'bg-deep-blue',
            textColor: 'text-white'
        },
        {
            name: 'VISALIA',
            company: 'CSM Aviation',
            airport: 'KVIS',
            // address: '9301 W. Airport Drive',
            // city: 'Visalia, CA 93277',
            phone: '8884359276',
            email: 'charter@csmaviation.com',
            bgColor: 'bg-electric-blue',
            textColor: 'text-black'
        },
        {
            name: 'Jackson',
            company: 'CSM Aviation',
            airport: 'KJAC',
            // address: '4181 Airport Drive',
            // city: 'Madera, CA 93277',
            phone: '8884359276',
            email: 'charter@csmaviation.com',
            bgColor: 'bg-[#004080]',
            textColor: 'text-white'
        },

        {
            name: 'Las Vegas',
            company: 'CSM Aviation',
            airport: 'KLAS',
            // address: '4181 Airport Drive',
            // city: 'Madera, CA 93277',
            phone: '8884359276',
            email: 'charter@csmaviation.com',
            bgColor: 'bg-sky-blue',
            textColor: 'text-black'
        },
        {
            name: 'SACRAMENTO',
            company: 'CSM Aviation',
            airport: 'KMCC',
            // address: '3028 Peacekeeper Way',
            // city: 'McClellan Park, CA 95652',
            phone: '8884359276',
            email: 'charter@csmaviation.com',
            bgColor: 'bg-platinum',
            textColor: 'text-black'
        },
        {
            name: 'RENO',
            company: 'CSM Aviation',
            airport: 'KRNO',
            // address: '595 Humboldt St. Suite 100',
            // city: 'Reno, NV 89509',
            phone: '8884359276',
            email: 'charter@csmaviation.com',
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
        <div className=" ">
            {/* Fresno section */}
            <div className="bg-gradient-to-br from-deep-blue to-sky-700 text-white p-12  shadow-xl mb-8">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-4xl font-bold mb-6 text-center">FRESNO</h2>
                            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-2xl font-semibold mb-4">CSM Aviation</h3>
                                        <p className="text-lg mb-2">Corporate Office</p>
                                        <p className="flex items-center mb-2">
                                            <MapPin className="mr-2" size={20} />
                                            KFAT
                                        </p>
                                        <p><a href={`tel:+18884359276`} className="hover:underline">(888) I-FLY-CSM</a></p>
                                        <p><a href={`mailto:charter@csmaviation.com`} className="hover:underline">charter@csmaviation.com</a></p>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    </div>


            {/* Other locations */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 mt-1 gap-0 ">
                {locations.slice(1).map((location, index) => (
                    <div key={index} className={`${location.bgColor} ${location.textColor} p-8`}>
                        <h3 className="text-xl font-bold mb-4">{location.name}</h3>
                        <p>{location.company}</p>
                        <div className='flex'>
                        <MapPin className="mr-2" size={20} />
                        <p>{location.airport}</p>
                        </div>
                       
                        {location.office && <p>{location.office}</p>}
                        <p><a href={`tel:+1${location.phone}`} className="hover:underline">(888) I-FLY-CSM</a></p>
                        <p><a href={`mailto:${location.email}`} className="hover:underline">{location.email}</a></p>
                    </div>
                ))}
            </div>
        </div>
    </div>
</div>

    );
};

export default ContactInfo;