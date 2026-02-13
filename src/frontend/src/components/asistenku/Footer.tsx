export default function Footer() {
  return (
    <footer className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center space-y-4">
          <img 
            src="/assets/asistenku-icon.png" 
            alt="Asistenku" 
            style={{ height: '24px' }}
            className="h-6"
          />
          
          <p className="text-sm text-gray-600">
            Asistenku © 2026 PT Asistenku Digital Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
