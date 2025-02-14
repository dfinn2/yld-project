import Link from 'next/link';
import Slider from 'react-slick';

export default function HeroSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center border-b border-gray-300">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Protect Your Intellectual Property in China
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Secure your ideas and innovations with expert legal services and tailored document templates.
        </p>
        <Link href="/products/NNNBuilder" legacyBehavior>
          <a className="inline-block bg-blue-600 text-black font-semibold py-3 px-6 rounded-md hover:bg-blue-700 transition">
            Get Started
          </a>
        </Link>
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Testimonials</h2>
          <Slider {...settings}>
            <div>
              <p className="text-lg">"This service is amazing! It helped me protect my business in China effortlessly." - Happy Client</p>
            </div>
            <div>
              <p className="text-lg">"Excellent service and support. Highly recommend!" - Satisfied Customer</p>
            </div>
            <div>
              <p className="text-lg">"Professional and efficient. Great experience!" - Business Owner</p>
            </div>
            <div>
              <p className="text-lg">"Top-notch legal services for IP protection." - Entrepreneur</p>
            </div>
            <div>
              <p className="text-lg">"Reliable and trustworthy. Will use again." - Client</p>
            </div>
            <div>
              <p className="text-lg">"Outstanding service and results." - Happy Client</p>
            </div>
          </Slider>
        </div>
      </div>
    </section>
  );
}
