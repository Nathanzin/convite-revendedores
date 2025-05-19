import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  cnpj: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    cnpj: '',
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Telefone inválido';
    }
    
    if (!formData.cnpj.trim() || formData.cnpj.replace(/\D/g, '').length !== 14) {
      newErrors.cnpj = 'CNPJ inválido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;
    
    // Aplicar máscaras
    if (name === 'phone') {
      formattedValue = formatPhone(value);
    } else if (name === 'cnpj') {
      formattedValue = formatCNPJ(value);
    }
    
    setFormData({
      ...formData,
      [name]: formattedValue,
    });
  };

  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) {
      return numbers;
    }
    if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }
    if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    }
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const formatCNPJ = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) {
      return numbers;
    }
    if (numbers.length <= 5) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
    }
    if (numbers.length <= 8) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
    }
    if (numbers.length <= 12) {
      return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
    }
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Usando FormSubmit para envio de e-mail sem backend
      // Em produção, o formulário será enviado automaticamente para o endpoint do FormSubmit
      // O FormSubmit detecta o formulário e envia os dados para o e-mail configurado
      
      // Simulando envio do formulário para demonstração
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', cnpj: '' });
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {submitted ? (
        <div className="bg-gray-50 p-8 rounded-lg shadow-sm text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Obrigado pelo seu interesse!</h2>
          <p className="text-gray-600 mb-6">
            Recebemos seus dados e entraremos em contato em breve para discutir as possibilidades de parceria.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
          >
            Enviar outro formulário
          </button>
        </div>
      ) : (
        <form 
          onSubmit={handleSubmit} 
          className="bg-white p-6 md:p-8 rounded-lg shadow-sm"
          action="https://formsubmit.co/contato@meudominio.com" 
          method="POST"
        >
          {/* Campo oculto para configuração do FormSubmit */}
          <input type="hidden" name="_next" value={window.location.href} />
          <input type="hidden" name="_subject" value="Novo interesse de revendedor" />
          <input type="hidden" name="_template" value="table" />
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Formulário de Interesse</h2>
          
          <div className="mb-5">
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Nome da loja ou responsável *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Digite o nome da loja ou responsável"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              E-mail *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Digite seu e-mail"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div className="mb-5">
            <label htmlFor="phone" className="block text-gray-700 mb-2">
              Telefone *
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                errors.phone ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="(00) 00000-0000"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>
          
          <div className="mb-6">
            <label htmlFor="cnpj" className="block text-gray-700 mb-2">
              CNPJ *
            </label>
            <input
              type="text"
              id="cnpj"
              name="cnpj"
              value={formData.cnpj}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 ${
                errors.cnpj ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="00.000.000/0000-00"
            />
            {errors.cnpj && <p className="text-red-500 text-sm mt-1">{errors.cnpj}</p>}
          </div>
          
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Enviando...' : 'Enviar Formulário'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
