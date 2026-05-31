/**
 * Privacy policy — ported verbatim from the live site
 * (csmaviation.com/privacy-policy). Legal copy; edit only with counsel.
 */

export type ListItem = string | { label?: string; text: string };

export type PrivacyBlock =
  | { type: "p"; text: string; label?: string }
  | { type: "inShort"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: ListItem[] }
  | { type: "table"; columns: string[]; rows: string[][] };

export interface PrivacySection {
  id: string;
  heading: string;
  blocks: PrivacyBlock[];
}

export const privacy = {
  updated: "July 23, 2024",

  intro: [
    'Thank you for choosing to be part of our community at Paragon Aviation Logistics Inc, dba CSM Aviation ("CSM Aviation," "we," "us," "our"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice or our practices regarding your personal information, please contact us at kkears@csmaviation.com.',
    'When you visit our website csmaviation.com (the "Website"), use our mobile application (the "App"), and more generally, use any of our services (the "Services," which include the Website and App), we appreciate that you are trusting us with your personal information. We take your privacy very seriously. In this privacy notice, we seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it. We hope you take some time to read through it carefully, as it is important. If there are any terms in this privacy notice that you do not agree with, please discontinue use of our Services immediately.',
    "This privacy notice applies to all information collected through our Services (which, as described above, includes our Website and App), as well as any related services, sales, marketing, or events.",
  ],

  sections: [
    {
      id: "what-we-collect",
      heading: "1. What information do we collect?",
      blocks: [
        { type: "h3", text: "Personal information you disclose to us" },
        { type: "inShort", text: "We collect personal information that you provide to us." },
        {
          type: "p",
          text: "We collect personal information that you voluntarily provide us when you register on the Services, express an interest in obtaining information about us or our products and Services when participating in activities on the Services, or otherwise when you contact us.",
        },
        {
          type: "p",
          text: 'In compliance with new CPRA regulations, CSM Aviation allows you to "Opt out of Sharing Personal Information" via the form at the bottom of this page.',
        },
        {
          type: "p",
          text: "The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:",
        },
        {
          type: "p",
          label: "Personal Information Provided by You.",
          text: "We collect names, phone numbers, email addresses, contact preferences, contact or authentication data, online interests and behaviors, and other similar information.",
        },
        {
          type: "p",
          label: "Social Media Login Data.",
          text: 'We may offer you the option to register with us using your existing social media account details, such as your Facebook, Twitter, or other social media account. If you choose to register this way, we will collect the information described in the section "How do we handle your social logins?" below.',
        },
        {
          type: "p",
          text: "All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.",
        },

        { type: "h3", text: "Information automatically collected" },
        {
          type: "inShort",
          text: "Some information—such as your Internet Protocol (IP) address and/or browser and device characteristics—is collected automatically when you visit our Services.",
        },
        {
          type: "p",
          text: "We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name and ID, country, location, information about how and when you use our Services and other technical information. This information is primarily needed to maintain the security and operation of our Services, as well as for our internal analytics and reporting purposes. No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.",
        },
        {
          type: "p",
          text: "Like many businesses, we also collect information through cookies and similar technologies. The information we collect includes:",
        },
        {
          type: "list",
          items: [
            {
              label: "Log and Usage Data.",
              text: 'Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages, and files viewed, searches and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called "crash dumps") and hardware settings).',
            },
            {
              label: "Device Data.",
              text: "We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.",
            },
            {
              label: "Location Data.",
              text: "We collect location data, such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling the location setting on your device. Note, however, that if you choose to opt-out, you may not be able to use certain aspects of the Services.",
            },
            {
              label: "Google Analytics 4.",
              text: "When someone visits our Website, we use a third-party service, Google Analytics, to collect standard internet log information and details of visitor behavior patterns. We do this to determine the number of visitors to the various parts of the site. This information is only processed in a way that does not identify anyone. Based on GDPR guidelines, we do not make and do not allow Google to make any attempt to find out the identities of those visiting our website.",
            },
          ],
        },

        { type: "h3", text: "Information collected through our App" },
        {
          type: "inShort",
          text: "We collect information regarding your geolocation and mobile device and push notifications when you use our app.",
        },
        { type: "p", text: "If you use our App, we also collect the following information:" },
        {
          type: "list",
          items: [
            {
              label: "Geolocation Information.",
              text: "We may request access or permission to track location-based information from your mobile device, either continuously or while you are using our App, to provide certain location-based services. You may do so in your device's settings if you wish to change our access or permissions.",
            },
            {
              label: "Mobile Device Access.",
              text: "We may request access or permission to certain features from your mobile device, including your mobile device's reminders, SMS messages, social media accounts, and other features. You may do so in your device's settings if you wish to change our access or permissions.",
            },
            {
              label: "Mobile Device Data.",
              text: "We automatically collect device information (such as your mobile device ID, model, and manufacturer), operating system, version information and system configuration information, device and application identification numbers, browser type and version, hardware model, Internet service provider and/or mobile carrier, and Internet Protocol (IP) address (or proxy server). If you are using our App, we may also collect information about the phone network associated with your mobile device, your mobile device's operating system or platform, the type of mobile device you use, your mobile device's unique device ID, and information about the features of our App you accessed.",
            },
            {
              label: "Push Notifications.",
              text: "We may request that you send push notifications regarding your account or certain app features. If you wish to opt out of receiving these types of communications, you may turn them off in your device's settings.",
            },
          ],
        },
        {
          type: "p",
          text: "This information is primarily needed to maintain the security and operation of our App, troubleshoot, and conduct internal analytics and reporting.",
        },

        { type: "h3", text: "Information collected from other sources" },
        {
          type: "inShort",
          text: "We may collect limited data from public databases, marketing partners, social media platforms, and other outside sources.",
        },
        {
          type: "p",
          text: "To enhance our ability to provide relevant marketing, offers, and services to you and update our records, we may obtain information about you from other sources, such as public databases, joint marketing partners, affiliate programs, data providers, social media platforms, as well as from other third parties. This information includes mailing addresses, job titles, email addresses, phone numbers, intent data (or user behavior data), Internet Protocol (IP) addresses, social media profiles, social media URLs, and custom profiles for purposes of targeted advertising and event promotion. If you interact with us on a social media platform using your social media account (e.g., Facebook or Twitter), we receive personal information about you, such as your name, email address, and gender. Any personal information that we collect from your social media account depends on your social media account's privacy settings.",
        },

        { type: "h3", text: "Mailing Lists & Web Form Submissions" },
        {
          type: "p",
          text: "As part of the registration process on our Websites, we collect Personal Information. We use that Personal Information for a couple of reasons: to tell you about products and services you've asked us to tell you about; to contact you if we need to obtain or provide additional information; to check our records are correct; and to check every now and then that you're happy and satisfied with the services that we provide.",
        },
        {
          type: "p",
          text: "CSM Aviation does not rent, trade, or sell our email lists to other organizations and businesses. We use a third-party provider, Constant Contact, to deliver information to you. We gather statistics around email openings and clicks using industry-standard technologies to help us monitor and improve our communications.",
        },
        {
          type: "p",
          text: "You can unsubscribe to our email mailings at any time by clicking the unsubscribe link at the bottom of any of our emails sent to you.",
        },
      ],
    },
    {
      id: "how-we-use",
      heading: "2. How do we use your information?",
      blocks: [
        {
          type: "inShort",
          text: "We process your information for purposes based on our legitimate business interests, the fulfillment of our contract with you, compliance with our legal obligations, and/or your consent.",
        },
        {
          type: "p",
          text: "We use personal information collected via our Services for various business purposes, as described below. We process your personal information for these purposes in reliance on our legitimate business interests to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We indicate the specific processing grounds we rely on next to each purpose listed below.",
        },
        { type: "p", text: "We use the information we collect or receive:" },
        {
          type: "list",
          items: [
            'To facilitate account creation and logon. If you choose to link your account with us to a third-party account (such as your Google or Facebook account), we use the information you allowed us to collect from those third parties to facilitate account creation and logon for the performance of the contract.',
            "To post testimonials. We post testimonials that may contain personal information about our Services. Before posting a testimonial, we will obtain your consent to use your name and the content of the testimonial. If you wish to update or delete your testimonial, please contact us at kkears@csmaviation.com, and be sure to include your name, testimonial location, and contact information.",
            "Request feedback. We may use your information to request feedback and to contact you about your use of our Services.",
            "To enable user-to-user communications. We may use your information to enable user-to-user communications with each user's consent.",
            "To manage user accounts. We may use your information to manage your account and keep it in working order.",
            "To send administrative information to you. We may use your personal information to send you product, service, and new feature information and/or information about changes to our terms, conditions, and policies.",
            "To protect our Services. We may use your information as part of our efforts to keep our Services safe and secure (for example, for fraud monitoring and prevention).",
            "To enforce our terms, conditions, and policies for business purposes, to comply with legal and regulatory requirements, or in connection with our contract.",
            "To respond to legal requests and prevent harm. If we receive a subpoena or other legal request, we may need to inspect the data we hold to determine how to respond.",
            "To send you marketing and promotional communications. We may use the personal information you send to us for our marketing purposes if this is in accordance with your marketing preferences. You can opt out of our marketing emails anytime.",
            "Deliver targeted advertising to you. We may use your information to develop and display personalized content and advertising (and work with third parties who do so) tailored to your interests and/or location and to measure its effectiveness.",
            "For other business purposes. We may use your information for other business purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns, and evaluating and improving our Services, products, marketing, and your experience. We may use and store this information in aggregated and anonymized form so that it is not associated with individual end users and does not include personal information.",
          ],
        },
      ],
    },
    {
      id: "sharing",
      heading: "3. Will your information be shared with anyone?",
      blocks: [
        {
          type: "p",
          text: "CSM Aviation maintains strict privacy policies, ensuring that the personal information of our users and members is not sold, rented, released, or traded to third parties without legal obligation.",
        },
      ],
    },
    {
      id: "cookies",
      heading: "4. Do we use cookies and other tracking technologies?",
      blocks: [
        { type: "inShort", text: "We may use cookies and other tracking technologies to collect and store your information." },
        {
          type: "p",
          text: "We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Our Cookie Notice provides specific information about how we use such technologies and how you can refuse certain cookies.",
        },
      ],
    },
    {
      id: "social-logins",
      heading: "5. How do we handle your social logins?",
      blocks: [
        {
          type: "inShort",
          text: "If you choose to register or log in to our services using a social media account, we may have access to certain information about you.",
        },
        {
          type: "p",
          text: "Our Services allow you to register and log in using your third-party social media account details (like your Facebook or Twitter logins). If you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but it will often include your name, email address, friends list, profile picture, and other information you choose to make public on such a social media platform.",
        },
        {
          type: "p",
          text: "We will use the information we receive only for the purposes described in this privacy notice or that are otherwise made clear to you regarding the relevant Services. Please note that we do not control and are not responsible for other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and share your personal information and how you can set your privacy preferences on their sites and apps.",
        },
      ],
    },
    {
      id: "retention",
      heading: "6. How long do we keep your information?",
      blocks: [
        {
          type: "inShort",
          text: "We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.",
        },
        {
          type: "p",
          text: "We will only keep your personal information for as long as necessary for the purposes set out in this privacy notice unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us to keep your personal information for longer than the period of time in which users have an account with us.",
        },
        {
          type: "p",
          text: "When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it. If this is not possible (for example, because your personal information has been stored in backup archives), we will securely store it and isolate it from any further processing until deletion is possible.",
        },
      ],
    },
    {
      id: "security",
      heading: "7. How do we keep your information safe?",
      blocks: [
        { type: "inShort", text: "We aim to protect your personal information through a system of organizational and technical security measures." },
        {
          type: "p",
          text: "We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security, and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.",
        },
      ],
    },
    {
      id: "minors",
      heading: "8. Do we collect information from minors?",
      blocks: [
        { type: "inShort", text: "We do not knowingly collect data from or market to children under 18 years of age." },
        {
          type: "p",
          text: "We do not knowingly solicit data from or market to children under 18 years of age. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent's use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we may have collected from children under the age of 18, please contact us at kkears@csmaviation.com.",
        },
      ],
    },
    {
      id: "privacy-rights",
      heading: "9. What are your privacy rights?",
      blocks: [
        { type: "inShort", text: "You may review, change, or terminate your account anytime." },
        {
          type: "p",
          text: "If you are a resident in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority.",
        },
        {
          type: "p",
          text: "If you have questions or comments about your privacy rights, you may email us at accounting@csmaviation.com.",
        },
        { type: "h3", text: "Account Information" },
        {
          type: "p",
          text: "If you would at any time like to review or change the information in your account or terminate your account, you can contact us using the contact information provided.",
        },
        {
          type: "p",
          text: "Upon your request to terminate your account, we will deactivate or delete it and its information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with investigations, enforce our Terms of Use, and/or comply with applicable legal requirements.",
        },
        { type: "h3", text: "Cookies and similar technologies" },
        {
          type: "p",
          text: "Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services.",
        },
        { type: "h3", text: "Opting out of email marketing" },
        {
          type: "p",
          text: "You can unsubscribe from our marketing email list at any time by clicking on the unsubscribe link in the emails that we send or by contacting us using the details provided below. You will then be removed from the marketing email list — however, we may still communicate with you, for example, to send you service-related emails that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes.",
        },
      ],
    },
    {
      id: "dnt",
      heading: "10. Controls for do-not-track features",
      blocks: [
        {
          type: "p",
          text: 'Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. No uniform technology standard for recognizing and implementing DNT signals has been finalized at this stage. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.',
        },
      ],
    },
    {
      id: "california",
      heading: "11. Do California residents have specific privacy rights?",
      blocks: [
        {
          type: "inShort",
          text: "Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.",
        },
        {
          type: "p",
          text: "If you are under 18 years of age, reside in California, and have a registered account with a Service, you have the right to request removal of unwanted data that you publicly post on the Services. To request removal of such data, please contact us using the contact information provided below, and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Services, but please be aware that the data may not be completely or comprehensively removed from all our systems (e.g. backups, etc.).",
        },
        { type: "h3", text: "CPRA Privacy Notice" },
        {
          type: "p",
          text: "The California Privacy Rights Act (CPRA) creates new protections for California residents and strengthens existing ones. The California Privacy Rights Act (CPRA), or Proposition 24, is a California voter-led ballot initiative to clarify and strengthen the California Consumer Privacy Act (CCPA). Changes from the CPRA take effect on January 1, 2023, amending the existing California Consumer Privacy Act (CCPA) enacted in 2018.",
        },
        {
          type: "p",
          text: "Notably, the CPRA adopts more concepts and language from the European Union's General Data Protection Regulation (GDPR). This includes enshrining the GDPR principles of data minimization and collection limitation, explicitly defining sensitive personal information, introducing DPIA-style privacy risk assessments, and clarifying that valid consent must be freely given, specific, and unambiguous.",
        },
        { type: "p", text: "The four primary rights the CCPA granted California residents are:" },
        {
          type: "list",
          items: [
            { label: "Right to know", text: "the right to know what sensitive personal information businesses collect and how it is used or shared, specifically the categories of data and sources, specific consumer data, collection purposes, third parties a business may sell the data to, and categories of data the business may sell to those third parties." },
            { label: "Right to delete", text: "the right to have that collected information deleted, except for cases involving unverified requests, completing transactions, specific data security practices, reasonable internal practices, legal purposes, and information exempt from the CCPA." },
            { label: 'Right to opt-out of data "sales"', text: "the right to prohibit the sale of the consumer's personal information, or PII data, to third parties." },
            { label: "Right to non-discrimination", text: "businesses cannot discriminate the price or delivery of their goods and services because a California citizen has exercised their CCPA rights." },
          ],
        },
        { type: "h3", text: "What categories of personal information do we collect?" },
        {
          type: "p",
          text: "We have collected the following categories of personal information in the past twelve (12) months:",
        },
        {
          type: "table",
          columns: ["Category", "Examples", "Collected"],
          rows: [
            ["A. Identifiers", "Contact details, such as real name, alias, postal address, telephone or mobile contact number, unique personal identifier, online identifier, Internet Protocol address, email address and account name", "YES"],
            ["B. California Customer Records categories", "Name, contact information, education, employment, employment history and financial information", "YES"],
            ["C. Protected classification characteristics", "Gender and date of birth", "YES"],
            ["D. Commercial information", "Transaction information, purchase history, financial details, and payment information", "YES"],
            ["E. Biometric information", "Fingerprints and voiceprints", "NO"],
            ["F. Internet or other network activity", "Browsing history, search history, online behavior, interest data, and interactions with our and other websites, applications, systems, and advertisements", "YES"],
            ["G. Geolocation data", "Device location", "YES"],
            ["H. Audio, electronic, visual, or similar", "Images and audio, video, or call recordings created in connection with our business activities", "NO"],
            ["I. Professional or employment-related", "Business contact details, job title, work history and professional qualifications if you apply for a job with us", "YES"],
            ["J. Education Information", "Student records and directory information", "NO"],
            ["K. Inferences drawn from other personal information", "Inferences drawn to create a profile or summary about an individual's preferences and characteristics", "YES"],
          ],
        },
        { type: "h3", text: "Your rights with respect to your personal data" },
        {
          type: "p",
          label: "Right to request deletion of the data — Request to delete.",
          text: "You can ask for the deletion of your personal information. If you ask us to delete your personal information, we will respect your request and delete your personal information, subject to certain exceptions provided by law.",
        },
        {
          type: "p",
          label: "Right to Non-Discrimination for the Exercise of a Consumer's Privacy Rights.",
          text: "We will not discriminate against you if you exercise your privacy rights.",
        },
        {
          type: "p",
          text: "To exercise these rights, you can contact us by email at accounting@csmaviation.com or by referring to the contact details at the bottom of this document. We would also like to hear from you if you have a complaint about how we handle your data.",
        },
      ],
    },
    {
      id: "updates",
      heading: "12. Do we make updates to this notice?",
      blocks: [
        { type: "inShort", text: "Yes, we will update this notice as necessary to stay compliant with relevant laws." },
        {
          type: "p",
          text: 'We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.',
        },
      ],
    },
    {
      id: "contact-notice",
      heading: "13. How can you contact us about this notice?",
      blocks: [
        {
          type: "p",
          text: "If you have questions or comments about this notice, you may email us at kkears@csmaviation.com or by post to:",
        },
        {
          type: "p",
          text: "Paragon Aviation Logistics Inc, dba CSM Aviation\n3050 North Winery Avenue\nFresno, CA 93703\nUnited States",
        },
      ],
    },
    {
      id: "review-data",
      heading: "14. How can you review, update, or delete the data we collect from you?",
      blocks: [
        {
          type: "p",
          text: "Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. To request to review, update, or delete your personal information, please contact us using the details above.",
        },
      ],
    },
    {
      id: "sms-opt-out",
      heading: "15. SMS opt-out",
      blocks: [
        {
          type: "p",
          text: 'If you are receiving text messages from us and wish to stop receiving them, simply respond with "STOP" to the number from which you received the message. Once we receive your message, you will no longer receive further text messages from us.',
        },
      ],
    },
  ] as PrivacySection[],
};
