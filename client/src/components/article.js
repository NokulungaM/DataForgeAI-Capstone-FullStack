import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Twitter, Mail, Rss, Smartphone, Share2, MessageCircle } from 'lucide-react'

export default function DishDashLayout() {
  return (
    <div className="max-w-4xl mx-auto">
      <header className="px-4 py-6 bg-white">
        <h1 className="text-3xl font-bold text-gray-700 mb-3">DishDash TASTE</h1>
        <nav className="flex flex-wrap gap-2 text-xs font-medium text-gray-600 mb-3">
          {/* <Link href="/" className="hover:text-gray-900">FRONT PAGE</Link>
          <Link href="/politics" className="hover:text-gray-900">POLITICS</Link>
          <Link href="/entertainment" className="hover:text-gray-900">ENTERTAINMENT</Link>
          <Link href="/business" className="hover:text-gray-900">BUSINESS</Link>
          <Link href="/media" className="hover:text-gray-900">MEDIA</Link>
          <Link href="/live" className="bg-red-600 text-white px-1.5 py-0.5">DISHDASH LIVE</Link>
          <Link href="/sections" className="hover:text-gray-900">ALL SECTIONS</Link> */}
        </nav>
      </header>
      <main className="flex flex-col lg:flex-row">
        <section className="lg:w-2/3 text-xs bg-gray-100 p-4">
          <h2 className="text-2xl font-bold mb-3">Here's Why You Need To Get To Know about Kasi Food</h2>
          <div className="text-xs text-gray-600 mb-3">
            <span>The DishDash Post</span> | By Nhlanhla Advocate Msibi
            <span className="ml-3">Posted: 10/24/2024 7:00 am EST</span>
          </div>
          <div className="relative w-full h-[250px] mb-3">
            <Image
              src="/kota1.jpg"
              alt="A delicious Kota sandwich"
              fill
              className="rounded-md object-cover"
              sizes="(max-width: 1024px) 100vw, 66vw"
            />
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <button 
              onClick={() => alert('Share clicked')} 
              className="flex items-center bg-blue-600 text-white px-2 py-1 rounded text-xs"
            >
              <Share2 className="w-3 h-3 mr-1" />
              Share
            </button>
            <button 
              onClick={() => alert('Tweet clicked')} 
              className="flex items-center bg-blue-400 text-white px-2 py-1 rounded text-xs"
            >
              <Twitter className="w-3 h-3 mr-1" />
              Tweet
            </button>
            {/* <button 
              onClick={() => alert('Comment clicked')} 
              className="flex items-center bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs"
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              Comment
            </button> */}
          </div>
          <div className="prose prose-sm max-w-none">
            <p>
              Kota is a popular South African street food originating from townships. Named after the quarter loaf of bread that forms its base, Kota is a hearty sandwich filled with a variety of ingredients. Typically, it includes fried chips (French fries), polony or Russian sausage, cheese, egg, and atchar (spicy pickle relish). This affordable and filling meal emerged during the apartheid era and has since become a beloved staple in South African cuisine. Kota embodies the 'kasi' (township) flavor, representing a unique blend of textures and tastes that reflect the country's culinary heritage and community spirit.
            </p>
            <h3 className="text-base font-semibold mt-3 mb-2">The Cultural Significance of Kota</h3>
            <p>
              Beyond its delicious taste, Kota holds immense cultural significance in South Africa. It represents the resilience and creativity of township communities, who created this filling meal during challenging times. Today, Kota stands as a symbol of South African street food culture, loved by people from all walks of life. Its popularity has even led to gourmet versions appearing in upscale restaurants, showcasing how this humble sandwich has transcended its origins to become a national culinary icon.
            </p>
            <h3 className="text-base font-semibold mt-3 mb-2">Experiencing Kota</h3>
            <p>
              To truly appreciate Kota, one must experience its unique combination of flavors and textures firsthand. The crispy bread exterior gives way to a medley of savory ingredients, creating a satisfying meal that's perfect for any time of day. Whether you're a local or a visitor to South Africa, trying a Kota is an essential part of experiencing the country's vibrant food scene. It's more than just a quick bite – it's a taste of history, community, and the innovative spirit of South African township life, all wrapped up in a quarter loaf of bread.
            </p>
          </div>
        </section>
        <aside className="lg:w-1/3 bg-white p-4">
          <div className="bg-gray-200 p-3 rounded-md mb-4">
            <h3 className="font-bold mb-2 text-xs">FOLLOW DISHDASH</h3>
            <div className="flex space-x-2 mb-3">
              <Mail className="w-4 h-4 text-gray-600 cursor-pointer" />
              <Facebook className="w-4 h-4 text-blue-600 cursor-pointer" />
              <Twitter className="w-4 h-4 text-blue-400 cursor-pointer" />
              <Rss className="w-4 h-4 text-orange-500 cursor-pointer" />
              <Smartphone className="w-4 h-4 text-gray-600 cursor-pointer" />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-1.5 text-xs border rounded mb-2"
            />
            <button 
              onClick={() => alert('Signup clicked')}
              className="w-full bg-gray-700 text-white py-1.5 rounded text-xs hover:bg-gray-600 transition-colors"
            >
              Sign me up!
            </button>
          </div>
          <div className="bg-gray-200 p-3 rounded-md">
            <h3 className="font-bold mb-2 text-xs">SUGGESTED FOR YOU</h3>
            <div className="space-y-2">
              {[
                "The world’s 50 best foods, link: <a>https://edition.cnn.com/travel/article/world-best-food-dishes/index.html</a>",
                "The Rise of Township Cuisine in South Africa",
                "How to Make the Perfect Kota at Home",
                "Exploring the Flavors of Atchar: South Africa's Spicy Relish",
                "From Township to Gourmet: The Evolution of Kasi Food"
              ].map((title, index) => (
                <div key={index} className="group">
                  <Link href="#" className="text-gray-700 group-hover:text-gray-900 transition-colors text-xs">
                    {title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  )
}