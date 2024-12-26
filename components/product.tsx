



import ImageUploadForm from './ImageUploadForm'
import ResultsDisplay from './ResultsDisplay'



export default function Product() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Product Identification Tool
        </h1>
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <ImageUploadForm />
            <ResultsDisplay />
          </div>
        </div>
      </div>
    </main>
  )
}

