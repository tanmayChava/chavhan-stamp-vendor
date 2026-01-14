import React, { useState, useRef, useEffect } from 'react';
import { DocumentType, DocumentTemplate, GeneratedDocument } from '../types';
import { DOCUMENT_TEMPLATES } from '../constants';
import { generateLegalDocumentStream } from '../services/geminiService';
import { ChevronRight, ChevronLeft, Loader2, Download, CheckCircle, CreditCard, AlertCircle, FileText } from 'lucide-react';

interface Props {
  documentType: DocumentType;
  onComplete: (doc: GeneratedDocument) => void;
  onCancel: () => void;
}

type Step = 'form' | 'preview' | 'payment' | 'success';

export const DocumentGenerator: React.FC<Props> = ({ documentType, onComplete, onCancel }) => {
  const template = DOCUMENT_TEMPLATES[documentType];
  const [currentStep, setCurrentStep] = useState<Step>('form');
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [region, setRegion] = useState('Maharashtra, India');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  const contentEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentEndRef.current) {
        contentEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [generatedContent]);


  const handleInputChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const generatePreview = async () => {
    setIsGenerating(true);
    setCurrentStep('preview');
    setGeneratedContent('');

    try {
      const stream = await generateLegalDocumentStream(documentType, formData, region);
      
      let fullText = '';
      for await (const chunk of stream) {
        if (chunk.text) {
          fullText += chunk.text;
          setGeneratedContent(prev => prev + chunk.text);
        }
      }
      setIsGenerating(false);
    } catch (error) {
      console.error(error);
      setIsGenerating(false);
      // Handle error state
      setGeneratedContent("Error generating document. Please try again.");
    }
  };

  const handlePayment = () => {
    setIsProcessingPayment(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessingPayment(false);
      setCurrentStep('success');
      
      // Save document
      const newDoc: GeneratedDocument = {
        id: Math.random().toString(36).substr(2, 9),
        type: documentType,
        title: `${documentType} - ${new Date().toLocaleDateString()}`,
        content: generatedContent,
        createdAt: new Date().toISOString(),
        status: 'Completed'
      };
      onComplete(newDoc);
    }, 2000);
  };

  const downloadPDF = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedContent], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `${documentType.replace(' ', '_')}.md`;
    document.body.appendChild(element);
    element.click();
  };

  const StepIndicator = ({ step, label, isActive, isCompleted }: { step: number, label: string, isActive: boolean, isCompleted: boolean }) => (
    <div className={`flex items-center ${isActive ? 'opacity-100' : 'opacity-50'} transition-opacity`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 font-bold mr-3 transition-colors ${
        isActive || isCompleted ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 text-slate-400'
      }`}>
        {isCompleted ? <CheckCircle className="w-5 h-5" /> : step}
      </div>
      <span className={`font-medium ${isActive ? 'text-indigo-900' : 'text-slate-500'}`}>{label}</span>
      {step < 3 && <div className="h-0.5 w-10 bg-slate-200 mx-4 hidden md:block"></div>}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto my-12 animate-fade-in-up">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{template.type}</h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">{template.description}</p>
      </div>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-100">
        
        {/* Progress Header */}
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-100">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <StepIndicator step={1} label="Document Details" isActive={currentStep === 'form'} isCompleted={currentStep !== 'form'} />
            <StepIndicator step={2} label="Review Draft" isActive={currentStep === 'preview'} isCompleted={currentStep === 'payment' || currentStep === 'success'} />
            <StepIndicator step={3} label="Payment & Download" isActive={currentStep === 'payment'} isCompleted={currentStep === 'success'} />
          </div>
        </div>

        <div className="p-8 md:p-12">
          {/* Step 1: Form */}
          {currentStep === 'form' && (
            <div className="animate-fade-in-up">
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-8 flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4 text-indigo-600">
                      <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-indigo-900 mb-1">Let's get started</h4>
                    <p className="text-indigo-700/80">
                        Please provide accurate details below. Our AI will draft a legally compliant document based on {region} jurisdiction.
                    </p>
                  </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Jurisdiction Region</label>
                  <input 
                    type="text" 
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                    placeholder="e.g. Maharashtra, India"
                  />
                </div>
                
                {template.fields.map((field) => (
                  <div key={field.id} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        required={field.required}
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none"
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                        placeholder={`Enter ${field.label.toLowerCase()}`}
                      />
                    ) : (
                      <input
                        type={field.type}
                        required={field.required}
                        placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                        className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                        onChange={(e) => handleInputChange(field.id, e.target.value)}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-12 pt-8 border-t border-slate-100">
                <button onClick={onCancel} className="text-slate-500 hover:text-slate-800 font-medium transition-colors px-4 py-2">Cancel</button>
                <button 
                  onClick={generatePreview}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold flex items-center shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5"
                >
                  Generate Draft <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Preview */}
          {currentStep === 'preview' && (
            <div className="flex flex-col h-[700px] animate-fade-in-up">
              <div className="flex-grow overflow-y-auto bg-white p-10 border border-slate-200 rounded-xl shadow-inner relative">
                 
                <div className="relative z-10 whitespace-pre-wrap max-w-3xl mx-auto text-slate-800 leading-relaxed font-serif">
                    {generatedContent}
                    {isGenerating && (
                        <div className="flex flex-col items-center justify-center py-20 text-indigo-500">
                        <Loader2 className="w-10 h-10 animate-spin mb-4" /> 
                        <span className="font-semibold animate-pulse">Drafting your document with AI...</span>
                        </div>
                    )}
                    <div ref={contentEndRef} />
                </div>
              </div>

              <div className="flex justify-between items-center mt-8">
                <button 
                  onClick={() => setCurrentStep('form')} 
                  disabled={isGenerating}
                  className="px-6 py-3 text-slate-600 hover:text-slate-900 font-medium flex items-center disabled:opacity-50 transition-colors border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  <ChevronLeft className="mr-2 w-4 h-4" /> Edit Details
                </button>
                <button 
                  onClick={() => setCurrentStep('payment')}
                  disabled={isGenerating}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold flex items-center shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
                >
                  Proceed to Payment <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 'payment' && (
            <div className="max-w-lg mx-auto py-8 animate-fade-in-up">
              <div className="text-center mb-10">
                <div className="mx-auto w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 text-indigo-600">
                  <CreditCard className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Secure Payment</h3>
                <p className="text-slate-500 mt-2">Unlock your legally binding document instanty.</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
                <div className="flex justify-between mb-4 border-b border-slate-200 pb-4">
                  <span className="text-slate-700 font-medium">{template.type}</span>
                  <span className="font-bold text-slate-900">${template.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-500 text-sm">Consultation Fee</span>
                  <span className="text-slate-600 text-sm font-medium">$5.00</span>
                </div>
                <div className="flex justify-between font-bold text-xl text-indigo-700 mt-4 pt-4 border-t border-slate-200">
                  <span>Total</span>
                  <span>${(template.price + 5).toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={handlePayment}
                  disabled={isProcessingPayment}
                  className="w-full py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-bold shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center"
                >
                  {isProcessingPayment ? <Loader2 className="animate-spin mr-2" /> : "Pay & Download"}
                </button>
                <button 
                  onClick={() => setCurrentStep('preview')}
                  disabled={isProcessingPayment}
                  className="w-full py-3 text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors"
                >
                  Back to Review
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {currentStep === 'success' && (
            <div className="text-center py-16 animate-fade-in-up">
               <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
                  <CheckCircle className="w-12 h-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">Document Finalized!</h2>
                <p className="text-slate-500 mb-12 text-lg max-w-md mx-auto">Your <span className="text-slate-900 font-semibold">{template.type}</span> has been successfully drafted and is ready for execution.</p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-6">
                  <button 
                    onClick={downloadPDF}
                    className="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-bold flex items-center justify-center shadow-lg shadow-indigo-500/30 transition-all"
                  >
                    <Download className="mr-2 w-5 h-5" /> Download PDF
                  </button>
                  <button 
                    onClick={onCancel} 
                    className="px-8 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-medium transition-colors"
                  >
                    Back to Home
                  </button>
                </div>

                <div className="mt-16 p-6 bg-amber-50 rounded-xl border border-amber-100 text-left max-w-2xl mx-auto">
                  <h4 className="font-bold text-amber-800 mb-3 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" /> Execution Instructions
                  </h4>
                  <ul className="space-y-2 text-amber-900/80 text-sm ml-7 list-disc">
                    <li>Print on Legal Size (Green) Ledger Paper.</li>
                    <li>Attach stamp duty receipt from authorized vendor.</li>
                    <li>Visit the local sub-registrar office for final signatures and notarization.</li>
                  </ul>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};