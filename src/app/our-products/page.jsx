// app/our-products/page.jsx
'use client'
import { Suspense } from 'react'
import OurProductsPage from "@/components/Pages/Our Products/OurProducts"

  function Page() {
  return (
    <Suspense fallback={<div>جاري التحميل</div>}>
      <OurProductsPage />
    </Suspense>
  )
}

export default Page;