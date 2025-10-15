import React, { useState, useCallback } from 'react';
import { Upload, FileText, Trash2, Download, Eye, AlertTriangle, CheckCircle, DollarSign, Building2, Search, Shield, TrendingUp, Globe, Flag, UserCheck } from 'lucide-react';

const ABACPrototype = () => {
  const [documents, setDocuments] = useState([]);
  const [activeTab, setActiveTab] = useState('upload');
  const [showDemo, setShowDemo] = useState(false);

  const demoDocuments = [
    { id: '1', name: 'Service_Proposal_ABC_Consulting.pdf', type: 'application/pdf', size: 845760, status: 'completed', docType: 'proposal' },
    { id: '2', name: 'Signed_Service_Agreement_2024.pdf', type: 'application/pdf', size: 456789, status: 'completed', docType: 'contract' },
    { id: '3', name: 'Background_Check_ABC_Consulting.pdf', type: 'application/pdf', size: 234567, status: 'completed', docType: 'background_check' },
    { id: '4', name: 'Purchase_Order_PO_2024_001.pdf', type: 'application/pdf', size: 189440, status: 'completed', docType: 'purchase_order' },
    { id: '5', name: 'Deliverable_Report_July_2024.pdf', type: 'application/pdf', size: 678901, status: 'completed', docType: 'deliverable' },
    { id: '6', name: 'Consultant_Timesheet_Hours.xlsx', type: 'application/vnd.ms-excel', size: 123456, status: 'completed', docType: 'timesheet' },
    { id: '7', name: 'Invoice_INV_2024_00147.pdf', type: 'application/pdf', size: 245760, status: 'completed', docType: 'invoice' },
    { id: '8', name: 'Delivery_Receipt_20240815.pdf', type: 'application/pdf', size: 167890, status: 'completed', docType: 'receipt' },
    { id: '9', name: 'Payment_Confirmation_TRF_20240820.jpg', type: 'image/jpeg', size: 156672, status: 'completed', docType: 'payment_proof' }
  ];

  const demoAnalysis = {
    transactionId: 'TRX-2024-ABC-001',
    summary: {
      vendor: 'ABC Consulting Services Ltd.',
      serviceType: 'Strategic business consulting',
      totalAmount: 7260,
      currency: 'USD',
      period: 'July 2024',
      jurisdiction: 'International (UK)',
      riskLevel: 'HIGH'
    },
    redFlags: [
      {
        category: 'High Risk - Individual Beneficiary',
        severity: 'CRITICAL',
        description: 'The vendor is effectively a single-person entity with one director and shareholder. Payments go directly to an account controlled by an individual.',
        legalBasis: 'DOJ FCPA Guide - Red Flag: Payments to entities controlled by individuals instead of established companies',
        recommendation: 'Verify that John Smith has no ties to public officials or decision-makers'
      },
      {
        category: 'Intangible Services',
        severity: 'HIGH',
        description: 'Strategic consulting services are difficult to quantify and verify. The deliverable shows low quality and questionable value.',
        legalBasis: 'DOJ FCPA Guide - Red Flag: Consulting services without clear and measurable deliverables',
        recommendation: 'Implement detailed deliverable evaluation before each payment'
      },
      {
        category: 'Disproportionate Amount',
        severity: 'HIGH',
        description: 'USD 150/hour is significantly above market rate. Deliverable quality does not justify compensation.',
        legalBasis: 'DOJ FCPA Guide - Red Flag: Excessive compensation not in line with market rates',
        recommendation: 'Conduct rate benchmarking with similar vendors'
      },
      {
        category: 'High-Risk Jurisdiction',
        severity: 'MEDIUM',
        description: 'Vendor registered in UK but providing services related to LATAM expansion. Lack of verifiable physical presence.',
        legalBasis: 'DOJ FCPA Guide - Red Flag: Use of intermediaries in offshore jurisdictions',
        recommendation: 'Verify genuine commercial reason for offshore structure'
      },
      {
        category: 'Lack of Oversight',
        severity: 'MEDIUM',
        description: 'Timesheet is self-reported without independent validation. No evidence of work supervision.',
        legalBasis: 'DOJ FCPA Resource Guide - Poor control over external consultants',
        recommendation: 'Implement hours and deliverables validation process'
      },
      {
        category: 'Limited Due Diligence',
        severity: 'MEDIUM',
        description: 'Background check identifies important alerts but no follow-up was conducted.',
        legalBasis: 'DOJ FCPA Guide - Effective Compliance Program must include risk-based due diligence',
        recommendation: 'Enhanced Due Diligence before continuing business relationship'
      }
    ],
    webVerification: {
      sourcesConsulted: ['UK Companies House', 'LinkedIn', 'Google Business', 'Industry directories'],
      findings: [
        'ABC Consulting Services Ltd. registered in 2016',
        'John Smith - LinkedIn profile with 500+ connections',
        'No physical office listed, registered address is virtual office service',
        'No significant corporate web presence',
        'No publications, articles, or evidence of expertise found',
        'Previous client references not verifiable'
      ],
      conclusion: 'QUESTIONABLE - Lack of evidence of experience and technical capacity to justify fees'
    },
    overallAssessment: {
      riskScore: 8.5,
      level: 'HIGH RISK',
      finalRecommendation: 'SUSPEND PAYMENTS - Conduct thorough investigation before continuing',
      immediateActions: [
        'Freeze pending payments until investigation is complete',
        'Interview decision-makers about vendor selection',
        'Verify if John Smith has ties to officials or decision-makers',
        'Investigate how vendor was discovered and who recommended them',
        'Review if there are other similar payments to this entity',
        'Assess if internal staff has personal/family relationship with vendor'
      ]
    }
  };

  const handleFileUpload = useCallback((files) => {
    const newDocuments = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      status: 'pending'
    }));
    setDocuments(prev => [...prev, ...newDocuments]);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const loadDemo = () => {
    setDocuments(demoDocuments);
    setActiveTab('results');
    setShowDemo(true);
  };

  const clearAll = () => {
    setDocuments([]);
    setShowDemo(false);
    setActiveTab('upload');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };

  const getRiskBadge = (risk) => {
    const colors = {
      'CRITICAL': 'bg-red-600 text-white',
      'HIGH': 'bg-red-100 text-red-800 border-red-200',
      'MEDIUM': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'LOW': 'bg-green-100 text-green-800 border-green-200'
    };
    return (
      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${colors[risk] || 'bg-gray-100 text-gray-800'}`}>
        {risk}
      </span>
    );
  };

  const getDocTypeLabel = (docType) => {
    const labels = {
      'proposal': 'Service Proposal',
      'contract': 'Contract',
      'background_check': 'Background Check',
      'purchase_order': 'Purchase Order',
      'deliverable': 'Deliverable',
      'timesheet': 'Timesheet',
      'invoice': 'Invoice',
      'receipt': 'Receipt',
      'payment_proof': 'Payment Proof'
    };
    return labels[docType] || docType;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ABAC Transaction Analyzer
          <span className="ml-3 text-lg font-normal bg-blue-100 text-blue-800 px-3 py-1 rounded-full">PROTOTYPE</span>
        </h1>
        <p className="text-gray-600 mb-4">
          Intelligent system for analyzing commercial documentation to identify corruption risks according to ABAC standards
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <FileText className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-semibold text-blue-900">Document Analysis</h3>
            <p className="text-sm text-blue-700">Automated data extraction from 9+ document types</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <Search className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-semibold text-purple-900">Web Verification</h3>
            <p className="text-sm text-purple-700">Automatic validation of vendors and suitability</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <Shield className="h-8 w-8 text-orange-600 mb-2" />
            <h3 className="font-semibold text-orange-900">ABAC Red Flags</h3>
            <p className="text-sm text-orange-700">Detection of indicators per DOJ Guidelines</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-semibold text-green-900">Risk Scoring</h3>
            <p className="text-sm text-green-700">Quantitative assessment and recommendations</p>
          </div>
        </div>
      </div>

      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-900">🎯 View Full Demo</h3>
            <p className="text-blue-700">Real case analysis: Consulting services with multiple red flags</p>
          </div>
          <div className="space-x-2">
            <button
              onClick={loadDemo}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
            >
              Load Demo
            </button>
            {(documents.length > 0 || showDemo) && (
              <button
                onClick={clearAll}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('upload')}
          className={`py-2 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'upload' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          1. Upload Documents
        </button>
        <button
          onClick={() => setActiveTab('results')}
          className={`py-2 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'results' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          2. Extracted Data ({documents.length})
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`py-2 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'analysis' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          3. ABAC Analysis
        </button>
        <button
          onClick={() => setActiveTab('redflags')}
          className={`py-2 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'redflags' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          4. Red Flags
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`py-2 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${
            activeTab === 'recommendations' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          5. Recommendations
        </button>
      </div>

      {activeTab === 'upload' && (
        <div className="space-y-6">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors"
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Drag transaction documents here</h3>
            <p className="text-gray-600 mb-2">Required document types:</p>
            <div className="grid grid-cols-3 gap-2 max-w-2xl mx-auto mb-4 text-sm text-gray-600">
              <div>• Service proposal</div>
              <div>• Signed contract</div>
              <div>• Background check</div>
              <div>• Purchase order</div>
              <div>• Deliverables</div>
              <div>• Timesheet/hours</div>
              <div>• Invoice</div>
              <div>• Receipt</div>
              <div>• Payment confirmation</div>
            </div>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls,.ppt,.pptx,.doc,.docx"
              onChange={(e) => handleFileUpload(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              Select files
            </label>
            <p className="text-xs text-gray-500 mt-2">PDF, images, Excel, Word, PowerPoint up to 10MB</p>
          </div>

          {documents.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Uploaded Documents ({documents.length})
                </h3>
                <button
                  onClick={() => {
                    setActiveTab('results');
                    if (!showDemo) setShowDemo(true);
                  }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium"
                >
                  Analyze with AI
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 bg-white rounded-md border">
                    <div className="flex items-center space-x-3 flex-1">
                      {getStatusIcon(doc.status)}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-xs text-gray-500">{formatFileSize(doc.size)}</p>
                          {doc.docType && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                              {getDocTypeLabel(doc.docType)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setDocuments(prev => prev.filter(d => d.id !== doc.id))}
                      className="text-red-600 hover:text-red-800 ml-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'results' && (
        <div className="space-y-6">
          {!showDemo ? (
            <div className="text-center py-12">
              <Eye className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results yet</h3>
              <p className="text-gray-600 mb-4">Upload documents or use the demo</p>
              <button
                onClick={loadDemo}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                View Demo
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Transaction: {demoAnalysis.transactionId}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {demoAnalysis.summary.vendor} - {demoAnalysis.summary.serviceType}
                  </p>
                </div>
                <button
                  onClick={() => alert('Would export Excel with all structured data')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export to Excel
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <Building2 className="h-8 w-8 text-blue-500" />
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Vendor</p>
                      <p className="text-sm font-medium">{demoAnalysis.summary.vendor}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <DollarSign className="h-8 w-8 text-green-500" />
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Total Amount</p>
                      <p className="text-lg font-bold">{demoAnalysis.summary.currency} {demoAnalysis.summary.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <Globe className="h-8 w-8 text-purple-500" />
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Jurisdiction</p>
                      <p className="text-sm font-medium">{demoAnalysis.summary.jurisdiction}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Risk Level</p>
                      {getRiskBadge(demoAnalysis.summary.riskLevel)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Documents Analyzed</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="p-3 bg-gray-50 rounded border">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{getDocTypeLabel(doc.docType)}</p>
                          <p className="text-xs text-gray-500">{doc.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'analysis' && (
        <div className="space-y-6">
          {!showDemo ? (
            <div className="text-center py-12">
              <Shield className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No data for analysis</h3>
              <button onClick={loadDemo} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Load Demo
              </button>
            </div>
          ) : (
            <div className="bg-white border rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b bg-purple-50">
                <div className="flex items-center">
                  <Search className="h-6 w-6 text-purple-600 mr-2" />
                  <h3 className="text-lg font-medium text-purple-900">Web Verification - Vendor Suitability</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Sources Consulted</h4>
                    <ul className="space-y-2">
                      {demoAnalysis.webVerification.sourcesConsulted.map((source, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {source}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-900 mb-2">Suitability Conclusion</h4>
                  <p className="text-red-800">{demoAnalysis.webVerification.conclusion}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'redflags' && (
        <div className="space-y-6">
          {!showDemo ? (
            <div className="text-center py-12">
              <Flag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No data for analysis</h3>
              <button onClick={loadDemo} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Load Demo
              </button>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-900 mb-2">
                  🚨 {demoAnalysis.redFlags.length} Red Flags Identified
                </h3>
                <p className="text-red-700">Analysis per DOJ FCPA Corporate Enforcement Policy and Resource Guide</p>
              </div>

              <div className="space-y-4">
                {demoAnalysis.redFlags.map((flag, idx) => (
                  <div key={idx} className="bg-white border rounded-lg overflow-hidden">
                    <div className={`px-6 py-3 flex items-center justify-between ${
                      flag.severity === 'CRITICAL' ? 'bg-red-100 border-b border-red-200' :
                      flag.severity === 'HIGH' ? 'bg-orange-100 border-b border-orange-200' :
                      'bg-yellow-100 border-b border-yellow-200'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className={`h-6 w-6 ${
                          flag.severity === 'CRITICAL' ? 'text-red-600' :
                          flag.severity === 'HIGH' ? 'text-orange-600' :
                          'text-yellow-600'
                        }`} />
                        <h4 className="font-semibold text-gray-900">{flag.category}</h4>
                      </div>
                      {getRiskBadge(flag.severity)}
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Description</p>
                        <p className="text-gray-700">{flag.description}</p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded p-3">
                        <p className="text-sm font-medium text-blue-900 mb-1">Legal Basis (DOJ/ABAC)</p>
                        <p className="text-sm text-blue-800">{flag.legalBasis}</p>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded p-3">
                        <p className="text-sm font-medium text-green-900 mb-1">Recommendation</p>
                        <p className="text-sm text-green-800">{flag.recommendation}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'recommendations' && (
        <div className="space-y-6">
          {!showDemo ? (
            <div className="text-center py-12">
              <UserCheck className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No data for analysis</h3>
              <button onClick={loadDemo} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Load Demo
              </button>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">ABAC Risk Score</h3>
                  <div className="text-6xl font-bold mb-2">{demoAnalysis.overallAssessment.riskScore}</div>
                  <div className="text-xl">{demoAnalysis.overallAssessment.level}</div>
                </div>
              </div>

              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
                <div className="flex items-start">
                  <AlertTriangle className="h-8 w-8 text-red-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-red-900 mb-2">Final Recommendation</h3>
                    <p className="text-lg text-red-800 font-medium">{demoAnalysis.overallAssessment.finalRecommendation}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b bg-orange-50">
                  <h3 className="text-lg font-medium text-orange-900">⚡ Immediate Actions Required</h3>
                </div>
                <div className="p-6">
                  <ol className="space-y-3">
                    {demoAnalysis.overallAssessment.immediateActions.map((action, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-orange-100 text-orange-800 font-bold text-sm mr-3 flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-gray-700 pt-0.5">{action}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="bg-gray-50 border rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Next Steps</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => alert('Would export full PDF report for compliance')}
                    className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 font-medium"
                  >
                    <Download className="inline h-5 w-5 mr-2" />
                    Export Full Report
                  </button>
                  <button
                    onClick={() => alert('Would send alert to compliance team')}
                    className="bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 font-medium"
                  >
                    <AlertTriangle className="inline h-5 w-5 mr-2" />
                    Alert Compliance
                  </button>
                  <button
                    onClick={() => alert('Would initiate investigation workflow')}
                    className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 font-medium"
                  >
                    <Search className="inline h-5 w-5 mr-2" />
                    Start Investigation
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ABACPrototype;
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Findings</h4>
                    <ul className="space-y-2">
                      {demoAnalysis.webVerification.findings.map((finding, idx) => (
                        <li key={idx} className="text-sm text-gray-700">• {finding}</li>
                      ))}
                    </ul>
                  </div>
