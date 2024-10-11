// src/app/privacy-policy/page.tsx

import React from 'react';
import Link from 'next/link';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="container text-black mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <div className="prose max-w-none">
                <p>Last updated July 23, 2024</p>

                <p>Thank you for choosing to be part of our community at Paragon Aviation Logistics Inc, dba CSM Aviation, doing business as CSM Aviation (&ldquo;CSM Aviation,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; &ldquo;our&rdquo;). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices regarding your personal information, please contact us at kkears@csmaviation.com.</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">Table of Contents</h2>
                <ol className="list-decimal list-inside">
                    <li><Link href="#what-information">WHAT INFORMATION DO WE COLLECT?</Link></li>
                    <li><Link href="#how-we-use">HOW DO WE USE YOUR INFORMATION?</Link></li>
                    <li><Link href="#information-shared">WILL YOUR INFORMATION BE SHARED WITH ANYONE?</Link></li>
                    <li><Link href="#cookies">DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</Link></li>
                    <li><Link href="#social-logins">HOW DO WE HANDLE YOUR SOCIAL LOGINS?</Link></li>
                    <li><Link href="#data-retention">HOW LONG DO WE KEEP YOUR INFORMATION?</Link></li>
                    <li><Link href="#data-security">HOW DO WE KEEP YOUR INFORMATION SAFE?</Link></li>
                    <li><Link href="#minors">DO WE COLLECT INFORMATION FROM MINORS?</Link></li>
                    <li><Link href="#privacy-rights">WHAT ARE YOUR PRIVACY RIGHTS?</Link></li>
                    <li><Link href="#do-not-track">CONTROLS FOR DO-NOT-TRACK FEATURES</Link></li>
                    <li><Link href="#california-rights">DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</Link></li>
                    <li><Link href="#policy-updates">DO WE MAKE UPDATES TO THIS NOTICE?</Link></li>
                    <li><Link href="#contact-us">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</Link></li>
                    <li><Link href="#review-update-delete">HOW CAN YOU REVIEW, UPDATE OR DELETE THE DATA WE COLLECT FROM YOU?</Link></li>
                    <li><Link href="#sms-opt-out">SMS OPT-OUT</Link></li>
                </ol>

                <h2 id="what-information" className="text-2xl font-semibold mt-6 mb-4">1. WHAT INFORMATION DO WE COLLECT?</h2>
                <p>We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when participating in activities on the Services, or otherwise when you contact us.</p>
                {/* Add more content for this section */}

                <h2 id="how-we-use" className="text-2xl font-semibold mt-6 mb-4">2. HOW DO WE USE YOUR INFORMATION?</h2>
                <p>We use personal information collected via our Services for various business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
                {/* Add more content for this section */}

                <h2 id="information-shared" className="text-2xl font-semibold mt-6 mb-4">3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?</h2>
                <p>CSM Aviation maintains strict privacy policies, ensuring that the personal information of our users and members is not sold, rented, released, or traded to third parties without legal obligation.</p>

                <h2 id="cookies" className="text-2xl font-semibold mt-6 mb-4">4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
                <p>We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.</p>

                {/* Continue with the rest of the sections */}

                <h2 id="sms-opt-out" className="text-2xl font-semibold mt-6 mb-4">15. SMS OPT-OUT</h2>
                <p>If you are receiving text messages from us and wish to stop receiving them, simply respond with either &ldquo;STOP&rdquo; to the number from which you received the message. Once we receive your message, you will no longer receive further text messages from us.</p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;