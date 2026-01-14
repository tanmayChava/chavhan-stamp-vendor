import React, { useState, useEffect, useRef } from 'react';
import { Layout } from './components/Layout';
import { DOCUMENT_TEMPLATES, DOC_ICONS } from './constants';
import { DocumentType, GeneratedDocument } from './types';
import { DocumentGenerator } from './components/DocumentGenerator';
import { HashRouter, Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Star, Check, Search, FileText, Download, ArrowUpRight, MapPin, Phone, Mail, Clock, Award, Users, Shield, Zap, MessageCircle, FileCheck, PenTool } from 'lucide-react';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const ScrollAnimationWrapper = ({ children, className = '' }: { children?: React.ReactNode; className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}>
      {children}
    </div>
  );
};

// --- GENERIC INFO PAGE COMPONENT ---
const DocumentInfoPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  
  // Find the matching template based on the URL parameter
  const decodedType = decodeURIComponent(type || '');
  
  // Lookup template by value
  const template = Object.values(DOCUMENT_TEMPLATES).find(t => t.type === decodedType);

  if (!template) {
      return <div className="p-20 text-center text-xl text-slate-500">Document type not found.</div>;
  }

  const { info, marathiLabel } = template;
  const marathiTitle = marathiLabel.split('(')[0].trim();
  const englishTitle = marathiLabel.includes('(') ? marathiLabel.split('(')[1].replace(')', '').trim() : template.type;
  
  const whatsappMessage = `Hello, I need information about ${englishTitle} (${marathiTitle}).`;
  const whatsappUrl = `https://wa.me/919422280256?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Navigation */}
        <div className="animate-fade-in-up">
            <button 
                onClick={() => navigate('/')}
                className="group flex items-center text-slate-500 hover:text-indigo-600 mb-8 transition-colors font-medium"
            >
                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center mr-2 transition-colors">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                </div>
                Back to Services
            </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up delay-100">
            <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm bg-indigo-50 px-3 py-1 rounded-full">Legal Information</span>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mt-6 mb-4 leading-tight">
                {englishTitle}
                <span className="block text-2xl md:text-3xl text-indigo-600 mt-2 font-medium">{marathiTitle}</span>
            </h1>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg mt-4">{template.description}</p>
        </div>

        {/* Definitions */}
        <ScrollAnimationWrapper className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                   <span className="text-6xl font-serif font-bold text-slate-900">En</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center">
                    <div className="w-1 h-6 bg-slate-900 mr-3 rounded-full"></div>
                    English Definition
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                    {info.englishDefinition}
                </p>
            </div>
            <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 relative overflow-hidden group hover:shadow-md transition-all">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-6xl font-serif font-bold text-indigo-900">म</span>
                </div>
                <h3 className="text-lg font-bold text-indigo-800 mb-3 flex items-center">
                    <div className="w-1 h-6 bg-indigo-600 mr-3 rounded-full"></div>
                    मराठी व्याख्या
                </h3>
                <p className="text-slate-700 text-lg leading-relaxed">
                    {info.marathiDefinition}
                </p>
            </div>
        </ScrollAnimationWrapper>

        {/* Requirements Section */}
        <ScrollAnimationWrapper>
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-slate-900 text-white p-8 md:p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                    <h2 className="text-2xl font-bold relative z-10">Documents Required / आवश्यक कागदपत्रे</h2>
                    <p className="text-slate-400 mt-2 relative z-10">Please bring original copies when visiting. / कृपया येताना मूळ प्रती आणा.</p>
                </div>
                
                <div className="p-8 md:p-12 bg-slate-50/50">
                     <div className="grid gap-4">
                        {info.requirements.map((req, index) => {
                            // Split English and Marathi parts
                            const parts = req.split('/');
                            const englishPart = parts[0].trim();
                            const marathiPart = parts.length > 1 ? parts.slice(1).join('/').trim() : null;

                            return (
                                <div key={index} className="flex gap-4 group">
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-indigo-600 font-bold text-sm border border-slate-200 shadow-sm group-hover:border-indigo-500 group-hover:text-indigo-700 transition-colors">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm group-hover:shadow-md group-hover:border-indigo-200 transition-all">
                                            <div className="text-slate-900 font-semibold text-lg">{englishPart}</div>
                                            {marathiPart && (
                                                <div className="text-indigo-600 font-medium mt-1 text-base">
                                                    {marathiPart}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                     </div>
                </div>
                
                <div className="bg-white p-8 border-t border-slate-100 text-center">
                    <div className="max-w-3xl mx-auto bg-green-50 rounded-2xl p-8 border border-green-100">
                        <p className="text-green-900 font-bold mb-2 text-xl">
                            Send your document details on WhatsApp for information and pricing.
                        </p>
                        <p className="text-green-800 font-medium mb-6 text-lg">
                            माहिती व किंमतीसाठी कागदपत्रांची माहिती WhatsApp वर पाठवा.
                        </p>
                        <a 
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-full hover:bg-green-700 transition-all font-bold shadow-lg shadow-green-500/30 hover:-translate-y-1 text-lg group"
                        >
                            <MessageCircle className="w-6 h-6 mr-2 group-hover:scale-110 transition-transform" /> 
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </ScrollAnimationWrapper>
    </div>
  );
};


const HomePage = ({ onInfoClick }: { onInfoClick: (type: DocumentType) => void }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTemplates = Object.values(DOCUMENT_TEMPLATES).filter(t => 
    t.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.marathiLabel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pb-20">
      {/* Hero */}
      <div id="home" className="bg-slate-900 text-white pt-20 pb-28 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center max-w-5xl mx-auto animate-fade-in-up">
                <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-indigo-300 text-sm font-semibold mb-6 border border-white/10 backdrop-blur-sm">
                   Authorized Govt. License No: 4892/MH/STAMP
                </div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
                    CHAVHAN STAMP <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">VENDOR</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                    Expert Legal Documentation Services in Maharashtra.<br/>
                    <span className="text-slate-400">महाराष्ट्रातील तज्ञ कायदेशीर दस्तऐवज सेवा.</span>
                    <br/>
                    <span className="text-indigo-300 font-medium mt-2 block">
                        Sale Deed, Gift Deed, Agreements & More.<br/>
                        विक्री खत, बक्षीस पत्र, करार आणि बरेच काही.
                    </span>
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                        onClick={() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'})}
                        className="px-8 py-4 bg-indigo-600 rounded-full font-semibold text-lg hover:bg-indigo-500 transition-all shadow-lg hover:shadow-indigo-500/40 hover:-translate-y-1"
                    >
                        Explore Services / सेवा पहा
                    </button>
                    <button 
                        onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}
                        className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-full font-semibold text-lg hover:bg-white/10 transition-all hover:-translate-y-1"
                    >
                        Contact Us / संपर्क साधा
                    </button>
                </div>
            </div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-40 pointer-events-none">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-600 rounded-full blur-[100px] animate-fade-in-up"></div>
            <div className="absolute top-1/2 -right-32 w-[30rem] h-[30rem] bg-purple-600 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600 rounded-full blur-[90px] opacity-60"></div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-20 animate-fade-in-up delay-100">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center border border-slate-100/50">
              <div className="group">
                  <div className="text-5xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">35+</div>
                  <div className="text-slate-500 text-sm font-bold uppercase tracking-wider">Years Experience<br/><span className="text-xs">वर्षे अनुभव</span></div>
              </div>
               <div className="md:border-l md:border-r border-slate-200 group">
                  <div className="text-5xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">15000+</div>
                  <div className="text-slate-500 text-sm font-bold uppercase tracking-wider">Happy Clients<br/><span className="text-xs">समाधानी ग्राहक</span></div>
              </div>
               <div className="group">
                  <div className="text-5xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">100%</div>
                  <div className="text-slate-500 text-sm font-bold uppercase tracking-wider">Legal Compliance<br/><span className="text-xs">कायदेशीर पालन</span></div>
              </div>
          </div>
      </div>

      {/* Services Section */}
      <div id="services" className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 animate-fade-in-up delay-200">
            <div>
                <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Our Expertise / आमची तज्ञांची टीम</span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Services Available / उपलब्ध सेवा</h2>
                <p className="text-slate-500 mt-3 text-lg">Select a document for details & requirements (माहिती आणि आवश्यक कागदपत्रांसाठी दस्तऐवज निवडा).</p>
            </div>
            <div className="relative w-full md:w-80 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                    type="text"
                    placeholder="Search / शोधा..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none shadow-sm"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((doc, idx) => {
            const Icon = DOC_ICONS[doc.type] || FileText;
            const marathiName = doc.marathiLabel.includes('(') 
                ? doc.marathiLabel.split('(')[0].trim() 
                : doc.marathiLabel;

            return (
              <div 
                key={doc.type} 
                onClick={() => onInfoClick(doc.type)}
                className="group relative bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden animate-fade-in-up flex flex-col"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ArrowUpRight className="text-indigo-600 w-6 h-6" />
                </div>

                <div className="relative z-10 flex-grow">
                    <div className="mb-6 inline-flex p-4 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                        <Icon size={32} strokeWidth={1.5} />
                    </div>
                    {/* Marathi label larger and English label distinct */}
                    <h3 className="text-2xl font-bold text-slate-900 mb-1">{marathiName}</h3>
                    <h4 className="text-sm font-semibold text-indigo-600 mb-4 uppercase tracking-wider">{doc.type}</h4>
                    
                    <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-3">{doc.description}</p>
                    <div className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">{doc.marathiDescription}</div>
                </div>

                 {/* Explicit View Details Link */}
                <div className="relative z-10 mt-4 pt-4 border-t border-slate-100 group-hover:border-indigo-100 transition-colors">
                    <div className="flex items-center justify-between text-indigo-600 font-bold text-sm">
                        <span>View Details / माहिती पहा</span>
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                    </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="bg-indigo-50 py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="animate-fade-in-up">
                    <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">About Us / आमच्याबद्दल</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-6">Trusted Legal Consultants in Maharashtra <br/><span className="text-2xl text-slate-600">महाराष्ट्रातील विश्वसनीय कायदेशीर सल्लागार</span></h2>
                    <p className="text-slate-600 text-lg leading-relaxed mb-6">
                        Chavhan Stamp Vendor & Consultant has been serving the community for over 35 years. We specialize in providing hassle-free, legally compliant documentation services for property, business, and personal needs.
                    </p>
                    <ul className="space-y-4">
                        {[
                            "Government Authorized Vendor / सरकार अधिकृत",
                            "Expert Legal Drafting / तज्ञ कायदेशीर ड्राफ्टिंग",
                            "Fast & Secure Process / वेगवान आणि सुरक्षित प्रक्रिया",
                            "Marathi & English Support / मराठी आणि इंग्रजी सपोर्ट"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center text-slate-800 font-medium">
                                <span className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                                    <Check className="w-4 h-4 text-indigo-600" />
                                </span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="relative animate-fade-in-up delay-200">
                    <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                    <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                    <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-slate-50 p-6 rounded-2xl text-center">
                                <Award className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
                                <div className="font-bold text-2xl text-slate-900">35+</div>
                                <div className="text-sm text-slate-500">Years Exp.<br/>वर्षे अनुभव</div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-2xl text-center">
                                <Users className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
                                <div className="font-bold text-2xl text-slate-900">15k+</div>
                                <div className="text-sm text-slate-500">Clients<br/>ग्राहक</div>
                            </div>
                            <div className="col-span-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-2xl text-center shadow-lg shadow-indigo-500/30">
                                <div className="text-lg font-bold">Licence Verified</div>
                                <div className="opacity-80 text-sm">Govt. of Maharashtra</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* Contact & Map Section */}
      <div id="contact" className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-16 animate-fade-in-up">
            <span className="text-indigo-600 font-bold tracking-wider uppercase text-sm">Get In Touch / संपर्क करा</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">Visit Our Office / आमच्या कार्यालयाला भेट द्या</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 animate-fade-in-up delay-100">
            {/* Contact Info Card */}
            <div className="bg-white p-10 rounded-3xl shadow-lg border border-slate-100 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Contact Information</h3>
                
                <div className="space-y-8">
                    <div className="flex items-start">
                        <div className="bg-indigo-100 p-3 rounded-full mr-4 text-indigo-600">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900">Our Address</h4>
                            <p className="text-slate-600 mt-1">
                                Kulkarni Plot, VAKIL GALLI,<br/>
                                behind CIVIL COURT, New Satara,<br/>
                                Juna Satara, Bhusawal, Maharashtra 425201
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start">
                         <div className="bg-indigo-100 p-3 rounded-full mr-4 text-indigo-600">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900">Phone & WhatsApp</h4>
                            <p className="text-slate-600 mt-1">9422280256 / 9422445252</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                         <div className="bg-indigo-100 p-3 rounded-full mr-4 text-indigo-600">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900">Email</h4>
                            <p className="text-slate-600 mt-1">chavhanstamp@gmail.com</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                         <div className="bg-indigo-100 p-3 rounded-full mr-4 text-indigo-600">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900">Office Hours</h4>
                            <p className="text-slate-600 mt-1">Mon - Fri: 9:00 AM - 6:00 PM</p>
                            <p className="text-slate-600 mt-1">Sat: 10:00 AM - 1:00 PM</p>
                            <p className="text-slate-600">Sunday: Closed</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Embed */}
            <div className="h-[500px] bg-slate-200 rounded-3xl overflow-hidden shadow-lg border border-slate-100">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14913.6!2d75.781867!3d21.050668!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd9a7349875ec87%3A0x1e65ee42937cf3e4!2sCHAVHAN%20STAMP%20VENDOR!5e0!3m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{border:0}} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Office Location"
                ></iframe>
            </div>
        </div>
      </div>
    </div>
  );
};

const HelpPage = () => (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-fade-in-up">
        <h1 className="text-3xl font-bold text-slate-900 mb-10 text-center">Frequently Asked Questions</h1>
        <div className="space-y-6">
            {[
                { q: "Is the generated document legally binding?", a: "The documents are drafted based on standard legal templates and the input you provide. However, we recommend having a lawyer review important documents for specific local compliances." },
                { q: "How do I sign the documents?", a: "Instructions vary by document type (e.g., deeds usually require notarization and witnesses). We provide a 'Next Steps' guide with every download." },
                { q: "Do you sell physical stamp paper?", a: "Yes, we are an authorized stamp vendor. You can purchase stamp paper directly from our office or book an appointment." }
            ].map((item, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{item.q}</h3>
                    <p className="text-slate-600 leading-relaxed">{item.a}</p>
                </div>
            ))}
        </div>
        <div className="mt-16 bg-gradient-to-r from-indigo-600 to-purple-600 p-10 rounded-3xl text-center text-white shadow-xl shadow-indigo-500/30">
            <h3 className="text-2xl font-bold mb-3">Still need help?</h3>
            <p className="text-indigo-100 mb-8 max-w-lg mx-auto">Our support team is available during office hours.</p>
            <button className="bg-white text-indigo-600 font-bold px-8 py-3 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg">Contact Support</button>
        </div>
    </div>
);


const AppContent = () => {
    const [generatingType, setGeneratingType] = useState<DocumentType | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleInfoClick = (type: DocumentType) => {
        navigate(`/info/${encodeURIComponent(type)}`);
    }

    const handleStartDraft = (type: DocumentType) => {
        setGeneratingType(type);
        navigate('/generate');
    };

    const handleDocComplete = (doc: GeneratedDocument) => {
        // Document generation complete, stay on success screen until user cancels/navigates home
        console.log("Document generated:", doc);
    };

    // If we are on /generate but no type is selected, go back home
    useEffect(() => {
        if (location.pathname === '/generate' && !generatingType) {
            navigate('/');
        }
    }, [location.pathname, generatingType, navigate]);

    const currentPage = location.pathname === '/' ? 'home' : location.pathname.replace('/', '');

    return (
        <Layout 
            currentPage={currentPage}
            navigate={(page) => navigate(page === 'home' ? '/' : `/${page}`)}
        >
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<HomePage onInfoClick={handleInfoClick} />} />
                <Route path="/info/:type" element={<DocumentInfoPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/generate" element={
                    generatingType ? (
                        <DocumentGenerator 
                            documentType={generatingType} 
                            onComplete={handleDocComplete}
                            onCancel={() => {
                                setGeneratingType(null);
                                navigate('/');
                            }}
                        />
                    ) : null
                } />
            </Routes>
        </Layout>
    );
};

export default function App() {
  return (
    <HashRouter>
        <AppContent />
    </HashRouter>
  );
}