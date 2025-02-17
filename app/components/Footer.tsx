import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 mt-auto">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* First Column: Address and Logo */}
        <div>
          <Image src="/logo-placeholder.png" alt="Company Logo" className="mx-auto md:mx-0 mb-4" />
          <address className="not-italic">
            <p>Your Company Name</p>
            <p>1234 Street Name</p>
            <p>City, State, ZIP</p>
            <p>Country</p>
          </address>
        </div>
        {/* Second Column: Site Map */}
        <div>
          <h3 className="font-bold mb-4">Site Map</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/services" className="hover:underline">Services</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link href="/learn" className="hover:underline">Learn</Link></li>
          </ul>
        </div>
        {/* Third Column: Legal Links */}
        <div>
          <h3 className="font-bold mb-4">Legal</h3>
          <ul className="space-y-2">
            <li><Link href="/terms" className="hover:underline">Terms and Conditions</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>
      {/* Full-width Copyright Section */}
      <div className="bg-gray-900 text-gray-400 py-4 mt-6">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
