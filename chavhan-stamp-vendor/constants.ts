import { DocumentType, DocumentTemplate } from "./types";
import { FileText, Home, Gift, Scale, Briefcase, FileSignature, Users, Building, ScrollText, Handshake } from "lucide-react";

export const APP_NAME = "CHAVHAN STAMP VENDOR";

export const DOCUMENT_TEMPLATES: Record<DocumentType, DocumentTemplate> = {
  [DocumentType.SALE_DEED]: {
    type: DocumentType.SALE_DEED,
    marathiLabel: "विक्री खत (Sale Deed)",
    description: "Transfer ownership of property from a seller to a buyer.",
    marathiDescription: "विक्रेत्याकडून खरेदीदाराकडे मालमत्तेची मालकी हस्तांतरित करा.",
    price: 49.99,
    fields: [
      { id: "sellerName", label: "Seller Name", type: "text", required: true },
      { id: "buyerName", label: "Buyer Name", type: "text", required: true },
      { id: "propertyAddress", label: "Property Address", type: "textarea", required: true },
      { id: "saleConsideration", label: "Sale Price", type: "number", required: true },
      { id: "paymentMode", label: "Payment Mode", type: "text", placeholder: "e.g., Cheque No. 123", required: true },
    ],
    info: {
      marathiDefinition: "विक्री खत हा एक कायदेशीर दस्तऐवज आहे जो एका व्यक्तीकडून (विक्रेता) दुसऱ्या व्यक्तीकडे (खरेदीदार) मालमत्तेची मालकी हस्तांतरित करतो. हे जमिनीच्या किंवा घराच्या पूर्ण मालकीचे पुरावे मानले जाते.",
      englishDefinition: "A Sale Deed is a legal instrument that transfers the ownership of property from a seller to a buyer. It is the primary document used to prove ownership of a property.",
      requirements: [
        "7/12 Extract (Satbara Utara) or Property Card / ७/१२ उतारा किंवा प्रॉपर्टी कार्ड",
        "Previous Deeds (Chain of documents) / पूर्वीचे दस्तऐवज",
        "PAN Card of Buyer and Seller / पॅन कार्ड (खरेदीदार आणि विक्रेता)",
        "Aadhaar Card / आधार कार्ड",
        "Two Witnesses with ID Proof / दोन साक्षीदार (ओळखपत्रासह)",
        "Property Tax Receipt / मालमत्ता कर पावती"
      ]
    }
  },
  [DocumentType.GIFT_DEED]: {
    type: DocumentType.GIFT_DEED,
    marathiLabel: "बक्षीस पत्र (Gift Deed)",
    description: "Voluntarily transfer property to another person without consideration.",
    marathiDescription: "कोणत्याही मोबदल्याशिवाय मालमत्ता दुसऱ्या व्यक्तीला स्वेच्छेने हस्तांतरित करा.",
    price: 29.99,
    fields: [
      { id: "donorName", label: "Donor Name", type: "text", required: true },
      { id: "doneeName", label: "Donee Name", type: "text", required: true },
      { id: "relationship", label: "Relationship", type: "text", required: true },
      { id: "propertyDetails", label: "Property Details", type: "textarea", required: true },
    ],
    info: {
      marathiDefinition: "बक्षीस पत्र हे एक दस्तऐवज आहे ज्याद्वारे एक व्यक्ती आपली मालमत्ता दुसऱ्या व्यक्तीला प्रेमाने किंवा नात्यामुळे विनामूल्य (कोणत्याही मोबदल्याशिवाय) देते.",
      englishDefinition: "A Gift Deed is a legal document used to voluntarily transfer ownership of property from the donor to the donee without any monetary consideration.",
      requirements: [
        "Property Card or 7/12 Extract / प्रॉपर्टी कार्ड किंवा ७/१२ उतारा",
        "ID Proof of Donor and Donee / डोनर आणि डोनीचे ओळखपत्र",
        "Property Valuation Report / मालमत्ता मूल्यांकन अहवाल",
        "Stamp Duty Payment Receipt / मुद्रांक शुल्क पावती",
        "Two Witnesses / दोन साक्षीदार"
      ]
    }
  },
  [DocumentType.WILL]: {
    type: DocumentType.WILL,
    marathiLabel: "मृत्युपत्र (Will)",
    description: "Legal declaration of a person's wishes regarding the disposal of their property after death.",
    marathiDescription: "मृत्यूनंतर मालमत्तेची विल्हेवाट लावण्याबाबत व्यक्तीच्या इच्छेचे कायदेशीर घोषणापत्र.",
    price: 39.99,
    fields: [
      { id: "testatorName", label: "Testator Name", type: "text", required: true },
      { id: "beneficiaries", label: "Beneficiaries (Names & Relationship)", type: "textarea", required: true },
      { id: "executorName", label: "Executor Name", type: "text", required: true },
      { id: "assets", label: "List of Assets", type: "textarea", required: true },
    ],
    info: {
      marathiDefinition: "मृत्युपत्र (Will) म्हणजे एक कायदेशीर दस्तऐवज आहे, ज्यामध्ये व्यक्ती (टेस्टेटर) आपल्या संपत्तीचे वितरण त्याच्या मरणानंतर कसे होईल, हे स्पष्टपणे नमूद करते. यामध्ये त्याची इच्छाशक्ति आणि कोणते व्यक्ती किंवा संस्था त्याची संपत्ती प्राप्त करतील, हे सांगितले जाते.",
      englishDefinition: "A will is a legal document in which a person (the testator) specifies how their assets should be distributed after their death. It reflects their wishes and outlines who will receive what portion of their estate.",
      requirements: [
        "Doctor's Certificate of Mental Fitness / मानसिक तंदुरुस्तीचे डॉक्टरांचे प्रमाणपत्र",
        "List of Assets / संपत्तीची यादी",
        "Details of Beneficiaries / वारसदारांची माहिती",
        "Two Witnesses (Not Beneficiaries) / दोन साक्षीदार (जे वारसदार नसावेत)",
        "Aadhaar Card of Testator / टेस्टेटरचे आधार कार्ड"
      ]
    }
  },
  [DocumentType.LEASE_AGREEMENT]: {
    type: DocumentType.LEASE_AGREEMENT,
    marathiLabel: "भाडे करार (Lease Agreement)",
    description: "Contract outlining the terms under which one party agrees to rent property owned by another.",
    marathiDescription: "मालमत्ता भाड्याने देण्यासाठी आणि घेण्यासाठी मालक आणि भाडेकरू यांच्यातील करार.",
    price: 24.99,
    fields: [
      { id: "landlordName", label: "Landlord Name", type: "text", required: true },
      { id: "tenantName", label: "Tenant Name", type: "text", required: true },
      { id: "propertyAddress", label: "Premises Address", type: "textarea", required: true },
      { id: "rentAmount", label: "Monthly Rent", type: "number", required: true },
      { id: "leaseDuration", label: "Duration (Months)", type: "number", required: true },
    ],
    info: {
      marathiDefinition: "भाडे करार हा जमीनदार आणि भाडेकरू यांच्यातील कायदेशीर करार आहे, ज्यामध्ये मालमत्ता वापरण्याचे नियम, भाडे आणि कालावधी निश्चित केला जातो. ११ महिन्यांपेक्षा जास्त कालावधीसाठी हा करार नोंदणीकृत (Registered) करणे आवश्यक आहे.",
      englishDefinition: "A Lease Agreement is a contract between a landlord and a tenant that outlines the terms of renting a property. It specifies rent amount, duration, and rules of occupancy.",
      requirements: [
        "Ownership Proof (Index II or Electricity Bill) / मालकी हक्काचा पुरावा (इंडेक्स २ किंवा वीज बिल)",
        "Aadhaar Card & PAN of Landlord & Tenant / घरमालक आणि भाडेकरूचे आधार आणि पॅन कार्ड",
        "Two Witnesses with ID / दोन साक्षीदार",
        "Passport size photos / पासपोर्ट आकाराचे फोटो"
      ]
    }
  },
  [DocumentType.POWER_OF_ATTORNEY]: {
    type: DocumentType.POWER_OF_ATTORNEY,
    marathiLabel: "कुलमुखत्यारपत्र (Power of Attorney)",
    description: "Authorize someone to represent you or act on your behalf.",
    marathiDescription: "तुमच्या वतीने प्रतिनिधित्व करण्यासाठी किंवा कार्य करण्यासाठी एखाद्याला अधिकार द्या.",
    price: 34.99,
    fields: [
      { id: "principalName", label: "Principal Name", type: "text", required: true },
      { id: "agentName", label: "Agent/Attorney Name", type: "text", required: true },
      { id: "purpose", label: "Purpose/Powers Granted", type: "textarea", required: true },
    ],
    info: {
      marathiDefinition: "कुलमुखत्यारपत्र हा एक दस्तऐवज आहे जो एका व्यक्तीला (प्रिन्सिपल) दुसऱ्या व्यक्तीला (एजंट) त्यांच्या वतीने कायदेशीर निर्णय घेण्याचे किंवा कार्य करण्याचे अधिकार देतो.",
      englishDefinition: "Power of Attorney (POA) is a legal document giving one person (the agent) the power to act for another person (the principal). It can be general or specific.",
      requirements: [
        "Identity Proof of Principal and Agent / प्रिन्सिपल आणि एजंटचे ओळखपत्र",
        "Address Proof / पत्त्याचा पुरावा",
        "Passport size photos / पासपोर्ट आकाराचे फोटो",
        "Specific details of powers to be granted / अधिकारांचा स्पष्ट तपशील",
        "Two Witnesses / दोन साक्षीदार"
      ]
    }
  },
    [DocumentType.PARTNERSHIP_AGREEMENT]: {
    type: DocumentType.PARTNERSHIP_AGREEMENT,
    marathiLabel: "भागीदारी करार (Partnership Deed)",
    description: "Agreement between two or more partners to run a business together.",
    marathiDescription: "एकत्र व्यवसाय चालवण्यासाठी दोन किंवा अधिक भागीदारांमधील करार.",
    price: 59.99,
    fields: [
      { id: "partners", label: "Partners Names", type: "textarea", required: true },
      { id: "businessName", label: "Business Name", type: "text", required: true },
      { id: "businessAddress", label: "Business Address", type: "text", required: true },
      { id: "capitalContribution", label: "Capital Contribution Details", type: "textarea", required: true },
    ],
    info: {
      marathiDefinition: "भागीदारी करार हा दोन किंवा अधिक भागीदारांमधील लिखित करार आहे जो व्यवसायाचे नियम, नफा-तोटा वाटप आणि जबाबदाऱ्या स्पष्ट करतो.",
      englishDefinition: "A Partnership Deed is a written legal document that outlines the rights, liabilities, and profit-sharing ratios of partners in a business firm.",
      requirements: [
        "Names and Address of all Partners / सर्व भागीदारांची नावे आणि पत्ते",
        "Nature of Business / व्यवसायाचे स्वरूप",
        "Address of Firm / व्यवसायाचा पत्ता",
        "Capital Contribution Details / भांडवली योगदानाचा तपशील",
        "Aadhaar and PAN of all partners / सर्व भागीदारांचे आधार आणि पॅन"
      ]
    }
  },
  [DocumentType.MORTGAGE_AGREEMENT]: {
      type: DocumentType.MORTGAGE_AGREEMENT,
      marathiLabel: "गहाण खत (Mortgage Deed)",
      description: "Secure a loan with real property collateral.",
      marathiDescription: "स्थावर मालमत्तेच्या तारणावर कर्ज सुरक्षित करा.",
      price: 55.00,
      fields: [
          { id: "borrower", label: "Borrower Name", type: 'text', required: true},
          { id: "lender", label: "Lender Name", type: 'text', required: true},
          { id: "amount", label: "Loan Amount", type: 'number', required: true},
          { id: "property", label: "Property Details", type: 'textarea', required: true},
      ],
      info: {
        marathiDefinition: "गहाण खत म्हणजे जेव्हा एखादी व्यक्ती कर्जाच्या बदल्यात आपली स्थावर मालमत्ता बँकेकडे किंवा सावकाराकडे सुरक्षा म्हणून ठेवते तेव्हा केला जाणारा करार.",
        englishDefinition: "A Mortgage Deed is a legal document used by a borrower to pledge their property to a lender as security for a loan.",
        requirements: [
          "Title Deeds of the Property / मालमत्तेचे मूळ दस्तऐवज",
          "7/12 Extract or Property Card / ७/१२ उतारा किंवा प्रॉपर्टी कार्ड",
          "Loan Sanction Letter / कर्ज मंजुरी पत्र",
          "ID Proofs of Borrower and Lender / कर्जदार आणि सावकाराचे ओळखपत्र",
          "Two Witnesses / दोन साक्षीदार"
        ]
      }
  },
  [DocumentType.AFFIDAVIT]: {
      type: DocumentType.AFFIDAVIT,
      marathiLabel: "प्रतिज्ञापत्र (Affidavit)",
      description: "A written statement confirmed by oath or affirmation.",
      marathiDescription: "शपथेवर किंवा प्रतिज्ञेवर पुष्टी केलेले लिखित विधान.",
      price: 15.00,
      fields: [
          { id: "deponent", label: "Deponent Name", type: 'text', required: true},
          { id: "statement", label: "Statement of Fact", type: 'textarea', required: true},
          { id: "purpose", label: "Purpose of Affidavit", type: 'text', required: true},
      ],
      info: {
        marathiDefinition: "प्रतिज्ञापत्र हे सत्यतेचे लिखित विधान आहे, ज्यावर शपथ घेऊन स्वाक्षरी केली जाते. याचा वापर न्यायालयात किंवा सरकारी कामात पुरावा म्हणून केला जातो.",
        englishDefinition: "An affidavit is a sworn statement of fact written down and signed under oath. It is used as evidence in courts and for various government applications.",
        requirements: [
          "Non-Judicial Stamp Paper (Usually ₹100 or ₹500) / नॉन-ज्युडिशियल स्टॅम्प पेपर",
          "Aadhaar Card / आधार कार्ड",
          "Specific details of the declaration / घोषणेचा तपशील",
          "Notary verification / नोटरी सत्यापन"
        ]
      }
  },
  [DocumentType.TENANCY_AGREEMENT]: {
      type: DocumentType.TENANCY_AGREEMENT,
      marathiLabel: "भाडेकरू करार (Tenancy Agreement)",
      description: "Agreement between a landlord and a tenant for a short term stay.",
      marathiDescription: "अल्प कालावधीसाठी वास्तव्यासाठी घरमालक आणि भाडेकरू यांच्यातील करार.",
      price: 24.99,
      fields: [
        { id: "landlordName", label: "Landlord Name", type: "text", required: true },
        { id: "tenantName", label: "Tenant Name", type: "text", required: true },
        { id: "address", label: "Property Address", type: "text", required: true },
        { id: "rent", label: "Rent Amount", type: "number", required: true },
      ],
      info: {
        marathiDefinition: "टेनन्सी करारात घरमालक आणि भाडेकरू यांच्यातील अटी, जसे की भाडे, अनामत रक्कम (Deposit), आणि कालावधी नमूद केला जातो. हा सहसा ११ महिन्यांसाठी केला जातो.",
        englishDefinition: "A Tenancy Agreement establishes the legal relationship between the landlord and tenant, outlining rights and responsibilities for a specific period.",
        requirements: [
          "Electricity Bill of Property / वीज बिल",
          "Aadhaar Card of Owner and Tenant / मालक आणि भाडेकरूचे आधार कार्ड",
          "Rent and Deposit Details / भाडे आणि डिपॉझिट तपशील",
          "Witnesses / साक्षीदार"
        ]
      }
  },
  [DocumentType.JOINT_VENTURE_AGREEMENT]: {
      type: DocumentType.JOINT_VENTURE_AGREEMENT,
      marathiLabel: "संयुक्त उपक्रम करार (Joint Venture)",
      description: "Agreement for two parties to combine resources for a specific task.",
      marathiDescription: "विशिष्ट कार्यासाठी संसाधने एकत्र करण्यासाठी दोन पक्षांमधील करार.",
      price: 69.99,
      fields: [
          { id: "partyA", label: "Party A Name", type: "text", required: true},
          { id: "partyB", label: "Party B Name", type: "text", required: true},
          { id: "project", label: "Project Description", type: "textarea", required: true},
          { id: "profitShare", label: "Profit Sharing Ratio", type: "text", required: true},
      ],
      info: {
        marathiDefinition: "संयुक्त उपक्रम करार हा दोन किंवा अधिक पक्षांमध्ये एका विशिष्ट प्रकल्पासाठी संसाधने आणि नफा सामायिक करण्यासाठी केला जाणारा करार आहे.",
        englishDefinition: "A Joint Venture Agreement is a contract between two or more parties to undertake a specific economic activity together, sharing risks and rewards.",
        requirements: [
          "Company Registration Documents / कंपनी नोंदणी दस्तऐवज",
          "Board Resolution (if applicable) / बोर्ड ठराव",
          "Identity Proof of Authorized Signatories / अधिकृत स्वाक्षरीकर्त्यांचे ओळखपत्र",
          "Clear Terms of Partnership / भागीदारीच्या स्पष्ट अटी"
        ]
      }
  }
};

export const DOC_ICONS: Record<DocumentType, any> = {
  [DocumentType.SALE_DEED]: Home,
  [DocumentType.GIFT_DEED]: Gift,
  [DocumentType.WILL]: ScrollText,
  [DocumentType.POWER_OF_ATTORNEY]: Scale,
  [DocumentType.LEASE_AGREEMENT]: FileSignature,
  [DocumentType.PARTNERSHIP_AGREEMENT]: Users,
  [DocumentType.MORTGAGE_AGREEMENT]: Building,
  [DocumentType.AFFIDAVIT]: FileText,
  [DocumentType.TENANCY_AGREEMENT]: Briefcase,
  [DocumentType.JOINT_VENTURE_AGREEMENT]: Handshake,
};