export enum DocumentType {
  SALE_DEED = 'Sale Deed',
  GIFT_DEED = 'Gift Deed',
  WILL = 'Will',
  POWER_OF_ATTORNEY = 'Power of Attorney',
  LEASE_AGREEMENT = 'Lease Agreement',
  MORTGAGE_AGREEMENT = 'Mortgage Agreement',
  AFFIDAVIT = 'Affidavit',
  PARTNERSHIP_AGREEMENT = 'Partnership Agreement',
  TENANCY_AGREEMENT = 'Tenancy Agreement',
  JOINT_VENTURE_AGREEMENT = 'Joint Venture Agreement',
}

export interface DocumentField {
  id: string;
  label: string;
  type: 'text' | 'date' | 'number' | 'textarea' | 'select';
  options?: string[]; // For select type
  placeholder?: string;
  required: boolean;
}

export interface DocumentInfo {
  marathiDefinition: string;
  englishDefinition: string;
  requirements: string[]; // List of documents required
}

export interface DocumentTemplate {
  type: DocumentType;
  marathiLabel: string; // Added Marathi translation
  description: string;
  marathiDescription: string; // Added Marathi description
  price: number;
  fields: DocumentField[];
  info: DocumentInfo; // Added info block
}

export interface GeneratedDocument {
  id: string;
  type: DocumentType;
  title: string;
  content: string; // Markdown/Text content
  createdAt: string;
  status: 'Draft' | 'Paid' | 'Completed';
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}