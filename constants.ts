
import { Section, DocumentCategory } from './types';

export const SECTIONS: Section[] = [
  { id: 'company-overview', title: 'Company Overview', widgetIds: ['company-snapshot'] },
  { id: 'announcement', title: 'Announcement', widgetIds: ['corporate-news'] },
  { id: 'fact-sheet', title: 'Fact Sheet' },
  { id: 'corporate-documents', title: 'Corporate Documents' },
  { id: 'analyst-recommendations', title: 'Analyst Recommendations', widgetIds: ['analyst-recommendations'] },
  { id: 'corporate-actions', title: 'Corporate Actions', widgetIds: ['corporate-actions'] },
  { id: 'company-financials', title: 'Company Financials', widgetIds: ['company-financials'] },
  { id: 'share-information', title: 'Share Information' },
  { id: 'investment-calculator', title: 'Investment Calculator', widgetIds: ['investment-calculator'] },
  { id: 'email-subscription', title: 'Email Subscription', widgetIds: ['email-subscription'] },
  { id: 'get-in-touch', title: 'Get in Touch with IR' },
];

export const CORPORATE_DOCS_DATA: DocumentCategory[] = [
    {
        name: 'Prospectus & Transfer Document',
        documents: [
            { title: 'Prospectus', url: 'https://gasarabian.com/wp-content/uploads/2022/08/GAS-Project_Final-Prospectus.pdf' },
            { title: 'Transfer Document', url: 'https://gasarabian.com/wp-content/uploads/2025/09/Transfer-Document-En.pdf' },
        ],
    },
    {
        name: 'Corporate Governance',
        documents: [
            { title: 'Company By Laws', url: 'https://gasarabian.com/wp-content/uploads/2025/01/GAS-New-By-Laws.pdf' },
            { title: 'Dividend Policy', url: 'https://gasarabian.com/wp-content/uploads/2024/05/GAS-Dividend-Policy-Rev.2.pdf' },
            { title: 'Board Charter', url: 'https://gasarabian.com/wp-content/uploads/2022/08/Board-Charter.pdf' },
            { title: 'Audit Committee Charter', url: 'https://gasarabian.com/wp-content/uploads/2022/08/Audit-Committee-Charter.pdf' },
        ],
    },
    {
        name: 'Annual Reports',
        documents: [
            { title: '2024', url: 'https://gasarabian.com/wp-content/uploads/2025/04/GAS-Annual-Report-2024_En.pdf' },
            { title: '2023', url: 'https://gasarabian.com/wp-content/uploads/2024/05/GAS-Annual-Report-2023-En.pdf' },
            { title: '2022', url: 'https://gasarabian.com/wp-content/uploads/2023/04/GAS-Annual-Report-2022_En.pdf' },
        ],
    },
    {
        name: 'Shareholders Meeting',
        documents: [
            { title: 'May 11, 2025', url: 'https://gasarabian.com/wp-content/uploads/2025/05/Minutes-of-Meeting-of-GAS-Shareholders.pdf' },
            { title: 'December 10, 2024', url: 'https://gasarabian.com/wp-content/uploads/2024/12/Minutes-of-Meeting-of-GAS-Shareholders_10-12-24-.pdf' },
        ],
    },
    {
        name: 'Investors Presentation',
        documents: [
            { title: 'March 2025', url: 'https://gasarabian.com/wp-content/uploads/2025/07/GAS-Company-Profile.pdf' },
        ],
    },
];

export const PDF_ICON_URL = 'https://gasarabian.com/wp-content/themes/gasarabian/images/gas/icon-pdf.png';
