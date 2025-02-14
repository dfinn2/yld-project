export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 mt-auto">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
}
