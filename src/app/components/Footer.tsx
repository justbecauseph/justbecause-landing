import Obfuscate from "react-obfuscate";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">JustBecause</h3>
            <p className="text-gray-400">
              Providing innovative IT solutions to help businesses thrive in the digital age.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-400">Email: <strong><Obfuscate email="info@justbecause.ph" /></strong></p>
            <p className="text-gray-400">Phone: <strong><Obfuscate tel="+63 952 480 7466" /></strong></p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-500">
          <p>© {new Date().getFullYear()} JustBecause IT Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}