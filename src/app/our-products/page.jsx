// app/our-products/page.jsx
'use client'
import { Suspense } from 'react'
import OurProductsPage from "@/components/Pages/Our Products/OurProducts"
import Loading from './loading' // أو أي عنصر تحميل

  function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <OurProductsPage />
    </Suspense>
  )
}

export default Page;