import React, { useState, useCallback } from 'react';
import {
  Upload, FileText, Trash2, Download, Eye, AlertTriangle, CheckCircle,
  DollarSign, Building2, Search, Shield, TrendingUp, Globe, Flag, UserCheck, X
} from 'lucide-react';

const ABACPrototype = () => {
  const [documents, setDocuments] = useState([]);
  const [activeTab, setActiveTab] = useState('upload');
  const [showDemo, setShowDemo] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null); // <- para el modal

  const demoDocuments = [
    { id: '1', name: 'Propuesta_Servicios_ABC_Consulting.pdf', type: 'application/pdf', size: 845760, status: 'completed', docType: 'proposal', date: '2024-06-15', signers: 'John Smith (Director)' },
    { id: '2', name: 'Contrato_Servicios_Firmado_2024.pdf', type: 'application/pdf', size: 456789, status: 'completed', docType: 'contract', date: '2024-07-01', signers: 'Juan Pérez (CFO) – John Smith (Director ABC)' },
    { id: '3', name: 'Background_Check_ABC_Consulting.pdf', type: 'application/pdf', size: 234567, status: 'completed', docType: 'background_check', date: '2024-06-20', signers: 'Compliance' },
    { id: '4', name: 'Orden_Compra_PO_2024_001.pdf', type: 'application/pdf', size: 189440, status: 'completed', docType: 'purchase_order', date: '2024-07-05', signers: 'Compras' },
    { id: '5', name: 'Informe_Entregable_Julio_2024.pdf', type: 'application/pdf', size: 678901, status: 'completed', docType: 'deliverable', date: '2024-07-28', signers: 'ABC Consulting' },
    { id: '6', name: 'Timesheet_Consultant_Hours.xlsx', type: 'application/vnd.ms-excel', size: 123456, status: 'completed', docType: 'timesheet', date: '2024-07-31', signers: 'John Smith' },
    { id: '7', name: 'Factura_INV_2024_00147.pdf', type: 'application/pdf', size: 245760, status: 'completed', docType: 'invoice', date: '2024-08-01', signers: 'ABC Consulting' },
    { id: '8', name: 'Remito_Entrega_20240815.pdf', type: 'application/pdf', size: 167890, status: 'completed', docType: 'receipt', date: '2024-08-15', signers: 'Logística' },
    { id: '9', name: 'Comprobante_Pago_TRF_20240820.jpg', type: 'image/jpeg', size: 156672, status: 'completed', docType: 'payment_proof', date: '2024-08-20', signers: 'Tesorería' }
  ];

  // Datos DEMO del análisis general
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
        description: 'Single-person entity; pagos a cuenta controlada por un individuo.',
        legalBasis: 'DOJ FCPA Guide – Payments to entities controlled by individuals',
        recommendation: 'Verificar vínculos con funcionarios'
      },
      {
        category: 'Intangible Services',
        severity: 'HIGH',
        description: 'Servicios intangibles difíciles de verificar; entregable de baja calidad.',
        legalBasis: 'DOJ FCPA Guide – Consulting sin entregables claros',
        recommendation: 'Evaluación detallada de entregables antes de cada pago'
      },
      {
        category: 'Disproportionate Amount',
        severity: 'HIGH',
        description: 'USD 150/h > mercado; calidad no justifica.',
        legalBasis: 'Excessive compensation vs market',
        recommendation: 'Benchmarking de tarifas'
      },
      {
        category: 'High-Risk Jurisdiction',
        severity: 'MEDIUM',
        description: 'Registrada en UK, servicios LATAM, sin presencia física verificable.',
        legalBasis: 'Intermediarios/offshore',
        recommendation: 'Justificación comercial genuina'
      },
      {
        category: 'Lack of Oversight',
        severity: 'MEDIUM',
        description: 'Timesheet auto reportado; sin supervisión.',
        legalBasis: 'Controles débiles sobre consultores',
        recommendation: 'Validación de horas y entregables'
      },
      {
        category: 'Limited Due Diligence',
        severity: 'MEDIUM',
        description: 'Alerts en background check sin seguimiento.',
        legalBasis: 'Risk-based DD requerido',
        recommendation: 'EDD antes de continuar'
      }
    ],
    webVerification: {
      sourcesConsulted: ['UK Companies House', 'LinkedIn', 'Google Business', 'Industry directories'],
      findings: [
        'Registrada en 2016',
        'LinkedIn con 500+ conexiones',
        'Dirección registrada es oficina virtual',
        'Web corporativa mínima',
        'Sin publicaciones o evidencia de expertise',
        'Referencias de clientes no verificables'
      ],
      conclusion: 'QUESTIONABLE – Evidencia insuficiente de capacidad técnica'
    },
    overallAssessment: {
      riskScore: 8.5,
      level: 'HIGH RISK',
      finalRecommendation: 'SUSPENDER PAGOS hasta investigar',
      immediateActions: [
        'Congelar pagos pendientes',
        'Entrevistar decisores sobre selección del proveedor',
        'Verificar lazos con funcionarios',
        'Investigar origen del proveedor y recomendadores',
        'Buscar pagos similares a esta entidad',
        'Evaluar posibles vínculos personales del staff'
      ]
    }
  };

  // Mapa con "datos extraídos" por tipo de documento (para el modal)
  const extractedByType = {
    proposal: {
      title: 'Propuesta de Servicios',
      fields: [
        { k: 'alcanceServicios', v: 'Servicios de consultoría estratégica para expansión en LATAM' },
        { k: 'entregables', v: 'Análisis de mercado, Plan de entrada, Identificación de socios locales' },
        { k: 'duracion', v: '3 meses' },
        { k: 'honorariosPropuestos', v: 'USD 7,000' },
        { k: 'estructuraPago', v: 'Mensual' }
      ]
    },
    contract: {
      title: 'Contrato Firmado',
      fields: [
        { k: 'clausulasAnticorrupcion', v: 'Presente – Sección 8.3 (prohíbe pagos indebidos)' },
        { k: 'terminosRescision', v: '30 días previo aviso' },
        { k: 'jurisdiccion', v: 'UK law – arbitraje Londres' }
      ]
    },
    background_check: {
      title: 'Background Check',
      fields: [
        { k: 'beneficiarioFinal', v: 'John Smith (100% accionista)' },
        { k: 'sanciones', v: 'No listados en sanciones; PEP: no' },
        { k: 'hallazgos', v: 'Baja huella corporativa; dirección virtual' }
      ]
    },
    purchase_order: {
      title: 'Orden de Compra',
      fields: [
        { k: 'po', v: 'PO-2024-001' },
        { k: 'monto', v: 'USD 7,260' },
        { k: 'entregables', v: '3 entregables mensuales' }
      ]
    },
    deliverable: {
      title: 'Entregable',
      fields: [
        { k: 'calidad', v: 'Baja – contenido genérico' },
        { k: 'evidenciaTrabajo', v: 'No se adjuntan fuentes ni datasets' }
      ]
    },
    timesheet: {
      title: 'Timesheet',
      fields: [
        { k: 'horasReportadas', v: '48 hs (Julio)' },
        { k: 'tarifa', v: 'USD 150/hora' },
        { k: 'aprobacion', v: 'Sin aprobación de supervisor' }
      ]
    },
    invoice: {
      title: 'Factura',
      fields: [
        { k: 'monto', v: 'USD 7,260' },
        { k: 'concepto', v: 'Consultoría – Mes Julio' },
        { k: 'condiciones', v: 'Pago 15 días' }
      ]
    },
    receipt: {
      title: 'Remito/Acta de Recepción',
      fields: [
        { k: 'recepcion', v: 'Confirmada por área de negocio' },
        { k: 'observaciones', v: 'Sin evidencia adjunta' }
      ]
    },
    payment_proof: {
      title: 'Comprobante de Pago',
      fields: [
        { k: 'metodo', v: 'Transferencia bancaria' },
        { k: 'banco', v: 'UK Bank (cuenta beneficiario John Smith)' },
        { k: 'fecha', v: '2024-08-20' }
      ]
    }
  };

  const handleFileUpload = useCallback((files) => {
    const newDocs = Array.from(files).map(file => ({
      id: Math.random().toString(36).slice(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
      status: 'completed'
    }));
    setDocuments(prev => [...prev, ...newDocs]);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    handleFileUpload(e.dataTransfer.files);
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e) => { e.preventDefault(); }, []);

  const loadDemo = () => {
    setDocuments(demoDocuments);
    setActiveTab('results');
    setShowDemo(true);
  };

  const clearAll = () => {
    setDocuments([]);
    setShowDemo(false);
    setActiveTab('upload');
    setSelectedDoc(null);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024, sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
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
      CRITICAL: 'bg-red-600 text-white',
      HIGH: 'bg-red-100 text-red-800 border-red-200',
      MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      LOW: 'bg-green-100 text-green-800 border-green-200'
    };
    return <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${colors[risk] || 'bg-gray-100 text-gray-800'}`}>{risk}</span>;
  };

  const getDocTypeLabel = (docType) => {
    const labels = {
      proposal: 'Propuesta de Servicios',
      contract: 'Contrato',
      background_check: 'Background Check',
      purchase_order: 'Orden de Compra',
      deliverable: 'Entregable',
      timesheet: 'Timesheet',
      invoice: 'Factura',
      receipt: 'Remito/Recepción',
      payment_proof: 'Comprobante de Pago'
    };
    return labels[docType] || docType;
  };

  // Modal con detalles
  const DetailModal = ({ doc, onClose }) => {
    if (!doc) return null;
    const meta = extractedByType[doc.docType] || { title: getDocTypeLabel(doc.docType), fields: [] };
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30" onClick={onClose} />
        <div className="relative w-full max-w-3xl mx-4 bg-white rounded-xl shadow-xl border">
          <div className="px-5 py-3 border-b flex items-center justify-between">
            <h3 className="text-lg font-semibold">{meta.title}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700"><X className="h-5 w-5" /></button>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Documento</p>
                <p className="font-medium">{doc.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Fecha</p>
                <p className="font-medium">{doc.date || '-'}</p>
              </div>
              <div>
                <p className="text-gray-500">Firmantes</p>
                <p className="font-medium">{doc.signers || '-'}</p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-900 mb-2">Datos Extraídos</p>
              <div className="bg-gray-50 border rounded-lg">
                {meta.fields.map((f, i) => (
                  <div key={i} className="px-4 py-2 border-b last:border-b-0 text-sm">
                    <span className="font-semibold mr-2">{f.k}:</span>
                    <span className="text-gray-700">{f.v}</span>
                  </div>
                ))}
                {meta.fields.length === 0 && (
                  <div className="px-4 py-6 text-sm text-gray-500">Sin datos mapeados para este tipo de documento (demo).</div>
                )}
              </div>
            </div>
          </div>
          <div className="px-5 py-3 border-t flex justify-end">
            <button onClick={onClose} className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700">Cerrar</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white min-h-screen">
      {/* Header & cards */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          ABAC Transaction Analyzer
          <span className="ml-3 text-lg font-normal bg-blue-100 text-blue-800 px-3 py-1 rounded-full">PROTOTYPE</span>
        </h1>
        <p className="text-gray-600 mb-4">Intelligent system for analyzing commercial documentation to identify corruption risks according to ABAC standards</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200"><FileText className="h-8 w-8 text-blue-600 mb-2" /><h3 className="font-semibold text-blue-900">Document Analysis</h3><p className="text-sm text-blue-700">9+ tipos</p></div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200"><Search className="h-8 w-8 text-purple-600 mb-2" /><h3 className="font-semibold text-purple-900">Web Verification</h3><p className="text-sm text-purple-700">Validación automática</p></div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200"><Shield className="h-8 w-8 text-orange-600 mb-2" /><h3 className="font-semibold text-orange-900">ABAC Red Flags</h3><p className="text-sm text-orange-700">DOJ Guidelines</p></div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200"><TrendingUp className="h-8 w-8 text-green-600 mb-2" /><h3 className="font-semibold text-green-900">Risk Scoring</h3><p className="text-sm text-green-700">Cuantitativo</p></div>
        </div>
      </div>

      {/* CTA Demo */}
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-900">🎯 Ver Demostración Completa</h3>
            <p className="text-blue-700">Caso real de análisis: consultoría con múltiples red flags</p>
          </div>
          <div className="space-x-2">
            <button onClick={loadDemo} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-medium">Cargar Demo</button>
            {(documents.length > 0 || showDemo) && (
              <button onClick={clearAll} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">Limpiar</button>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
        {['upload','results','analysis','redflags','recommendations'].map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`py-2 px-4 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === t ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            {t === 'upload' ? '1. Cargar Documentos'
              : t === 'results' ? `2. Datos Extraídos (${documents.length})`
              : t === 'analysis' ? '3. Análisis FCPA'
              : t === 'redflags' ? '4. Red Flags'
              : '5. Recomendaciones'}
          </button>
        ))}
      </div>

      {/* Upload */}
      {activeTab === 'upload' && (
        <div className="space-y-6">
          <div onDrop={handleDrop} onDragOver={handleDragOver}
               className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-gray-400 transition-colors">
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Arrastrá documentos acá</h3>
            <p className="text-gray-600 mb-2">Tipos requeridos: propuesta, contrato, background check, OC, entregables, timesheet, factura, remito, comprobante</p>
            <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.xlsx,.xls,.ppt,.pptx,.doc,.docx"
                   onChange={(e) => handleFileUpload(e.target.files)} className="hidden" id="file-upload" />
            <label htmlFor="file-upload"
                   className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
              Seleccionar archivos
            </label>
            <p className="text-xs text-gray-500 mt-2">Hasta 10MB</p>
          </div>
        </div>
      )}

      {/* Results: tabla + modal */}
      {activeTab === 'results' && (
        <div className="space-y-6">
          {!showDemo ? (
            <div className="text-center py-12">
              <Eye className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aún sin resultados</h3>
              <p className="text-gray-600 mb-4">Cargá documentos o usa la demo</p>
              <button onClick={loadDemo} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Ver Demo</button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Transacción: {demoAnalysis.transactionId}</h3>
                  <p className="text-sm text-gray-600">{demoAnalysis.summary.vendor} – {demoAnalysis.summary.serviceType}</p>
                </div>
                <button onClick={() => alert('Exportaría Excel con datos estructurados')}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">
                  <Download className="h-4 w-4 mr-2" /> Exportar a Excel
                </button>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <Building2 className="h-8 w-8 text-blue-500" />
                    <div className="text-right"><p className="text-xs text-gray-500">Proveedor</p><p className="text-sm font-medium">{demoAnalysis.summary.vendor}</p></div>
                  </div>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <DollarSign className="h-8 w-8 text-green-500" />
                    <div className="text-right"><p className="text-xs text-gray-500">Monto Total</p>
                      <p className="text-lg font-bold">{demoAnalysis.summary.currency} {demoAnalysis.summary.totalAmount.toLocaleString()}</p></div>
                  </div>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <Globe className="h-8 w-8 text-purple-500" />
                    <div className="text-right"><p className="text-xs text-gray-500">Jurisdicción</p><p className="text-sm font-medium">{demoAnalysis.summary.jurisdiction}</p></div>
                  </div>
                </div>
                <div className="bg-white border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                    <div className="text-right"><p className="text-xs text-gray-500">Nivel de Riesgo</p>{getRiskBadge(demoAnalysis.summary.riskLevel)}</div>
                  </div>
                </div>
              </div>

              {/* Tabla documentos */}
              <div className="bg-white border rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b"><h3 className="text-lg font-medium text-gray-900">Datos Extraídos por Documento</h3></div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo Documento</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Archivo</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Fecha</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Firmantes</th>
                        <th className="px-6 py-3" />
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {documents.map(doc => (
                        <tr key={doc.id} className="hover:bg-gray-50">
                          <td className="px-6 py-3 text-sm text-gray-700">{getDocTypeLabel(doc.docType) || '-'}</td>
                          <td className="px-6 py-3 text-sm font-medium text-gray-900 truncate max-w-md">{doc.name}</td>
                          <td className="px-6 py-3 text-sm text-gray-700">{doc.date || '-'}</td>
                          <td className="px-6 py-3 text-sm text-gray-700">{doc.signers || '-'}</td>
                          <td className="px-6 py-3 text-right">
                            <button onClick={() => setSelectedDoc(doc)}
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium">Ver detalles</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Modal */}
              {selectedDoc && <DetailModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />}
            </>
          )}
        </div>
      )}

      {/* Analysis */}
      {activeTab === 'analysis' && (
        <div className="space-y-6">
          {!showDemo ? (
            <div className="text-center py-12">
              <Shield className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sin datos para analizar</h3>
              <button onClick={loadDemo} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Cargar Demo</button>
            </div>
          ) : (
            <div className="bg-white border rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b bg-purple-50 flex items-center">
                <Search className="h-6 w-6 text-purple-600 mr-2" />
                <h3 className="text-lg font-medium text-purple-900">Web Verification – Vendor Suitability</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Fuentes Consultadas</h4>
                    <ul className="space-y-2">
                      {demoAnalysis.webVerification.sourcesConsulted.map((s, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Hallazgos</h4>
                    <ul className="space-y-2">
                      {demoAnalysis.webVerification.findings.map((f, i) => (
                        <li key={i} className="text-sm text-gray-700">• {f}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-900 mb-2">Conclusión de Idoneidad</h4>
                  <p className="text-red-800">{demoAnalysis.webVerification.conclusion}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Red Flags */}
      {activeTab === 'redflags' && (
        <div className="space-y-6">
          {!showDemo ? (
            <div className="text-center py-12">
              <Flag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sin datos</h3>
              <button onClick={loadDemo} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Cargar Demo</button>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-900 mb-2">🚨 {demoAnalysis.redFlags.length} Red Flags identificadas</h3>
                <p className="text-red-700">Basado en DOJ FCPA Corporate Enforcement Policy & Resource Guide</p>
              </div>
              <div className="space-y-4">
                {demoAnalysis.redFlags.map((flag, idx) => (
                  <div key={idx} className="bg-white border rounded-lg overflow-hidden">
                    <div className={`px-6 py-3 flex items-center justify-between ${
                      flag.severity === 'CRITICAL' ? 'bg-red-100 border-b border-red-200'
                        : flag.severity === 'HIGH' ? 'bg-orange-100 border-b border-orange-200'
                        : 'bg-yellow-100 border-b border-yellow-200'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className={`h-6 w-6 ${
                          flag.severity === 'CRITICAL' ? 'text-red-600' :
                          flag.severity === 'HIGH' ? 'text-orange-600' : 'text-yellow-600'
                        }`} />
                        <h4 className="font-semibold text-gray-900">{flag.category}</h4>
                      </div>
                      {getRiskBadge(flag.severity)}
                    </div>
                    <div className="p-6 space-y-4">
                      <div><p className="text-sm font-medium text-gray-500 mb-1">Descripción</p><p className="text-gray-700">{flag.description}</p></div>
                      <div className="bg-blue-50 border border-blue-200 rounded p-3">
                        <p className="text-sm font-medium text-blue-900 mb-1">Base Legal (DOJ/ABAC)</p>
                        <p className="text-sm text-blue-800">{flag.legalBasis}</p>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded p-3">
                        <p className="text-sm font-medium text-green-900 mb-1">Recomendación</p>
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

      {/* Recommendations */}
      {activeTab === 'recommendations' && (
        <div className="space-y-6">
          {!showDemo ? (
            <div className="text-center py-12">
              <UserCheck className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Sin datos</h3>
              <button onClick={loadDemo} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Cargar Demo</button>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold mb-2">ABAC Risk Score</h3>
                <div className="text-6xl font-bold mb-2">{demoAnalysis.overallAssessment.riskScore}</div>
                <div className="text-xl">{demoAnalysis.overallAssessment.level}</div>
              </div>

              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
                <div className="flex items-start">
                  <AlertTriangle className="h-8 w-8 text-red-600 mr-3 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-red-900 mb-2">Recomendación Final</h3>
                    <p className="text-lg text-red-800 font-medium">{demoAnalysis.overallAssessment.finalRecommendation}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border rounded-lg overflow-hidden">
                <div className="px-6 py-4 border-b bg-orange-50"><h3 className="text-lg font-medium text-orange-900">⚡ Acciones Inmediatas</h3></div>
                <div className="p-6">
                  <ol className="space-y-3">
                    {demoAnalysis.overallAssessment.immediateActions.map((a, i) => (
                      <li key={i} className="flex items-start">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-orange-100 text-orange-800 font-bold text-sm mr-3">{i + 1}</span>
                        <span className="text-gray-700 pt-0.5">{a}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div className="bg-gray-50 border rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Next Steps</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button onClick={() => alert('Exportaría informe PDF completo')}
                          className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 font-medium"><Download className="inline h-5 w-5 mr-2" />Exportar Informe</button>
                  <button onClick={() => alert('Enviar alerta a Compliance')}
                          className="bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 font-medium"><AlertTriangle className="inline h-5 w-5 mr-2" />Alertar a Compliance</button>
                  <button onClick={() => alert('Iniciar workflow de investigación')}
                          className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 font-medium"><Search className="inline h-5 w-5 mr-2" />Iniciar Investigación</button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Modal mount */}
      {selectedDoc && <DetailModal doc={selectedDoc} onClose={() => setSelectedDoc(null)} />}
    </div>
  );
};

export default ABACPrototype;
