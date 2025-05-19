import './App.css';
import Header from './components/Header';
import ContactForm from './components/ContactForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <Header />
        <ContactForm />
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} - Todos os direitos reservados</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
