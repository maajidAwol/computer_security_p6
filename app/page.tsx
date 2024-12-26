// import Link from 'next/link'

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center p-24">
//       <h1 className="text-4xl font-bold mb-8">Security Project</h1>
//       <div className="flex space-x-4">
//         <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Login
//         </Link>
//         <Link href="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
//           Register
//         </Link>
//       </div>
//     </main>
//   )
// }

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Upload, Search, DollarSign, Smartphone, Layers, AlertTriangle } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            Secure & Smart Solutions
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Combining robust security with cutting-edge AI product identification
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="bg-blue-500 text-white p-6">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Security Project
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-6 text-gray-600">
                Our robust security system includes user authentication, role-based access control, and multi-factor authentication.
              </p>
              <div className="flex space-x-4">
                <Link href="/login">
                  <Button>Login</Button>
                </Link>
                <Link href="/register">
                  <Button variant="outline">Register</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="bg-teal-500 text-white p-6">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Search className="h-6 w-6" />
                Product Identification Tool
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="mb-6 text-gray-600">
                Our AI-powered tool analyzes images to provide detailed product information, including pricing.
              </p>
              <Button className="w-full">Try It Now</Button>
            </CardContent>
          </Card>
        </div>

        <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Upload}
            title="Easy Image Upload"
            description="Seamlessly upload product images for instant analysis."
          />
          <FeatureCard
            icon={Search}
            title="AI-Powered Analysis"
            description="Utilize cutting-edge AI models for accurate product identification."
          />
          <FeatureCard
            icon={DollarSign}
            title="Price Estimation"
            description="Get average price estimates based on internet search results."
          />
          <FeatureCard
            icon={Layers}
            title="Detailed Information"
            description="Receive comprehensive details including brand, model, and size."
          />
          <FeatureCard
            icon={Smartphone}
            title="Mobile Friendly"
            description="Enjoy a responsive design that works seamlessly on all devices."
          />
          <FeatureCard
            icon={AlertTriangle}
            title="Error Handling"
            description="Experience smooth usage with built-in error handling for various scenarios."
          />
        </div>
      </div>
    </main>
  )
}

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) {
  return (
    <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <Icon className="h-8 w-8 text-teal-500 mb-2" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

